function hero(heroConfig) {

    function _increaseLvl() {
        while (self.xp >= (self.lvl * self.lvl)) {
            self.xp = self.xp - (self.lvl * self.lvl);
            self.lvl++;
        }
    }

    function getHpPercent() {
        return parseInt(self.hp * 100 / self.initHp, 10);
    }

    function addClass(className) {
        if (!self.domElement.classList.contains(className)) {
            self.domElement.className += ' ' + className;
        }
    }

    function removeClass(className) {
        var domclass, withSpace;
        domclass = self.domElement.className;
        if (domclass.indexOf(className) >= 0) {
            withSpace = ' ' + className;
            if (domclass.indexOf(withSpace) >= 0) {
                className = withSpace;
            }
            self.domElement.className = self.domElement.className.split(className).join('');
        }
    }

    function removeDirection() {
        removeClass('up');
        removeClass('right');
        removeClass('down');
        removeClass('left');
    }

    function draw() {
        self.domElement.style.top = self.top + 'px';
        self.domElement.style.left = self.left + 'px';
        if (self.changedDirection) {
            removeDirection();
            addClass(self.direction);
            self.changedDirection = false;
        }
    }

    function loseHp(hp) {
        if (self.hurt === false) {
            self.hp -= hp;
            self.hp = self.hp < 0 ? 0 : self.hp;
            self.hurt = true;
            addClass('hurt');
            self.hpElement.style.width = getHpPercent() + '%';
            setTimeout(function() { self.hurt = false, removeClass('hurt') }, 1000);
        }
    }

    function gainXp(xp) {
        self.xp += xp;
        _increaseLvl();
    }

    function setDirection(direction) {
        if (self.direction !== direction) {
            self.direction = direction;
            self.changedDirection = true;
        }
    }

    function swingSword() {
        addClass('swingSword');
    }

    function putSwordAway() {
        removeClass('swingSword');
    }

    var self, move, created;

    move = {
        up : function(px) {
            self.top = self.top > 0 ? self.top - px : 0;
            setDirection('up');
        },
        right : function(px, fieldWidth) {
            self.left = self.left < fieldWidth - self.width ? self.left + px : fieldWidth - self.width;
            setDirection('right');
        },
        down : function(px, fieldHeight) {
            self.top = self.top < fieldHeight - self.height ? self.top + px : fieldHeight - self.height;
            setDirection('down');
        },
        left : function(px) {
            self.left = self.left > 0 ? self.left - px : 0;
            setDirection('left');
        },
    };

    created = creator.createUnit('hero');

    self = {
        domElement: created.dom,
        name: heroConfig.name ? heroConfig.name : 'no name',
        top: heroConfig.top ? heroConfig.top : 230,
        left: heroConfig.left ? heroConfig.left : 180,
        width: 30,
        height: 30,
        xp: 0,
        lvl: 1,
        hp: heroConfig.lvl * 30 * heroConfig.lvl / 2,
        hpElement: created.hp,
        str: heroConfig.lvl * 3,
        draw: draw,
        gainXp: gainXp,
        move: move,
        loseHp: loseHp,
        hurt: false,
        direction: 'up',
        changedDirection: false,
        swingSword: swingSword,
        putSwordAway: putSwordAway,
        swingingSword: false,
        swordLocked: false
    };

    self.initHp = 0 + self.hp;

    return self;
}

// TODOs:
// changedDirection

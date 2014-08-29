function hero(heroConfig) {

    var self, move, created;

    function _increaseLvl() {
        while (self.xp >= (self.lvl * self.lvl)) {
            self.xp = self.xp - (self.lvl * self.lvl);
            self.lvl++;
        }
        self.str = self.lvl * 10;
    }

    function getHpPercent() {
        return parseInt(self.hp * 100 / self.initHp, 10);
    }

    function removeDirection() {
        tools.removeClass(self.domElement, 'up');
        tools.removeClass(self.domElement, 'right');
        tools.removeClass(self.domElement, 'down');
        tools.removeClass(self.domElement, 'left');
    }

    function draw() {
        self.domElement.style.top = self.top + 'px';
        self.domElement.style.left = self.left + 'px';
        if (self.changedDirection) {
            removeDirection();
            tools.addClass(self.domElement, self.direction);
            self.changedDirection = false;
        }
    }

    function loseHp(hp) {
        if (self.hurt === false) {
            self.hp -= hp;
            self.hp = self.hp < 0 ? 0 : self.hp;
            self.hurt = true;
            tools.addClass(self.domElement, 'hurt');
            self.hpElement.style.width = getHpPercent() + '%';
            setTimeout(function () {
                tools.removeClass(self.domElement, 'hurt');
                self.hurt = false;
            }, 1000);
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

    move = {
        up: function (fieldHeight) {
            var direction = 'up';
            self.top = self.top > 0 ? self.top - self.movePixels : 0;
            setDirection(direction);
            if (self.top <= 0) {
                self.top = fieldHeight - self.width;
                return true;
            } else {
                return false;
            }
        },
        right: function (fieldWidth) {
            var direction = 'right';
            self.left = self.left < fieldWidth - self.width ? self.left + self.movePixels : fieldWidth - self.width;
            setDirection(direction);
            if (self.left >= fieldWidth - self.width) {
                self.left = 0;
                return true;
            } else {
                return false;
            }
        },
        down: function (fieldHeight) {
            var direction = 'down';
            self.top = self.top < fieldHeight - self.height ? self.top + self.movePixels : fieldHeight - self.height;
            setDirection(direction);
            if (self.top >= fieldHeight - self.height) {
                self.top = 0;
                return true;
            } else {
                return false;
            }
        },
        left: function (fieldWidth) {
            var direction = 'left';
            self.left = self.left > 0 ? self.left - self.movePixels : 0;
            setDirection(direction);
            if (self.left <= 0) {
                self.left = fieldWidth - self.width;
                return true;
            } else {
                return false;
            }
        },
    };

    created = creator.createUnit('hero');

    self = {
        domElement: created.dom,
        name: heroConfig.name || 'no name',
        top: heroConfig.top || 230,
        left: heroConfig.left || 180,
        width: 32,
        height: 32,
        xp: 0,
        lvl: 1,
        hp: heroConfig.lvl * 30 * heroConfig.lvl / 2,
        hpElement: created.hp,
        str: heroConfig.lvl * 10,
        draw: draw,
        gainXp: gainXp,
        move: move,
        movePixels: 3,
        loseHp: loseHp,
        hurt: false,
        direction: 'up',
        changedDirection: false
    };

    self.initHp = self.hp;
    self.domElement.style.width = self.width + 'px';
    self.domElement.style.height = self.height + 'px';

    return self;
}

// TODOs:
// sword hitting monsters

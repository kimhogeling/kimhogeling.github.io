var jscraft = (function(d, field, statusBox, hero, monster){

    function drawMonsters() {
        var i, length;
        length = self.monsters.length;
        for (var i = 0; i < length; i++) {
            self.monsters[i].draw();
        };
    }

    function draw() {
        if (self.needDraw) {
            self.hero.draw();
            drawMonsters();
            self.statusBox.draw(self.hero, self.monsters);
            self.needDraw = false;
        }
        requestAnimationFrame(draw);
    }

    function makeMonsters(configMonsters) {
        var i, length, pos;
        length = configMonsters.length;
        for (i = 0; i < length; i++) {
            field = {
                height: self.field.height,
                width: self.field.width
            };
            self.monsters.push(monster(configMonsters[i], field));
        }
    }

    var self;

    self = {
        version : '0.0.0.2',
        field : field,
        statusBox : statusBox,
        hero : hero,
        monsters : [],
        needDraw : true,
        keys : {
            // MOVE
            38 : 'UP',
            39 : 'RIGHT',
            40 : 'DOWN',
            37 : 'LEFT',
            // USE WEAPONS
            70 : 'SWORD',
            68 : 'WEAPON',
            // CHOOSE WEAPONS
            49 : 'ONE',
            50 : 'TWO',
            51 : 'THREE',
            52 : 'FOUR',
            53 : 'FIVE',
            54 : 'SIX',
            55 : 'SEVEN',
            56 : 'EIGHT',
            57 : 'NINE'
        },
        activeActions : []
    };

    self.reactToAction = {
        UP : function () {
            self.hero.move.up(2);
            self.needDraw = true;
        },
        RIGHT : function () {
            self.hero.move.right(2, self.field.width);
            self.needDraw = true;
        },
        DOWN : function () {
            self.hero.move.down(2, self.field.height);
            self.needDraw = true;
        },
        LEFT : function () {
            self.hero.move.left(2);
            self.needDraw = true;
        },
        SWORD : function () {
            if (self.hero.swingingSword === false) {
                self.hero.swingingSword = true;
                self.hero.swingSword();
                self.needDraw = true;
                setTimeout(function() {
                    self.hero.putSwordAway();
                    self.hero.swingingSword = false;
                    self.needDraw = true;
                }, 1000);
            }
        }
    }

    self.detectCollision = function () {
        var i, len;
        len = self.monsters.length;
        for (i = 0; i < len; i += 1) {
            if (self.hero.top > self.monsters[i].top - self.hero.height &&
                self.hero.top < self.monsters[i].top + self.monsters[i].height &&
                self.hero.left > self.monsters[i].left - self.hero.width &&
                self.hero.left < self.monsters[i].left + self.monsters[i].width) {
                self.hero.loseHp(self.monsters[i].str * (2 / self.hero.str));
                self.needDraw = true;
            }
        }
    };

    self.reactToActions = function () {
        for (var action in self.activeActions) {
            if (self.reactToAction[action]) {
                self.reactToAction[action]();
            }
        }
    };

    self.bindKeys = function () {
        d.onkeydown = function (e) {
            e = e || window.event;
            if (self.keys[e.keyCode]) {
                self.activeActions[self.keys[e.keyCode]] = void 0;
            }
        };
        d.onkeyup = function (e) {
            e = e || window.event;
            if (self.keys[e.keyCode]) {
                delete self.activeActions[self.keys[e.keyCode]];
            }
        };
    };

    self.init = function (levelConfig) {
        self.field = field;
        self.field.setField('2.3');
        makeMonsters(map[self.field.currentField].monsters);
        self.hero = hero(levelConfig.hero);
        self.statusBox = statusBox;
        draw();
        self.bindKeys();
        setInterval(self.reactToActions, 15);
        setInterval(self.detectCollision, 15);
    };

    return self;

}(window.document, field, statusBox, hero, monster));

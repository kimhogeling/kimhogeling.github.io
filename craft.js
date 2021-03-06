var jscraft = (function (d, field, statusBox, hero, sword, monster) {

    var self;

    function gameover() {
        self.hero.top = 0;
        self.hero.left = 0;
        self.hero.width = 0;
        self.hero.height = 0;
        self.field.domElement.innerHTML = '<h1>GAME OVER</h1>';
    }

    function drawObstacles() {
        var i, length;
        length = self.obstacles.length;
        for (i = 0; i < length; i++) {
            if (self.obstacles[i]) {
                self.obstacles[i].draw();
            }
        }
    }

    function drawMonsters() {
        var i, length;
        length = self.monsters.length;
        for (i = 0; i < length; i++) {
            if (self.monsters[i]) {
                self.monsters[i].draw();
            }
        }
    }

    function draw() {
        if (self.needDraw) {
            self.hero.draw();
            self.sword.draw();
            drawObstacles();
            drawMonsters();
            self.statusBox.draw(self.hero, self.monsters);
            map.draw(self.field.currentField);
            self.needDraw = false;
        }
        requestAnimationFrame(draw);
    }

    function makeObstacles(configObstacles) {
        var i, length;
        length = configObstacles.length;
        for (i = 0; i < length; i++) {
            self.obstacles.push(obstacle(configObstacles[i]));
        }
    }

    function makeMonsters(configMonsters) {
        var i, length;
        length = configMonsters.length;
        for (i = 0; i < length; i++) {
            field = {
                height: self.field.height,
                width: self.field.width
            };
            self.monsters.push(monster(configMonsters[i], field));
        }
    }

    self = {
        initiated: false,
        version: '0.0.0.2',
        field: field,
        statusBox: statusBox,
        hero: hero,
        obstacles: [],
        monsters: [],
        needDraw: true,
        keys: {
            // MOVE
            38: 'UP',
            39: 'RIGHT',
            40: 'DOWN',
            37: 'LEFT',
            // USE WEAPONS
            70: 'SWORD',
            68: 'WEAPON',
            // CHOOSE WEAPONS
            49: 'ONE',
            50: 'TWO',
            51: 'THREE',
            52: 'FOUR',
            53: 'FIVE',
            54: 'SIX',
            55: 'SEVEN',
            56: 'EIGHT',
            57: 'NINE'
        },
        activeActions: []
    };

    self.changeField = function (x, y) {
        var currents, newX, newY, newField;
        currents = self.field.currentField.split('.');
        newX = (currents[0]|0) + x;
        newY = (currents[1]|0) + y;
        newField = newX + '.' + newY;

        // THIS IS SHIT! .. Lets use angularjs.. or something else..
        // self.field.setField(newField);
        // reset(newField);

        // console.log(x,y,currents,newX,newY,newField);
    };

    self.reactToAction = {
        UP: {
            btndown: function () {
                if (self.hero.move.up(self.field.height)) { // true if has to change field
                    self.changeField(0,-1);
                }
                self.sword.move.up(self.hero);
                self.needDraw = true;
            },
            btnup: function () {}
        },
        RIGHT: {
            btndown: function () {
                if (self.hero.move.right(self.field.width)) { // true if has to change field
                    self.changeField(1,0);
                }
                self.sword.move.right(self.hero);
                self.needDraw = true;
            },
            btnup: function () {}
        },
        DOWN: {
            btndown: function () {
                if (self.hero.move.down(self.field.height)) { // true if has to change field
                    self.changeField(0,1);
                }
                self.sword.move.down(self.hero);
                self.needDraw = true;
            },
            btnup: function () {}
        },
        LEFT: {
            btndown: function () {
                if (self.hero.move.left(self.field.width)) { // true if has to change field
                    self.changeField(-1,0);
                }
                self.sword.move.left(self.hero);
                self.needDraw = true;
            },
            btnup: function () {}
        },
        SWORD: {
            btndown: function () {
                if (self.sword.swinging === false && self.sword.locked === false) {
                    tools.addClass(self.sword.domElement, 'shown');
                    self.sword.locked = true;
                    self.sword.swinging = true;
                    self.needDraw = true;
                }
            },
            btnup: function () {
                tools.removeClass(self.sword.domElement, 'shown');
                self.sword.swinging = false;
                self.needDraw = true;
                self.sword.locked = false;
            }
        }
    };

    self.detectSwordCollision = function (monster, i) {
        if (monster &&
            self.sword.top > monster.top - self.sword.height &&
            self.sword.top < monster.top + monster.height &&
            self.sword.left > monster.left - self.sword.width &&
            self.sword.left < monster.left + monster.width) {
            monster.domElement.style.background = 'red';
            monster.loseHp(self.hero.str);
            if (monster.hp === 0) {
                self.hero.gainXp(monster.str);
                self.field.domElement.removeChild(monster.domElement);
                delete self.monsters[i];
            } else {
                setTimeout(function () {
                    monster.domElement.style.background = 'orange';
                }, 1000);
            }
        }
    };

    self.detectCollision = function () {
        var i, len, swordDetection;
        len = self.monsters.length;
        if (self.sword.swinging) {
            swordDetection = self.detectSwordCollision;
        } else {
            swordDetection = function () {};
        }
        for (i = 0; i < len; i += 1) {
            if (self.monsters[i] &&
                self.hero.top > self.monsters[i].top - self.hero.height &&
                self.hero.top < self.monsters[i].top + self.monsters[i].height &&
                self.hero.left > self.monsters[i].left - self.hero.width &&
                self.hero.left < self.monsters[i].left + self.monsters[i].width) {
                self.hero.loseHp(self.monsters[i].str * (2 / self.hero.str));
                if (self.hero.hp === 0) {
                    gameover();
                }
                self.needDraw = true;
            }
            swordDetection(self.monsters[i], i);
        }
    };

    self.reactToActions = function () {
        var action;
        for (action in self.activeActions) {
            if (self.reactToAction[action]) {
                self.reactToAction[action].btndown();
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
                self.reactToAction[self.keys[e.keyCode]].btnup();
                delete self.activeActions[self.keys[e.keyCode]];
            }
        };
    };

    self.reset = function (fieldPos) {
        // window = void 0;
        // document = void 0;
        document.querySelector('#field').innerHTML = '';
        self.obstacles = void 0;
        self.monsters = void 0;
        self.init(fieldPos);
    }

    self.init = function (fieldPos) {
        if (!self.initiated) {
            map.init();
            self.field = field;
        }
        self.field.setField(fieldPos);
        makeObstacles(map.fields[self.field.currentField].obstacles);
        makeMonsters(map.fields[self.field.currentField].monsters);
        if (!self.initiated) {
            self.hero = hero({
                name: 'Lale',
                lvl: 1,
                top: 230,
                left: 180
            });
            self.sword = sword(self.hero);
            self.statusBox = statusBox;
        }
        if (!self.initiated) {
            map.firstDraw();
            self.bindKeys();
            setInterval(self.reactToActions, 20);
            setInterval(self.detectCollision, 20);
            draw();
        }
        self.initiated = true;
    };

    // ONLY FOR DEBUGGING!!!!
    return self;

});

var instance = jscraft(window.document, field, statusBox, hero, sword, monster);
instance.init('2.2');

function reset (newField) {
    instance = void 0;
    instance = jscraft(window.document, field, statusBox, hero, sword, monster);
    instance.reset(newField);
}

function monster(monsterConfig, field) {

    function getHpPercent() {
        return parseInt(self.hp * 100 / self.initHp, 10);
    }

    function draw() {
        self.domElement.style.top = self.top + 'px';
        self.domElement.style.left = self.left + 'px';
        self.domElement.style.width = self.width + 'px';
        self.domElement.style.height = self.height + 'px';
        self.hpElement.style.width = getHpPercent() + '%';
    }

    function loseHp(hp) {
        if (!self.hurt) {
            self.hp -= hp;
            self.hp = self.hp < 0 ? 0 : self.hp;
            self.hurt = true;
            setTimeout(function () {
                self.hurt = false;
            }, 1000);
        }
    }

    var self, created, monsterTypes;

    monsterTypes = {
        'Kim': {
            width: 20,
            height: 35
        },
        'Wurst': {
            width: 30,
            height: 40
        }
    };
    created = creator.createUnit('monster');

    self = {
        type: monsterConfig.type,
        top: parseInt((field.height - monsterTypes[monsterConfig.type].height) * Math.random(), 10),
        left: parseInt((field.width - monsterTypes[monsterConfig.type].width) * Math.random(), 10),
        width: monsterTypes[monsterConfig.type].width,
        height: monsterTypes[monsterConfig.type].height,
        domElement: created.dom,
        hpBarElement: created.hpBar,
        hpElement: created.hp,
        initHp: monsterConfig.lvl * 30 * monsterConfig.lvl / 2,
        str: monsterConfig.lvl * 2,
        lvl: monsterConfig.lvl,
        draw: draw,
        hurt: false,
        loseHp: loseHp
    };
    self.hp = 0 + self.initHp;

    return self;

}
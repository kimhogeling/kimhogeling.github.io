var field, creator, statusBox;

'use strict';

field = (function(d){

    function setField(fieldCoordinates) {
        if (typeof fieldCoordinates === 'string') {
            self.currentField = fieldCoordinates
        }
    }

    var self = {
        width : 600,
        height : 400,
        domElement: d.getElementById('field'),
        currentField: '2.3',
        setField: setField
    };

    return self;

}(window.document));


creator = (function(d){

    return {
        createUnit : function (id) {
            var hp, hpBar, newUnit, sword;

            hp = d.createElement('div');
            hp.className = 'hp';

            hpBar = d.createElement('div');
            hpBar.className = 'hpBar';

            newUnit = d.createElement('div');
            newUnit.id = id;

            // Only create sword for hero
            if (id === 'hero') {
                sword = d.createElement('div');
                sword.id = 'sword';
                newUnit.appendChild(sword);
                newUnit.className = 'down';
            }

            hpBar.appendChild(hp);
            newUnit.appendChild(hpBar);

            field.domElement.appendChild(newUnit);

            return {
                dom: newUnit,
                hpBar: hpBar,
                hp: hp
            };
        }
    };

}(window.document));


statusBox = (function(d){

    var pri, pub;

    pri = {
        domElement : d.getElementById('statusBox')
    };

    pub = {

    };

    pub.draw = function (hero, monsters) {
        var i, len;
        pri.domElement.innerText = 'Draw Sword with F';
        pri.domElement.innerText += '\nXP: ' + hero.xp + '\nLVL: ' + hero.lvl
        pri.domElement.innerText += '\nHP : ' + hero.hp;
        pri.domElement.innerText += '\nStr : ' + hero.str;
        pri.domElement.innerText += '\nTop : ' + hero.top + ', Left : ' + hero.left;
        len = monsters.length;
        for (i = 0; i < len; i += 1) {
            pri.domElement.innerText += '\nMonstertype : ' + monsters[i].type;
            pri.domElement.innerText += '\nHP : ' + monsters[i].hp;
            pri.domElement.innerText += '\nTop : ' + monsters[i].top + ', Left : ' + monsters[i].left;
        }
    }

    return pub;

}(window.document));

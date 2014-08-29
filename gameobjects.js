var field, statusBox;

'use strict';

field = (function (d, map) {

    function setField (fieldCoordinates) {
        if (typeof fieldCoordinates === 'string' && typeof map.fields[fieldCoordinates] === 'object') {
            console.log('current field: ' + fieldCoordinates);
            self.currentField = fieldCoordinates
        }
    }

    var self = {
        width: 600,
        height: 400,
        domElement: d.getElementById('field'),
        currentField: '2.3',
        setField: setField
    };

    return self;

}(window.document, map));





statusBox = (function (d) {

    var pri, pub;

    pri = {
        domElement: d.getElementById('statusBox')
    };

    pub = {

    };

    pub.draw = function (hero, monsters) {
        // var i, len;
        pri.domElement.innerText = 'Draw Sword with F';
        pri.domElement.innerText += '\nXP: ' + hero.xp + '\nLVL: ' + hero.lvl
        pri.domElement.innerText += '\nHP : ' + hero.hp;
        pri.domElement.innerText += '\nStr : ' + hero.str;
        // pri.domElement.innerText += '\nTop : ' + hero.top + ', Left : ' + hero.left;
        // len = monsters.length;
        // for (i = 0; i < len; i += 1) {
        //     if (monsters[i]) {
        //         pri.domElement.innerText += '\nMonstertype : ' + monsters[i].type;
        //         pri.domElement.innerText += '\nHP : ' + monsters[i].hp;
        //         pri.domElement.innerText += '\nTop : ' + monsters[i].top + ', Left : ' + monsters[i].left;
        //     }
        // }
    }

    return pub;

}(window.document));

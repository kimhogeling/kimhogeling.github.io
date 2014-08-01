var creator = (function (d) {

    return {
        createObstacle: function (type) {
            var newObstacle;
            newObstacle = d.createElement('div');
            newObstacle.className = type;
            field.domElement.appendChild(newObstacle);
            return {
                dom: newObstacle
            }
        },
        createUnit: function (id) {
            var hp, hpBar, newUnit, sword;

            hp = d.createElement('div');
            hp.className = 'hp';

            hpBar = d.createElement('div');
            hpBar.className = 'hpBar';

            newUnit = d.createElement('div');
            newUnit.id = id;

            if (id === 'hero') {
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
        },
        createWeapon: function (weaponType) {
            var weapon;
            weapon = d.createElement('div');
            weapon.id = 'sword';
            field.domElement.appendChild(weapon);
            return {
                dom: weapon
            }
        }
    };

}(window.document));
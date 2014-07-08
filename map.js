var map = {
    'dom' : null,
    'fields' : {
        '01.01' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '02.01' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '03.01' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '01.02' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '02.02' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '03.02' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '01.03' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '02.03' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        },
        '03.03' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ]
        }
    },
    'firstDraw' : function() {
        var coords, dot, clearer;
        for (coords in map.fields) {
            dot = document.createElement('div');
            dot.id = 'dot' + coords.split('.').join('');
            dot.className = 'mapdot';
            if (coords.split('.')[0] === '01') {
                dot.className += ' first';
            }
            map.dom.appendChild(dot);
        }
        clearer = document.createElement('div');
        clearer.className = 'clearer';
        map.dom.appendChild(clearer);
    },
    'savedCurrent' : '',
    'draw' : function(current) {
        if (map.savedCurrent !== current) {
            console.log(current);
            map.savedCurrent = current;
            document.querySelector('.mapdot').className = document.querySelector('.mapdot').className.split(' active').join('');
            document.querySelector('#dot' + current.split('.').join('')).className = document.querySelector('#dot' + current.split('.').join('')).className + ' active';
        }
    },
    'init' : function() {
        map.dom = document.querySelector('#map');
    }
};


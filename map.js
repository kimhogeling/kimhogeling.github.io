var map = {
    'dom' : null,
    'fields' : {
        '1.1' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '2.1' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '3.1' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '1.2' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '2.2' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : [
                {
                    type: 'tree',
                    top: 130,
                    left: 240
                },
                {
                    type: 'tree',
                    top: 50,
                    left: 390
                },
                {
                    type: 'tree',
                    top: 300,
                    left: 80
                },
                {
                    type: 'tree',
                    top: 200,
                    left: 290
                }
            ]
        },
        '3.2' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '1.3' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '2.3' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        },
        '3.3' : {
            monsters : [
                {
                    type: 'Kim',
                    lvl: 1
                },
                {
                    type: 'Wurst',
                    lvl: 2
                }
            ],
            obstacles : []
        }
    },
    'firstDraw' : function() {
        var coords, dot, clearer;
        for (coords in map.fields) {
            dot = document.createElement('div');
            dot.id = 'dot' + coords.split('.').join('');
            dot.className = 'mapdot';
            if ((coords.split('.')[0]|0) === 1) {
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
            map.savedCurrent = current;
            document.querySelector('.mapdot').className = document.querySelector('.mapdot').className.split(' active').join('');
            document.querySelector('#dot' + current.split('.').join('')).className = document.querySelector('#dot' + current.split('.').join('')).className + ' active';
        }
    },
    'init' : function() {
        map.dom = document.querySelector('#map');
    }
};

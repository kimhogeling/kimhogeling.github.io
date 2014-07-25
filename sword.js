function sword(unit) {

    var self, created, move, mapping;

    dimensions = {
        'up': {
            'width': 8,
            'height': 30
        },
        'right': {
            'width': 30,
            'height': 8
        },
        'down': {
            'width': 8,
            'height': 30
        },
        'left': {
            'width': 30,
            'height': 8
        }
    };

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
            self.domElement.style.width = dimensions[self.direction].width + 'px';
            self.domElement.style.height = dimensions[self.direction].height + 'px';
            removeDirection();
            tools.addClass(self.domElement, self.direction);
            self.changedDirection = false;
        }
    }

    created = creator.createWeapon('sword', unit);

    function setDirection(direction) {
        if (self.direction !== direction) {
            self.direction = direction;
            self.changedDirection = true;
        }
    }

    move = {
        up: function (unit) {
            self.top = unit.top - unit.height;
            self.left = unit.left + unit.width / 2;
            setDirection('up');
        },
        right: function (unit) {
            self.top = unit.top + unit.height / 2;
            self.left = unit.left + unit.width;
            setDirection('right');
        },
        down: function (unit) {
            self.top = unit.top + unit.height;
            self.left = unit.left + unit.width / 2;
            setDirection('down');
        },
        left: function (unit) {
            self.top = unit.top + unit.height / 2;
            self.left = unit.left - unit.width;
            setDirection('left');
        },
    };

    self = {
        unit: unit,
        domElement: created.dom,
        draw: draw,
        top: unit.top,
        left: unit.left,
        move: move,
        direction: 'down',
        changedDirection: true,
        swinging: false,
        locked: false
    };

    self.width = dimensions[self.direction].width;
    self.height = dimensions[self.direction].height;
    self.top = unit.top + unit.height;
    self.left = unit.left + unit.width / 2;
    self.draw();

    return self;
}
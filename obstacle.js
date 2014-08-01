function obstacle (config) {

    function draw() {
        self.domElement.style.top = self.top + 'px';
        self.domElement.style.left = self.left + 'px';
        self.domElement.style.width = self.width + 'px';
        self.domElement.style.height = self.height + 'px';
    }

    var self, obstacleTypes, created;

    obstacleTypes = {
        'tree': {
            width: 32,
            height: 32
        }
    };

    created = creator.createObstacle(config.type);

    self = {
        type: config.type,
        top: config.top,
        left: config.left,
        width: obstacleTypes[config.type].width,
        height: obstacleTypes[config.type].height,
        domElement: created.dom,
        draw : draw
    }

    return self;

}
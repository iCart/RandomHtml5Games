var ESCAPE = 27;
function Game(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.started = false;

    this.left_score = new Label(canvas, {
        font_size: 100,
        font_family: 'Colibri',
        color: 'white',
        text: '0',
        position: {
            x: 100,
            y: 150
        }
    });

    this.right_score = new Label(canvas, {
        font_size: 100,
        font_family: 'Colibri',
        color: 'white',
        text: '0',
        position: {
            x: canvas.width - 100,
            y: 150
        }
    });

}

Game.prototype.start = function () {
    this.active = true;
    this.ball = new Ball();
    this.started = true;
};

Game.prototype.tick = function (event, ms_since_last_tick) {
    this.update(ms_since_last_tick);
    this.draw();
};

Game.prototype.update = function (ms_since_last_tick) {
    this.ball.update(ms_since_last_tick, this);
};

Game.prototype.draw = function () {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = 'white';
    this.context.lineWidth = 10;
    this.context.beginPath();
    this.context.moveTo(this.canvas.width/2, 0);
    this.context.lineTo(this.canvas.width/2, this.canvas.height);
    this.context.stroke();

    this.left_score.draw();
    this.right_score.draw();

    this.ball.draw(this.context);
};

Game.prototype.width = function () {
    return this.canvas.width;
};

Game.prototype.height = function () {
    return this.canvas.height;
};

Game.prototype.activate = function () {
    $(document).on('tick', this.tick.bind(this));
    $(document).on('keydown', this.keydown.bind(this));
};

Game.prototype.deactivate = function () {
    console.log('game deactivating!!');
    $(document).off('tick');
    $(document).off('keydown');
};

Game.prototype.keydown = function (event) {
    console.log('keydown');
    if (event.keyCode == ESCAPE){
        this.deactivate();
        this.controllers.menu.activate();
    }
};

//Now, to figure out how inheritance works in JS..
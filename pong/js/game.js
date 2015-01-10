function Game(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.has_started = false;
    $(document).on('tick', this.tick.bind(this));
}

Game.prototype.start = function () {
    this.has_started = true;
    this.ball = new Ball();
};

Game.prototype.tick = function (event, ms_since_last_tick) {
    if (this.has_started) {
        this.update(ms_since_last_tick);
        this.draw();
    }
};

Game.prototype.update = function (ms_since_last_tick) {
    this.ball.update(ms_since_last_tick, this);
};

Game.prototype.draw = function () {
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw(this.context);
};

Game.prototype.width = function() {
    return this.canvas.width;
};

Game.prototype.height = function() {
    return this.canvas.height;
};
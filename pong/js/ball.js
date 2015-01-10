function Ball() {
    this.x = 0;
    this.y = 0;

    // Speed in pixel/second
    this.speed_x = 50;
    this.speed_y = 50;

    this.radius = 8;

    this.direction = {x: 1, y: 1}
}

Ball.prototype.draw = function (context) {
    context.fillStyle = 'grey';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
};

Ball.prototype.update = function (ms_since_last_tick, game) {
    var dx = (this.speed_x * (ms_since_last_tick / 1000));
    var dy = (this.speed_y * ms_since_last_tick / 1000);

    if (this.x > game.width() - this.radius) {
        this.direction.x = -1;
    } else if (this.x < this.radius) {
        this.direction.x = 1;
    }

    if (this.y > game.height() - this.radius) {
        this.direction.y = -1;
    } else if (this.y < this.radius) {
        this.direction.y = 1;
    }

    this.x += dx * this.direction.x;
    this.y += dy * this.direction.y;
};
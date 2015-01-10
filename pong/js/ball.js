function Ball(canvas) {
    this.canvas = canvas;
    //this.x = canvas.width / 2;
    //this.y = canvas.height / 2;

    // Speed in pixel/second
    //this.speed = 100;

    this.radius = 8;

    //var x = 0;
    //if (Math.random() > 0.5){
    //    x = 1;
    //} else {
    //    x = -1;
    //}
    //this.direction = {x: x, y: (Math.random() * 2) - 1}
    this.reset();
}

Ball.prototype.draw = function (context) {
    context.fillStyle = 'grey';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
};

Ball.prototype.update = function (ms_since_last_tick, game) {
    var dx = (this.speed * (ms_since_last_tick / 1000));
    var dy = (this.speed * ms_since_last_tick / 1000);

    if (this.x > game.width() - this.radius) {
        $(this).trigger('ball.touch_right');
        this.direction.x = -1;
    } else if (this.x < this.radius) {
        $(this).trigger('ball.touch_left');
        this.direction.x = 1;
    }

    if ((this.y > game.height() - this.radius) || this.y < this.radius) {
        $(this).trigger('ball.touch_side');
        this.direction.y *= -1;
    }

    this.x += dx * this.direction.x;
    this.y += dy * this.direction.y;
};

Ball.prototype.reset = function () {

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.speed = 100;
    var x = 0;
    if (Math.random() > 0.5) {
        x = 1;
    } else {
        x = -1;
    }
    this.direction = {x: x, y: (Math.random() * 2) - 1}
};
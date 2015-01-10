function Ball(canvas) {
    this.canvas = canvas;
    this.radius = 8;
    this.reset();
}

Ball.prototype.draw = function (context) {
    context.fillStyle = 'grey';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fill();
};

Ball.prototype.update = function (dt, game) {
    var dx = (this.speed * (dt / 1000));
    var dy = (this.speed * dt / 1000);

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

    this.check_player_collision_left(game.left_player);
    this.check_player_collision_right(game.right_player);

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

Ball.prototype.check_player_collision_left = function (player) {
    if (this.y > player.y
        && this.y < (player.y + player.length)
        && this.x <= (player.x + player.width + this.radius)
    ) {
        this.direction.x *= -1;
    }
};

Ball.prototype.check_player_collision_right = function (player) {
    if (this.y > player.y
        && this.y < (player.y + player.length)
        && this.x >= (canvas.width - player.width - this.radius)
    ) {
        this.direction.x *= -1;
    }
};

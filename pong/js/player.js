function Player(canvas, x) {
    this.canvas = canvas;
    // This is set at each tick by the Game controller
    this.controls = null;
    this.context = canvas.getContext('2d');
    this.speed = 100;
    this.y = 0;
    this.x = x;
    this.length = 100;

    this.move_up = false;
    this.move_down = false;

    this.width = 20;
}

Player.prototype.draw = function () {
    this.context.fillStyle = 'white';
    this.context.fillRect(this.x, this.y, this.width, this.length);
};

Player.prototype.update = function (ball, dt) {
    if (this.controls.controller == 'CPU') {
        this.ai_update(ball, dt);
    }

    if (this.move_up) {
        this.y -= (this.speed * (dt / 1000))
    }

    if (this.move_down) {
        this.y += (this.speed * (dt / 1000) )
    }

    if (this.y < 0) {
        this.y = 0;
    }

    if (this.y > this.canvas.height - this.length) {
        this.y = this.canvas.height - this.length
    }
};

Player.prototype.ai_update = function (ball, dt) {
    if ((ball.y - 10 < this.y) || (ball.y + 10 > this.y + this.length)) {
        var distance = ball.y - (this.y + this.length / 2);
        if (distance > 0) {
            this.move_up = false;
            this.move_down = true;
        } else if (distance < 0) {
            this.move_up = true;
            this.move_down = false;
        } else {
            this.move_up = false;
            this.move_down = false;
        }
    }
};

Player.prototype.activate = function () {
    this.move_up = false;
    this.move_down = false;
    $(document).on('keydown', this.keydown.bind(this));
    $(document).on('keyup', this.keyup.bind(this));
};

Player.prototype.deactivate = function () {
    $(document).off('keydown');
    $(document).off('keyup');
};

Player.prototype.keydown = function (event) {
    if (this.controls.controller != 'CPU') {
        if (event.keyCode == this.controls.controls.up) {
            this.move_up = true;
        } else if (event.keyCode == this.controls.controls.down) {
            this.move_down = true;
        }
    }
};

Player.prototype.keyup = function (event) {
    if (this.controls.controller != 'CPU') {
        if (event.keyCode == this.controls.controls.up) {
            this.move_up = false;
        } else if (event.keyCode == this.controls.controls.down) {
            this.move_down = false;
        }
    }
};
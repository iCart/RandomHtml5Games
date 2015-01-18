var ESCAPE = 27;
var UP = 38;
var DOWN = 40;

function Game(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.started = false;

    this.left_score_label = new Label(canvas, {
        font_size: 100,
        font_family: 'Colibri',
        color: 'white',
        text: '0',
        position: {
            x: 100,
            y: 150
        }
    });

    this.right_score_label = new Label(canvas, {
        font_size: 100,
        font_family: 'Colibri',
        color: 'white',
        text: '0',
        position: {
            x: canvas.width - 100,
            y: 150
        }
    });

    this.score_right = 0;
    this.score_left = 0;

    this.left_player = new Player(canvas, 0, false);
    this.right_player = new Player(canvas, canvas.width - 20);
}

Game.prototype.start = function () {
    this.active = true;
    this.ball = new Ball(this.canvas);
    this.started = true;
    this.score_right = 0;
    this.score_left = 0;
};

Game.prototype.tick = function (event, ms_since_last_tick) {
    this.update(ms_since_last_tick);
    this.draw();
};

Game.prototype.update = function (ms_since_last_tick) {

    var options = this.controllers.options.options;
    this.left_player.controls = options.player1;
    this.right_player.controls = options.player2;

    this.left_player.update(this.ball, ms_since_last_tick);
    this.right_player.update(this.ball, ms_since_last_tick);
    this.ball.update(ms_since_last_tick, this);
};

Game.prototype.draw = function () {
    //TODO: refactor
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = 'white';
    this.context.lineWidth = 10;
    this.context.beginPath();
    this.context.moveTo(this.canvas.width / 2, 0);
    this.context.lineTo(this.canvas.width / 2, this.canvas.height);
    this.context.stroke();

    this.left_score_label.text = this.score_left;
    this.left_score_label.draw();

    this.right_score_label.text = this.score_right;
    this.right_score_label.draw();

    this.left_player.draw();
    this.right_player.draw();

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
    $(this.ball).on('ball.touch_right', this.right_player_scored.bind(this));
    $(this.ball).on('ball.touch_left', this.left_player_scored.bind(this));
    $(this.ball).on('ball.touch_side', this.accelerate.bind(this));

    this.left_player.activate();
    this.right_player.activate();
};

Game.prototype.deactivate = function () {
    $(document).off('tick');
    $(document).off('keydown');
    $(this.ball).on('ball.touch_right');
    $(this.ball).on('ball.touch_left');
    $(this.ball).on('ball.touch_side');

    this.left_player.deactivate();
    this.right_player.deactivate();
};

Game.prototype.keydown = function (event) {
    if (event.keyCode == ESCAPE) {
        this.deactivate();
        this.controllers.menu.activate();
    }
};

Game.prototype.right_player_scored = function () {
    this.score_left += 1;
    this.ball.reset();
};

Game.prototype.left_player_scored = function () {
    this.score_right += 1;
    this.ball.reset();
};

Game.prototype.accelerate = function () {
    // Accelerate faster as game drags on because why not?
    this.ball.speed += (this.score_left + this.score_right) * 10;
    //TODO: this does not quite work as intended, figure it out later
};


//Now, to figure out how inheritance works in JS..
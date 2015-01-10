function Menu(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.elements = [];

    this.new_game_label = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'black',
        callback_action: this.new_game.bind(this),
        text: 'New Game',
        position: {
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.new_game_label);

    this.continue_label = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'black',
        callback_action: this.continue_game.bind(this),
        text: 'Continue',
        position: {
            x: canvas.width / 2,
            y: 100
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.continue_label);
}

Menu.prototype.tick = function () {
    this.draw();
};

Menu.prototype.draw = function () {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


    if (this.controllers.game.started) {
        this.new_game_label.position.y = this.canvas.width * (1 / 4) + 50;
        this.new_game_label.draw();

        this.continue_label.position.y = this.canvas.width * (3 / 4) - 50;
        this.continue_label.draw();
    } else {
        this.new_game_label.position.y = this.canvas.width / 2;
        this.new_game_label.draw();
    }
};

Menu.prototype.new_game = function () {
    this.deactivate();
    this.controllers.game.start();
    this.controllers.game.activate();
};

Menu.prototype.activate = function () {
    $.each(this.elements, function (n, element) {
        if (element.activate) {
            element.activate();
        }
    });
    $(document).on('tick', this.tick.bind(this));
};

Menu.prototype.deactivate = function () {
    $.each(this.elements, function (n, element) {
        if (element.deactivate) {
            element.deactivate();
        }
    });
    $(document).unbind('tick', this.tick.bind(this));
};

Menu.prototype.continue_game = function () {
    this.deactivate();
    this.controllers.game.activate();
};
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

    this.options_label = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'black',
        callback_action: this.show_options.bind(this),
        text: 'Options',
        position: {
            x: canvas.width / 2,
            y: 100
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.options_label);

    this.continue_label = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'darkgrey',
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


    if (this.controllers.game.started) {
        // Game has started
        this.new_game_label.color = 'dark grey';
        this.new_game_label.font_size = 40;
        this.new_game_label.position.y = this.canvas.width * (1 / 6);
        this.new_game_label.draw();

        this.options_label.color = 'dark grey';
        this.options_label.position.y = this.canvas.width * (1 / 2) - 50;
        this.options_label.font_size = 40;
        this.options_label.draw();

        this.continue_label.position.y = this.canvas.width * (5 / 6) - 100;
        this.continue_label.draw();
    } else {
        // Game not started
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.new_game_label.position.y = this.canvas.width * (1 / 4) + 50;
        this.new_game_label.font_size = 100;
        this.new_game_label.draw();

        this.options_label.position.y = this.canvas.width * (3 / 4) - 50;
        this.options_label.font_size = 100;
        this.options_label.draw();
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

Menu.prototype.show_options = function () {
    this.deactivate();
    this.controllers.options.activate();
};
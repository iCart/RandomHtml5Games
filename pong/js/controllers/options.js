function Options(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.elements = [];
    this.options = {
        player1: {
            controller: 'human',
            controls: {
                up: 83,
                down: 88
            }
        },
        player2: {
            controller: 'CPU',
            controls: {
                up: 38,
                down: 40
            }
        }
    };

    this.player1_label = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: 'Player 1',
        position: {
            x: 150,
            y: 70
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.player1_label);

    this.player2_label = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: 'Player 2',
        position: {
            x: canvas.width - 150,
            y: 70
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.player2_label);

    this.player1_controller = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: 'CPU',
        position: {
            x: this.player1_label.position.x,
            y: this.player1_label.position.y + 150
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black',
        callback_action: this.switch_player1_control.bind(this)
    });
    this.elements.push(this.player1_controller);

    this.player2_controller = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: 'CPU',
        position: {
            x: this.player2_label.position.x,
            y: this.player2_label.position.y + 150
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black',
        callback_action: this.switch_player2_control.bind(this)
    });
    this.elements.push(this.player2_controller);

    this.player1_up = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: '',
        position: {
            x: this.player1_controller.position.x,
            y: this.player1_controller.position.y + 50
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black',
        callback_action: this.change_player_control.bind(this, this.options.player1.controls, 'up')
    });
    this.elements.push(this.player1_up);

    this.player1_down = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: '',
        position: {
            x: this.player1_up.position.x,
            y: this.player1_up.position.y + 50
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.player1_down);

    this.player2_up = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: '',
        position: {
            x: this.player2_controller.position.x,
            y: this.player2_controller.position.y + 50
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.player2_up);

    this.player2_down = new Label(canvas, {
        font_size: 40,
        font_family: 'Colibri',
        color: 'white',
        text: '',
        position: {
            x: this.player2_up.position.x,
            y: this.player2_up.position.y + 50
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.player2_down);
}

Options.prototype.activate = function () {
    $(document).on('tick', this.tick.bind(this));
    $(document).on('keydown', this.keydown.bind(this));
    $.each(this.elements, function (n, element) {
        element.activate();
    });
};

Options.prototype.deactivate = function () {
    $(document).off('tick');
    $(document).off('keydown');
    $.each(this.elements, function (n, element) {
        element.deactivate();
    })

};

Options.prototype.tick = function () {
    this.update();
    this.draw();
};

Options.prototype.update = function () {
    if (this.options.player1.controller == 'CPU') {
        this.player1_controller.text = 'Computer';
        this.player1_up.text = '';
        this.player1_down.text = '';
    } else {
        this.player1_controller.text = 'Human';
        this.player1_up.text = 'UP: ' + $.keyCodeMap[this.options.player1.controls.up];
        this.player1_down.text = 'DOWN: ' + $.keyCodeMap[this.options.player1.controls.down];
    }

    if (this.options.player2.controller == 'CPU') {
        this.player2_controller.text = 'Computer';
        this.player2_up.text = '';
        this.player2_down.text = '';
    } else {
        this.player2_controller.text = 'Human';
        this.player2_up.text = 'UP: ' + $.keyCodeMap[this.options.player2.controls.up];
        this.player2_down.text = 'DOWN: ' + $.keyCodeMap[this.options.player2.controls.down];
    }


};

Options.prototype.draw = function () {

    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.strokeStyle = 'white';
    this.context.lineWidth = 10;
    this.context.beginPath();
    this.context.moveTo(this.canvas.width / 2, 0);
    this.context.lineTo(this.canvas.width / 2, this.canvas.height);
    this.context.stroke();


    $.each(this.elements, function (n, element) {
        element.draw();
    })
};

Options.prototype.keydown = function (event) {
    if (event.keyCode == ESCAPE) {
        this.deactivate();
        if (this.controllers.game.started) {
            this.controllers.game.draw();
        }
        this.controllers.menu.activate();
    }
};

Options.prototype.switch_player1_control = function () {
    if (this.options.player1.controller == 'CPU') {
        this.options.player1.controller = 'human'
    } else {
        this.options.player1.controller = 'CPU'
    }
};

Options.prototype.switch_player2_control = function () {
    if (this.options.player2.controller == 'CPU') {
        this.options.player2.controller = 'human'
    } else {
        this.options.player2.controller = 'CPU'
    }
};

Options.prototype.change_player_control = function (option, attribute) {
    this.controllers.key_change.to_change = {
        option: option,
        attribute: attribute
    };
    this.deactivate();
    this.controllers.key_change.activate();
};
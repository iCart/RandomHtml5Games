function Options(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.elements = [];

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

}

Options.prototype.activate = function () {
    $(document).on('tick', this.tick.bind(this));
    $(document).on('keydown', this.keydown.bind(this));
    $.each(this.elements, function (n, element) {
        element.activate();
    })
};

Options.prototype.deactivate = function () {
    $(document).off('tick');
    $(document).off('keydown');
    $.each(this.elements, function (n, element) {
        element.deactivate();
    })

};

Options.prototype.tick = function () {
    this.draw();
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
var ESCAPE = 27;

function KeyChange(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.elements = [];

    //Using two label 'cause i can't figure out how to add new lines to the text :/
    this.first_label = new Label(canvas, {
        font_size: 100,
        font_family: 'Colibri',
        color: 'white',
        text: 'Press the',
        position: {
            x: canvas.width / 2,
            y: 200
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.first_label);

    this.second_label = new Label(canvas, {
        font_size: 100,
        font_family: 'Colibri',
        color: 'white',
        text: 'new key',
        position: {
            x: this.first_label.position.x,
            y: this.first_label.position.y + 150
        },
        draw_bounding_box: false,
        draw_background: false,
        background_color: 'black'
    });
    this.elements.push(this.second_label);

    // This is set at activation time from the options controller.
    this.to_change = {
        option: null,
        attribute: null
    }
}

KeyChange.prototype.tick = function () {
    this.draw();
};

KeyChange.prototype.draw = function () {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.first_label.draw();
    this.second_label.draw();
};

KeyChange.prototype.keydown = function (event) {
    console.log(event.keyCode);
    if (event.keyCode != ESCAPE) {
        this.to_change.option[this.to_change.attribute] = event.keyCode;
    }

    this.deactivate();
    this.controllers.options.activate();
};

KeyChange.prototype.activate = function () {
    $.each(this.elements, function (n, element) {
        if (element.activate) {
            element.activate();
        }
    });
    $(document).on('tick', this.tick.bind(this));
    $(document).on('keydown', this.keydown.bind(this));
};

KeyChange.prototype.deactivate = function () {
    $.each(this.elements, function (n, element) {
        if (element.deactivate) {
            element.deactivate();
        }
    });
    $(document).off('tick');
    $(document).off('keydown');
};

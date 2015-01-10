function Label(canvas, options) {
    /**
     * options must contain:
     * - font_size
     * - font_family,
     * - color
     * - callback_action
     * - text
     * - position {x: center's x, y: bottom's y}
     */

    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.font_size = options['font_size'];
    this.font_family = options['font_family'];
    this.color = options['color'];
    this.callback_action = options['callback_action'];
    this.text = options['text'];
    this.position = options['position'];
    this.draw_bounding_box = Boolean(options['draw_bounding_box']);
    this.draw_background = Boolean(options['draw_background']);
    if (this.draw_background){
        this.background_color = options['background_color'];
    }

    this.context.font = "normal normal " + this.font_size + 'px ' + this.font_family;
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'bottom';

    this.bounding_box = false;

    this.listener = this.clicked.bind(this);
    this.activate();
}

Label.prototype.draw = function () {

    this.context.font = "normal normal " + this.font_size + 'px ' + this.font_family;
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'bottom';


    var text_length = this.context.measureText(this.text);
    this.bounding_box = {
        left: (this.position.x - (text_length.width / 2)),
        top: (this.position.y - this.font_size),
        width: text_length.width,
        height: this.font_size
    };

    if (this.draw_bounding_box) {
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.strokeRect(this.bounding_box.left, this.bounding_box.top, this.bounding_box.width, this.bounding_box.height);
    }
    if (this.draw_background) {
        this.context.fillStyle = this.background_color;
        this.context.strokeStyle = this.background_color;
        this.context.fillRect(this.bounding_box.left, this.bounding_box.top, this.bounding_box.width, this.bounding_box.height);
    }

    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.fillText(this.text, this.position.x, this.position.y);
};

Label.prototype.clicked = function () {
    //No bounding box: this was never drawn, so don't bother checking
    if (! this.bounding_box) {
        return;
    }

    var mx = event.layerX;
    var my = event.layerY;

    var collide = (
    (mx > this.bounding_box.left)
    && (mx < (this.bounding_box.left + this.bounding_box.width))
    && (my > this.bounding_box.top)
    && (my < (this.bounding_box.top + this.bounding_box.height))
    );
    if (collide) {
        this.callback_action();
    }
};

Label.prototype.activate = function() {
    this.canvas.addEventListener("mousedown", this.listener);
};

Label.prototype.deactivate = function() {
    this.canvas.removeEventListener("mousedown", this.listener);
};
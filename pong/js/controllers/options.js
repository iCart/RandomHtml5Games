function Options(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
}

Options.prototype.activate = function () {
    $(document).on('tick', this.tick.bind(this));
    $(document).on('keydown', this.keydown.bind(this));
};

Options.prototype.deactivate = function () {
    $(document).off('tick');
    $(document).off('keydown');
};

Options.prototype.tick = function () {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
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
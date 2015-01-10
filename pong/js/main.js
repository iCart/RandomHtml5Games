$(function () {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var last_tick = new Date();
    setInterval(function(){
        var now = new Date();
        var ms_since_last_tick = now - last_tick;
        last_tick = now;
        $(document).trigger('tick', ms_since_last_tick);
    }, (1/60)*1000);

    var game = new Game(canvas);
    game.start();
});
$(function () {

    var canvas = document.getElementById('canvas');

    var last_tick = new Date();
    setInterval(function(){
        var now = new Date();
        var ms_since_last_tick = now - last_tick;
        last_tick = now;
        $(document).trigger('tick', ms_since_last_tick);
    }, (1/60)*1000);

    var controllers = {
        menu: new Menu(canvas),
        game: new Game(canvas),
        options: new Options(canvas),
        key_change: new KeyChange(canvas)
    };
    $.each(controllers, function(name, controller){
        controller.controllers = controllers;
    });
    controllers.menu.activate();
});
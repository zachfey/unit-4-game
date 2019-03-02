$(document).ready();

var goodSelect, badSelect, goodPicked, badPicked, gameOver



game = {

    initialize: function(){
        goodSelect = null;
        goodPicked = false;
        badSelect = null;
        badPicked = false;
        gameOver = false;
    },
}

game.initialize();
console.log('initialize');

    if(goodPicked === false){
        $('.goodGuy').on('click', function(){
            goodSelect = this.id;
            console.log(goodSelect);
            goodPicked = true
            $("#goodSelect").hide();
            console.log(goodPicked);
            $(this).clone().appendTo('#battleground');
            $(this).css('float', 'left');
            $('#badSelect').css('visibility','visible');
        })
    }
    if(badPicked === false){
        $('.badGuy').on('click', function(){
            badSelect = this.id;
            console.log(badSelect);
            badPicked = true;
            $("#badSelect").hide();
            console.log(badPicked);
            $(this).clone().appendTo('#battleground');
            $('body').css('background-image','url(assets/images/backgroundSelected.jpg)');
            $(this).css('float', 'right');
            $('.arena').css('margin-top', '200px');
            $("h1").hide();
        })
    }

    document.onkeyup = function(event){
        console.log(goodPicked);
    }

$(document).ready();

var goodSelect, badSelect, goodPicked, badPicked, gameOver, fightStart



game = {

    initialize: function(){
        goodSelect = null;
        goodPicked = false;
        badSelect = null;
        badPicked = false;
        gameOver = false;
        fightStart = false;
    },

    characterSelect: function(obj){
        if(goodPicked === false){
            
            goodSelect = obj.id;
            goodPicked = true
            console.log('good guy: ' + goodSelect);

            $("#goodSelect").hide();

            $(obj).clone().appendTo('#battleground');
            $(obj).css('float', 'left');
            $('#badSelect').css('visibility','visible');
        }  else if(badPicked === false && goodPicked === true){
            
            badSelect = obj.id;
            badPicked = true;
            console.log('bad guy: '+badSelect);

            $("#badSelect").hide();
            
            $(obj).clone().appendTo('#battleground');
            $(obj).css('float', 'right');

            game.fightStart();
        }
    },

    fightStart: function(){
        $('body').css('background-image','url(assets/images/backgroundSelected.jpg)');
        $('.arena').css('margin-top', '200px');
        $("h1").hide();
        fightStart = true;
        console.log('fight has started')
    }
}

game.initialize();
console.log('initialize');


$('.goodGuy').on('click', function(){game.characterSelect(this);}) //if a good guy is clicked, check if good guy has been picked yet, and hide fighter select

$('.badGuy').on('click', function(){game.characterSelect(this);}) //if a good guy is clicked, check if good guy and bad guy have been picked yet, and hide enemy select


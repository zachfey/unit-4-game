$(document).ready();

var goodSelect, badSelect, goodPicked, badPicked, gameOver, fightStart, AP, HP, CAP, power,
    fighterArray, Cloud, Barret, Tifa, Aeris, Cactuar, Sephiroth, Malboro

// fighter = {
//     attack: function() {
//         this.attack = this.attack*2
//         return this.AP;
//     },

//     defend: function(power) {
//         this.HP = this.HP - power;
//     },
// }

function FighterConstructor(attackPower, healthPoints, counterAttackPower){
    this.AP = attackPower/2;
    this.HP =  healthPoints;
    this.CAP =  counterAttackPower;
}

FighterConstructor.prototype.attack = function(){
    this.AP = this.AP*2;
    console.log(this.AP + "inside prototype attack");
    return this.AP;
}

FighterConstructor.prototype.defend = function(power){
    this.HP = this.HP - power;
}

game = {

    initialize: function(){
        goodSelect = null;
        goodPicked = false;
        badSelect = null;
        badPicked = false;
        gameOver = false;
        fightStart = false;
        Cloud = new FighterConstructor(50, 150, 0);
        Barret = new FighterConstructor(50, 180, 0);
        Tifa = new FighterConstructor(50, 120, 0);
        Aeris = new FighterConstructor(50, 100, 0);
        Cactuar = new FighterConstructor(0, 100, 5);
        Sephiroth = new FighterConstructor(0, 150, 10);
        Malboro = new FighterConstructor(0, 180, 15);
        fighterArray = [Cloud, Barret, Tifa, Aeris, Cactuar, Sephiroth, Malboro];

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
    },

    attack: function(){
        if(badPicked === true && gameOver === false){
            
        }
    }
}

game.initialize();
console.log('initialize');


$('.goodGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy has been picked yet, and hide fighter select

$('.badGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy and bad guy have been picked yet, and hide enemy select

$('#attack').on('click', function(){game.attack();});
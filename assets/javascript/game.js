$(document).ready();

var goodSelect, badSelect, goodPicked, badPicked, gameOver, fightStart, AP, HP, CAP, power,
    fighterArray, Cloud, Barret, Tifa, Aeris, Cactuar, Sephiroth, Malboro, remainingDefenders

// fighter = {
//     attack: function() {
//         this.attack = this.attack*2
//         return this.AP;
//     },

//     defend: function(power) {
//         this.HP = this.HP - power;
//     },
// }

function FighterConstructor(name, attackPower, healthPoints, counterAttackPower){
    this.name = name;
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
        Cloud = new FighterConstructor('cloud', 50, 150, 0);
        Barret = new FighterConstructor('barret', 50, 180, 0);
        Tifa = new FighterConstructor('tifa', 50, 120, 0);
        Aeris = new FighterConstructor('aeris', 50, 100, 0);
        Cactuar = new FighterConstructor('cactuar', 0, 100, 5);
        Sephiroth = new FighterConstructor('sephiroth', 0, 150, 10);
        Malboro = new FighterConstructor('malboro', 0, 180, 15);
        fighterArray = [Cloud, Barret, Tifa, Aeris, Cactuar, Sephiroth, Malboro];
        remainingDefenders = 3;
    },

    characterSelect: function(obj){
        if(goodPicked === false){

            goodPicked = true
            for(var i in fighterArray){
                if(obj.id === fighterArray[i].name){
                    goodSelect = fighterArray[i];
                }
            }
            console.log('good guy: ' + goodSelect.name);

            $("#goodSelect").hide();

            $(obj).clone().attr('id', 'attacker').appendTo('#battleground');
            $(obj).css('float', 'left');
            $('#badSelect').css('visibility','visible');

        }  else if(badPicked === false && goodPicked === true){
            badPicked = true;
            for(var i in fighterArray){
                if(obj.id === fighterArray[i].name){
                    badSelect = fighterArray[i];
                }
            }
            console.log('bad guy: '+ badSelect.name);

            $("#badSelect").hide();

            $(obj).clone().attr('id', 'defender').appendTo('#battleground');
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
            goodSelect.attack()
            badSelect.defend(goodSelect.AP);
            goodSelect.defend(badSelect.CAP);
            console.log('update stats');
            game.updateStats;
            
            if(badSelect.HP < 1 && remainingDefenders > 0){
                $('#defender').remove();
                $('#' + badSelect.name).remove();
                $("#badSelect").show();
                badPicked = false;
                remainingDefenders--
            } else if(badSelect.HP < 1 && remainingDefenders < 1){
                game.Win();
            }
        }
    },
    
    win: function(){

    },

    updateStats: function(){
        $('#defender > .badFighterHP').text('Atk: ' + badSelect.CAP + ' | HP: ' + badSelect.HP);
        $('#attacker > .goodFighterHP').text('Atk: ' + goodSelect.AP + ' | HP: ' + goodSelect.HP);
    }
}

game.initialize();
console.log('initialize');


$('.goodGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy has been picked yet, and hide fighter select

$('.badGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy and bad guy have been picked yet, and hide enemy select

$('#attack').on('click', function(){game.attack();});
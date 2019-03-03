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
    this.AP = attackPower;
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
        Cloud = new FighterConstructor('cloud', 20, 150, 0);
        Barret = new FighterConstructor('barret', 10, 180, 0);
        Tifa = new FighterConstructor('tifa', 30, 120, 0);
        Aeris = new FighterConstructor('aeris', 40, 100, 0);
        Cactuar = new FighterConstructor('cactuar', 0, 80, 5);
        Sephiroth = new FighterConstructor('sephiroth', 0, 120, 25);
        Malboro = new FighterConstructor('malboro', 0, 180, 60);
        fighterArray = [Cloud, Barret, Tifa, Aeris, Cactuar, Sephiroth, Malboro];
        remainingDefenders = 3;
        for(var i in fighterArray){
            if(fighterArray[i].AP === 0){
                $('#' + fighterArray[i].name + ' > .fighterStats').text('Atk: ' + fighterArray[i].CAP + ' | HP: ' + fighterArray[i].HP);
                // $('#' + fighterArray[i].name).show();
            } else{
                $('#' + fighterArray[i].name + ' > .fighterStats').text('Atk: ' + fighterArray[i].AP + ' | HP: ' + fighterArray[i].HP);
            }

        }
        // $('#goodSelect').show()
        // $('#badSelect').css('visibility', 'hidden')
        // $('#retry').css('visibility', 'hidden')
        // $('#dialogue').hide()
        // $('#attack').show();
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
            $('#badSelect').css('visibility', 'visible');
            // $('#badSelect').show();

        }  else if(badPicked === false && goodPicked === true){
            badPicked = true;
            for(var i in fighterArray){
                if(obj.id === fighterArray[i].name){
                    badSelect = fighterArray[i];
                }
            }
            console.log('bad guy: '+ badSelect.name);

            $("#badSelect").css('visibility', 'hidden');
            $(obj).clone().attr('id', 'defender').appendTo('#battleground');
            $(obj).css('float', 'right');
            game.fightStart();
        }
    },

    fightStart: function(){
        $('#attack').css('visibility', 'visible');
        // $('body').css('background-image','url(assets/images/backgroundSelected.jpg)');
        $('#battle-begin').css('visibility', 'visible');
        $("#main-title").hide();
        fightStart = true;
        console.log('fight has started')
    },

    attack: function(){
        if(badPicked === true && gameOver === false){
            badSelect.defend(goodSelect.AP);
            goodSelect.attack()
            goodSelect.defend(badSelect.CAP);
            console.log('update stats');
            game.updateStats();
            
            if(game.battleStatus() === 'defenderDied'){
                game.defenderDefeated();
            } else if(game.battleStatus() === 'won'){
                game.win();
            } else if(game.battleStatus() === 'lost'){
                game.lost();
            } else if(game.battleStatus() === 'draw'){
                game.draw();
            }
        }
    },

    battleStatus: function(){
        if(goodSelect.HP > 0 && badSelect.HP > 0){
            console.log('ongoing');
            return 'ongoing';
        } else if(goodSelect.HP > 0 && badSelect.HP < 1 && remainingDefenders > 1) {
            console.log('defender died');
            return 'defenderDied';
        } else if(goodSelect.HP > 0 && badSelect.HP < 1 && remainingDefenders < 2) {
            console.log('won');
            return 'won';
        } else if(goodSelect.HP < 1 && badSelect.HP < 1 && remainingDefenders < 2) {
            console.log('draw');
            return 'draw';
        }  else if(goodSelect.HP < 1 && badSelect.HP > 1){
            console.log('lost');
            return 'lost';
        } else if(goodSelect.HP < 1 && badSelect.HP < 1 && remainingDefenders > 1){
            console.log('lost');
            return 'lost';
        }
    },
    
    win: function(){
        gameOver = true;
        game.playerDefeated();
        game.defenderDefeated();
        $('#dialogue').text("Victory!")
        $('#dialogue').css('display', 'block');
        $('#battle-begin').hide();
        $('#attack').hide();
        $('.character-select').hide();
        $('#retry').css('visibility', 'visible')
    },

    lost: function(){
        gameOver = true;
        game.playerDefeated();
        $('#dialogue').text("Failure!")
        $('#dialogue').css('display', 'block');
        $('#dialogue').css('color', 'red');
        $('#battle-begin').hide();
        $('#attack').hide();
        $("#badSelect").css('visibility', 'visible');
        $("#badSelect h2").css('visibility', 'hidden');
        $('#' + badSelect.name).remove();
        $('#retry').css('visibility', 'visible')
    },

    draw: function(){
        gameOver = true;
        game.playerDefeated();
        game.defenderDefeated();
        $('#dialogue').text("Draw!")
        $('#dialogue').css('display', 'block');
        $('#battle-begin').hide();
        $('#attack').hide();
        $('.character-select').hide();
        $('#retry').css('visibility', 'visible')
    },

    playerDefeated(){
        $('#attacker').remove();
        // $('body').css('background-image','url(assets/images/backgroundSelecting.jpg)');       
    },

    defenderDefeated(){
        $('#defender').remove();
        $('#' + badSelect.name).hide();
        if(!gameOver){
            $("#badSelect").css('visibility', 'visible');
            badPicked = false;
            remainingDefenders--
        }
        // $('body').css('background-image','url(assets/images/backgroundSelecting.jpg)');
    },

    updateStats: function(){
        $('#defender > .fighterStats').text('Atk: ' + badSelect.CAP + ' | HP: ' + badSelect.HP);
        $('#attacker > .fighterStats').text('Atk: ' + goodSelect.AP + ' | HP: ' + goodSelect.HP);
    },
}

game.initialize();
console.log('initialize');


$('.goodGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy has been picked yet, and hide fighter select

$('.badGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy and bad guy have been picked yet, and hide enemy select

$('#attack').on('click', function(){game.attack();});

$('#retry').on('click', function(){
    location.reload();
});
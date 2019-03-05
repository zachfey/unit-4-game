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

function FighterConstructor(name, attackPower, healthPoints, counterAttackPower){ //create a 'class' for fighter
    this.name = name;
    this.AP = attackPower;
    this.HP =  healthPoints;
    this.CAP =  counterAttackPower;
}

FighterConstructor.prototype.attack = function(){ //use prototype for methods of fighter class
    this.AP = this.AP*2;
    console.log(this.AP + "inside prototype attack");
    return this.AP;
}

FighterConstructor.prototype.defend = function(power){
    this.HP = this.HP - power;
}

game = {

    initialize: function(){
        goodSelect = null; //no attacker has been picked
        goodPicked = false; //attacker has not been picked yet
        badSelect = null; // no defender has been picked
        badPicked = false; //defender has not been picked yet
        gameOver = false; //game is nto over
        fightStart = false; //the battle has not yet begun
        Cloud = new FighterConstructor('cloud', 20, 150, 0); //create an object for each fighter using the classes listed above
        Barret = new FighterConstructor('barret', 10, 180, 0);
        Tifa = new FighterConstructor('tifa', 30, 120, 0);
        Aeris = new FighterConstructor('aeris', 40, 100, 0);
        Cactuar = new FighterConstructor('cactuar', 0, 80, 5);
        Sephiroth = new FighterConstructor('sephiroth', 0, 120, 25);
        Malboro = new FighterConstructor('malboro', 0, 180, 60);
        fighterArray = [Cloud, Barret, Tifa, Aeris, Cactuar, Sephiroth, Malboro]; //make an array of each fighter object
        remainingDefenders = 3; //this should change if more defenders are added
        for(var i in fighterArray){ //update the stats at the bottom of each fighters' cards based on the values given to the fighter constructor
            if(fighterArray[i].AP === 0){
                $('#' + fighterArray[i].name + ' > .fighterStats').text('Atk: ' + fighterArray[i].CAP + ' | HP: ' + fighterArray[i].HP);
                // $('#' + fighterArray[i].name).show(); //this code was from trying to get the initialize method to restart the game (instead of page refresh)
            } else{
                $('#' + fighterArray[i].name + ' > .fighterStats').text('Atk: ' + fighterArray[i].AP + ' | HP: ' + fighterArray[i].HP);
            }

        }
        // $('#goodSelect').show() //this code was from trying to get the initialize method to restart the game (instead of page refresh)
        // $('#badSelect').css('visibility', 'hidden')
        // $('#retry').css('visibility', 'hidden')
        // $('#dialogue').hide()
        // $('#attack').show();
    },

    characterSelect: function(obj){ //this method is used to select characters. The on click event is used and passes its object to this method
        if(goodPicked === false){ //if an attacker hasn't been seelcted yet (the defenders are hidden at this point)

            goodPicked = true
            for(var i in fighterArray){ //find out which fighter was selected
                if(obj.id === fighterArray[i].name){
                    goodSelect = fighterArray[i]; // assign the attacker variable to the selected fighter object
                }
            }
            console.log('good guy: ' + goodSelect.name);
            $("#goodSelect").hide(); //hide the attacker selection screen
            $(obj).clone().attr('id', 'attacker').appendTo('#battleground'); //clone the fighter object and stick it in the battle area
            $(obj).css('float', 'left');
            $('#badSelect').css('visibility', 'visible'); //show the defender select screen
            // $('#badSelect').show(); //this code was from trying to get the initialize method to restart the game (instead of page refresh)


        }  else if(badPicked === false && goodPicked === true){//if an attacker has been selected but not a defender
            badPicked = true;
            for(var i in fighterArray){ //find out which defender was selected
                if(obj.id === fighterArray[i].name){
                    badSelect = fighterArray[i]; //assign the selected defender object to the defender variable 
                }
            }
            console.log('bad guy: '+ badSelect.name);

            $("#badSelect").css('visibility', 'hidden');//hide the defender select screen
            $(obj).clone().attr('id', 'defender').appendTo('#battleground'); //clone the defender object and stick it in the battle arena
            $(obj).css('float', 'right');
            game.fightStart(); //run the fightStart method
        }
    },

    fightStart: function(){
        $('#attack').css('visibility', 'visible'); //show the attack button
        // $('body').css('background-image','url(assets/images/backgroundSelected.jpg)'); //this code was from trying to get the initialize method to restart the game (instead of page refresh)
        $('#battle-begin').css('visibility', 'visible'); //show the battle begin font
        $("#main-title").hide(); //hide the title
        fightStart = true;
        console.log('fight has started')
    },

    attack: function(){ //this method is run when jQuery detects that the attack button was clicked
        if(badPicked === true && gameOver === false){ //if a defender is selected and the game is not over
            badSelect.defend(goodSelect.AP); //decrease the defender HP based on attacker attack power
            goodSelect.attack() //double the attacker attack power
            goodSelect.defend(badSelect.CAP); //decrease the attacker HP based on defender counter attack power
            console.log('update stats');
            game.updateStats(); //update the stats for the attacker and defender
            
            if(game.battleStatus() === 'defenderDied'){ // check the battle status
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

    battleStatus: function(){ //determine the battle status
        if(goodSelect.HP > 0 && badSelect.HP > 0){ //if both players are alive
            console.log('ongoing');
            return 'ongoing';
        } else if(goodSelect.HP > 0 && badSelect.HP < 1 && remainingDefenders > 1) { //if the defender is dead but more defenders remain
            console.log('defender died');
            return 'defenderDied';
        } else if(goodSelect.HP > 0 && badSelect.HP < 1 && remainingDefenders < 2) {// if the defender is dead but no more defenders remain
            console.log('won');
            return 'won';
        } else if(goodSelect.HP < 1 && badSelect.HP < 1 && remainingDefenders < 2) {// if both attacker and defender are dead but no defenders remain
            console.log('draw');
            return 'draw';
        }  else if(goodSelect.HP < 1 && badSelect.HP > 1){// if attacker is dead and defender is not
            console.log('lost');
            return 'lost';
        } else if(goodSelect.HP < 1 && badSelect.HP < 1 && remainingDefenders > 1){// if both attacker and defender die but more defenders remain
            console.log('lost');
            return 'lost';
        }
    },
    
    win: function(){ //you win!
        gameOver = true;
        game.playerDefeated(); //removes the attacker card
        game.defenderDefeated(); //removes the defender card
        $('#dialogue').text("Victory!")//display victory text
        $('#dialogue').css('display', 'block');//format victory text
        $('#battle-begin').hide(); //hide battle begin text
        $('#attack').hide(); //hide attack button
        $('.character-select').hide(); //hide character select screen
        $('#retry').css('visibility', 'visible') //show the retry button
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
        // $('body').css('background-image','url(assets/images/backgroundSelecting.jpg)');  //this code was from trying to get the initialize method to restart the game (instead of page refresh)     
    },

    defenderDefeated(){
        $('#defender').remove(); //remove the defender obj
        $('#' + badSelect.name).hide(); //hide the defeated defender from the list of defenders
        if(!gameOver){ //if the game is not over
            $("#badSelect").css('visibility', 'visible'); //show the list of defenders
            badPicked = false;
            remainingDefenders--
        }
        // $('body').css('background-image','url(assets/images/backgroundSelecting.jpg)'); //this code was from trying to get the initialize method to restart the game (instead of page refresh)
    },

    updateStats: function(){
        $('#defender > .fighterStats').text('Atk: ' + badSelect.CAP + ' | HP: ' + badSelect.HP); //update the attacker stats
        $('#attacker > .fighterStats').text('Atk: ' + goodSelect.AP + ' | HP: ' + goodSelect.HP); //update the defender stats
    },
}

game.initialize();
console.log('initialize');


$('.goodGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy has been picked yet, and hide fighter select

$('.badGuy').on('click', function(){game.characterSelect(this);}); //if a good guy is clicked, check if good guy and bad guy have been picked yet, and hide enemy select

$('#attack').on('click', function(){game.attack();}); //when the attack button is clicked, execute the game.attack method

$('#retry').on('click', function(){
    location.reload(); //I couldn't get the game.Initialize method to work in time, so I just used a page reload for now
});
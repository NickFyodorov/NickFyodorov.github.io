var form = document.getElementById("diceroll_form");
var output = document.getElementById("diceroll_res");
var formula_output = document.getElementById("diceroll_formula");



function formula_roll(str) {
    str = str.replace(/(\s+)/g, ''); //removing whitespaces
    var dices = str.split(/[+-]/g); //getting formulas for all dicerolls
    var signs = str.split(/[^+-]/g).filter(function (el) { return el !== '' }); //getting signs between dice rolls
    if (dices.length - signs.length !== 0) {
        if (dices.length - signs.length === 1) signs.unshift('+'); //if the first roll was w/o minus(-) we add plus(+)
        else throw Error('Nope!'); //else sth is wrong
    }

    //converting +/- to 1/-1
    for (i = 0; i < signs.length; ++i) {
        if (signs[i] === '+') signs[i] = 1;
        else if (signs[i] === '-') signs[i] = -1;
        else signs[i] = 0;
    }

    rolls = [];

    //rolling each dice
    for (var i = 0; i < dices.length; ++i) {
        if (!/^[1-9]\d*[d][1-9]\d*$/.test(dices[i]) && !/^[1-9]\d*$/.test(dices[i])) throw Error('Nope!');
        var diceroll = dices[i].split(/[d]/);
        var number = Math.abs(parseInt(diceroll[0]));
        if (diceroll[1] != undefined) { //if dice is not a constant - roll it
            var dice = parseInt(diceroll[1]);
            for (var roll = []; number > 0; --number) roll.push(signs[i] * (Math.floor(Math.random() * dice) + 1));
            rolls.push(roll);
        }
        else rolls.push([number]); //else write the constant as a roll
    }

    //return (rolls); //result is an array of all rolls, which are also arrays of separate dice rolls with corresponding signs
    
    var res = "" + rolls[0][0];

    for(j = 1; j < rolls[0].length; ++j) {
            res = res + " + " + rolls[0][j];
        }

    for(i = 1; i < rolls.length; ++i) {
        for(j = 0; j < rolls[i].length; ++j) {
            res = res + " + " + rolls[i][j];
        }
    }

    var sum = 0;

    for(i = 0; i < rolls.length; ++i) {
        for(j = 0; j < rolls[i].length; ++j)
        sum = sum + rolls[i][j];
    }

    res = res + " = " + sum;
    return res;
}

function my_echo() {
    var str = form.value;
    var res = formula_roll(str);
    output.innerHTML = "Result: " + res;
    formula_output.innerHTML = "Formula: " + str; // + res;
    return false; // Prevent page refresh   
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
})
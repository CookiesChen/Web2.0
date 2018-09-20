var state = 0;//0:end 1:start
var ifcheat = 0;
function load() {
    var walls = document.getElementsByClassName("wall");
    for (var i = 0; i < walls.length; i++) {
        walls[i].onmouseover = wall;
    }
    document.getElementById("start").onmouseover = startgame;
    document.getElementById("end").onmouseover = endpoint;
    document.getElementById("maze").onmouseleave = function () {
        if (state == 1) {
            ifcheat = 1;
        }
        else if (state == 0) {
            for (var i = 0; i < document.getElementsByClassName("wall").length; i++) {
                document.getElementsByClassName("wall")[i].style.backgroundColor = "rgb(230, 230, 230)";
            }
        }
    }
}

function startgame() {
    document.getElementById("outcome").innerHTML = "";
    document.body.style.cursor = "pointer";
    for (var i = 0; i < document.getElementsByClassName("wall").length; i++) {
        document.getElementsByClassName("wall")[i].style.backgroundColor = "rgb(230, 230, 230)";
    }
    document.getElementById("outcome").innerHTML = "Game start!";
    state = 1;
    ifcheat = 0;
}

function wall() {
    if (state == 1) {
        this.style.backgroundColor = "red";
        endgame(0);
    }
}

function endpoint() {
    if (state == 1) {
        if (ifcheat == 0) {
            endgame(1);
        }
        else if (ifcheat == 1) {
            endgame(2);
        }
    }
}

function endgame(x) {
    switch (x) {
        case 0:
            document.getElementById("outcome").innerHTML = "You lose!";
            break;
        case 1:
            document.getElementById("outcome").innerHTML = "You win!";
            break;
        case 2:
            document.getElementById("outcome").innerHTML = "You cheat!";
    }
    document.body.style.cursor = "auto";
    state = 0;
    ifcheat = 0;
}


//时间倒计时条

var game_state = 0; //0:end 1:start
var select = -1;
function load() {
    document.getElementById("start-stop").onclick = changestate;
    for (var i = 0; i < 60; i++) {
        var node = document.createElement("input");
        node.type = "radio";
        node.value = i + 1;
        node.className = "button";
        node.name = "mole";
        document.getElementById("mole-area").appendChild(node);
    }
    for (var i = 0; i < 60; i++) {
        document.getElementsByClassName("button")[i].onclick = score;
    }
}

function changestate() {
    if (game_state == 0) {
        game_state = 1;
        select = -1;
        document.getElementById("game-state").value = "Playing";
        document.getElementById("time").innerHTML = 31;
        document.getElementById("score").value = 0;
        document.getElementById("time-bar").style.backgroundColor = "rgb(0, 255, 242)";
        settarget();
        time();
    }
    else {
        game_state = 0;
        document.getElementById("game-state").value = "Game Over";
    }
}

function time() {
    if (game_state == 0) return;
    var timeleft = document.getElementById("time").innerHTML;
    document.getElementById("time").innerHTML = --timeleft;
    document.getElementById("time-bar").style.width = (64 * (timeleft / 30)).toString() + "px";
    changebarcolor(timeleft);
    if (timeleft > 0) {
        setTimeout("time()", 1000);
    }
    else {
        endgame();
    }
}

function score() {
    if (game_state == 0) {
        this.checked = false;
        if (select != -1) document.getElementsByClassName("button")[select].checked = true;
        return;
    }
    if (parseInt(select) + 1 == this.value) {
        document.getElementById("score").value++;
        settarget();
    }
    else {
        document.getElementById("score").value--;
        this.checked = false;
        document.getElementsByClassName("button")[select].checked = true;
    }
}

function settarget() {
    var temp = (Math.random() * 100 % 60).toFixed(0);
    while (select == temp) {
        temp = (Math.random() * 100 % 60).toFixed(0);
    }
    select = (Math.random() * 100 % 60).toFixed(0);
    document.getElementsByClassName("button")[select].checked = true;
}

function endgame() {
    alert("Game Over.\n" + "Your score is: " + document.getElementById("score").value.toString());
    game_state = 0;
    document.getElementById("game-state").value = "Game Over";
}

function changebarcolor(x) {
    if (x == 20) {
        document.getElementById("time-bar").style.backgroundColor = "yellow";
    }
    else if (x == 10) {
        document.getElementById("time-bar").style.backgroundColor = "red";
    }
}
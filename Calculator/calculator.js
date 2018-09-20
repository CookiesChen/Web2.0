var output = "0";
var store = "";
var ifshow = "hide";
var ifclear = 0;
var numlen = 0;
function calculate(x){
    executeinput(x);
    showhistory();
}
function executeinput(x){
    if(x == "="){ 
        try{
            if(store == "") store += output;
            if(store.indexOf("//") >= 0) throw 1;
            eval(store);
            show();
            save();
            ifclear = 1;
        }
        catch(expection){
            showerror();
        }
        numlen = 0;
    }
    else if(x == "CE"){
        store = "";
        output = "";
        document.getElementById("output").innerHTML = "0";
        ifclear = 0;
        numlen = 0;
    }
    else if(x == "←"){
        if(store.length >= 1){
            if(store.charAt(store.length - 1) <= 9 && store.charAt(store.length - 1) >= 0) numlen--;
            store = store.substring(0,store.length - 1);
        }
        ifclear = 0;
    }
    else if(x <= 9 && x >= 0){
        if(numlen <= 17){
            numlen ++;
            store += x;
            output += x;
            ifclear = 0;
        }
    }
    else if(x == "+" || x == "-" || x == "*" || x == "/"){
        if(ifclear == 1){
            store += output;
        }
        store += x;
        ifclear = 0;
        numlen = 0;
    }
    else{
        store += x;
        ifclear = 0;
    }
}

function show(){
    output = eval(store).toString();
    if(eval(store).toString() == eval(1/0).toString()){
        output = "0";
        store = "";
        document.getElementById("output").innerHTML = "NaN";
    }
    else{
        document.getElementById("output").innerHTML = parseInt(eval(output) * 100000000) / 100000000;
    }
}

function showhistory(){
    document.getElementById("history").innerHTML = store;
}

function seehistory(){
    if(ifshow == "hide"){
        document.getElementById("history-area").style.width = "320px";
        document.getElementById("button-area").style.opacity = 0;
        ifshow = "show";
    }
    else{
        document.getElementById("history-area").style.width  = "0px";
        document.getElementById("button-area").style.opacity = 1;
        ifshow = "hide";
    }
}

function save(){
    if(store != ""){
        var textnode1 = document.createTextNode(store + "=");
        document.getElementById("history-area").appendChild(textnode1);
        var br1 = document.createElement("br");
        document.getElementById("history-area").appendChild(br1);
        var textnode2 = document.createTextNode(parseInt(eval(output) * 100000000) / 100000000);
        document.getElementById("history-area").appendChild(textnode2);
        var br2 = document.createElement("br");
        document.getElementById("history-area").appendChild(br2);
        var br3 = document.createElement("br");
        document.getElementById("history-area").appendChild(br3);
        store = "";
    }
}

function showerror(){
    document.getElementById("error").style.opacity = 1;
    setTimeout("document.getElementById('error').style.opacity = 0",1000);
}
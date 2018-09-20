
onload = function () {
    $("#submit").click(judge);
    $("#reset").click(reset);
}

function judge() {
    var if_err = 0;
    for (var i = 0; i < $(".input").length; i++) {
        if ($(".input")[i].value == "") {
            switch (i) {
                case 0:
                    $("#err").text("用户名为空");
                    break;
                case 1:
                    $("#err").text("学号为空");
                    break;
                case 2:
                    $("#err").text("电话为空");
                    break;
                case 3:
                    $("#err").text("邮箱为空");
                    break;
            }
            if_err = 1;
            break;
        }
    }
    if (if_err || !checkformat()) {
        show()
        return;
    }
    var user = "";
    for (var i = 0; i < 3; i++) {
        user += $(".input")[i].value + ",";
    }
    user += $(".input")[3].value;
    $.post("user", user, function (data) {
        switch (data) {
            case '0':
                $("#err").text("用户名已被注册");
                show();
                break;
            case '1':
                $("#err").text("学号已被注册");
                show();
                break;
            case '2':
                $("#err").text("电话已被注册");
                show();
                break;
            case '3':
                $("#err").text("邮箱已被注册");
                show();
                break;
            default:
                window.location.href = ("/?username=" + data.toString().split(',')[0]);
                break;
        }
    });
}

function reset() {
    $(".input").val("");
}

function checkformat() {
    for (var i = 0; i < $(".input").length; i++) {
        switch (i) {
            case 0:
                if (!(/[a-zA-Z]\w{5,17}/.test($("input[name='username']").val()))) {
                    $("#err").text("用户名格式有误");
                    return false;
                }
                break;
            case 1:
                if (!/[1-9][0-9]{7}/.test($("input[name='number']").val())) {
                    $("#err").text("学号格式有误");
                    return false;
                }
                break;
            case 2:
                if (!/[1-9][0-9]{10}/.test($("input[name='phone']").val())) {
                    $("#err").text("电话格式有误");
                    return false;
                }
                break;
            case 3:
                if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($("input[name='email']").val())) {
                    $("#err").text("邮箱格式有误");
                    return false;
                }
                break;
        }
    }
    return true;
}

function show(){
    $("#err").attr("class", "show");
    setTimeout(function () {
        $("#err").attr("class", "hide");
    }, 1000);
}
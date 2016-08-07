/**
 * Created by Administrator on 2016/4/27.
 */
function checkUser() {
    var username = document.getElementById("username");
    username.onkeyup = function () {
        //做了浏览器兼容的获得下一个元素节点，如果不符合要求，则在后面的span显示相应的文字
        var userspan = getNextElementSbiling(this);
        var userReg = /^[a-z_A-Z][a-zA-Z0-9]{3,15}$/;
        if (!userReg.test(this.value)) {
            //做了浏览器兼容的添加文字
            setInnerText(userspan, "帐号必须字母下划线开头，长度为4-16位");
        } else {
            setInnerText(userspan, "");
        }
    }
}


function checkPass(){
    var password = document.getElementById("password");
    password.onkeyup = function () {
        //做了浏览器兼容的，如果不符合要求，则在后面的span显示相应的文字
        var passspan = getNextElementSbiling(this);
        var reg1 = /^\w{4,10}$/;
        if (!reg1.test(this.value)) {
            setInnerText(passspan, "密码必须为4-10位字母或数字");
        } else {
            //否则取消文字
            setInnerText(passspan, "");
        }
    }
}



function init() {
    var shengArr = ["--请选择--", "山西", "天津市", "河南", "北京", "上海"];
    var shiArr = [
        ["--请选择--"],
        ['晋中市', '太原市', '吕梁市', '阳泉市', '运城市'],
        ['和平区', '河西区', '南开区', '河北区', '河东区', '红桥区', '塘古区', '开发区'],
        ['郑州市', '洛阳市'],
        ['朝阳区', '东城区', '西城区', '海淀区', '宣武区', '丰台区', '怀柔', '延庆', '房山'],
        ['长宁区', '丰贤区', '虹口区', '黄浦区', '青浦区', '南汇区', '徐汇区', '卢湾区']
    ];
    //初始化第一个省和第一个市
    var sheng = document.getElementById("sheng");
    var shi = document.getElementById("shi");
    //设置长度
    sheng.length = shengArr.length;
    shi.length = 1;
    //设置省
    for (var i = 0; i < shengArr.length; i++) {
        sheng.options[i].text = shengArr[i];
    }
    //设置市
    shi.options[0].text = shiArr[0][0];
}

//当选择被改动的时候
function change(index) {
    var shiArr = [
        ["--请选择--"],
        ['晋中市', '太原市', '吕梁市', '阳泉市', '运城市'],
        ['和平区', '河西区', '南开区', '河北区', '河东区', '红桥区', '塘古区', '开发区'],
        ['郑州市', '洛阳市'],
        ['朝阳区', '东城区', '西城区', '海淀区', '宣武区', '丰台区', '怀柔', '延庆', '房山'],
        ['长宁区', '丰贤区', '虹口区', '黄浦区', '青浦区', '南汇区', '徐汇区', '卢湾区']
    ];
    var shi = document.getElementById("shi");
    shi.length = shiArr[index].length;
    for (var i = 0; i < shi.length; i++) {
        shi.options[i].text = shiArr[index][i];
    }
}


function ass_index(){
    var returnid = document.getElementById("returnid");
    returnid.onclick = function () {
        location.assign("./index.html");
    }
}


function ass_reg(){
    var reg = document.getElementById("reg");
    reg.onclick = function () {
        location.assign("./reg.html");
    }
}


function index_lunbo(){
    var lunbo = document.getElementById("lunbo");
    function start() {
        lunbo.src = "images/lunbo" + Math.floor(Math.random() * 5 + 1) + ".jpg";
    }
    setInterval(start, 1000);
}

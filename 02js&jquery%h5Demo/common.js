/**
 * Created by apple on 16/4/22.
 */
/**
 * 兼容浏览器的innerText.setter
 * @param element使用innerText的元素
 * @param content要给元素设置的内容
 * */
function setInnerText(element, content) {

    if (typeof element.innerText === "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }

}
/**
 * 兼容浏览器的innerText.getter
 * @param element使用innerText的元素
 * @return 该元素的innerText内容
 * */
function getInnerText(element) {

    if (typeof element.innerText === "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }

}


/**
 * 根据location.search返回一个装有键值对的对象
 * @param 传入location对象获得其中所有的键值对的对象
 * @return 装有kv的对象
 * */
function kvOfSearch(locSear) {
    var str = locSear.substring(1);
    ;
    //保存数据对象
    var args = {};
    var kv = null;
    var name = null;
    var value = null;
    //获得键值集合的数组
    var items = str.length ? str.split("&") : [];
    //遍历每个键值对,获得kv的单个数组,并且解码以后传入对象
    for (var i = 0; i < items.length; i++) {
        kv = items[i].length ? items[i].split("=") : [];
        name = decodeURIComponent(kv[0]);
        value = decodeURIComponent(kv[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

/**
 * 根据传入的参数判定浏览器是否支持这个插件，不兼容IE
 * @param name 插件名字
 * @return boolean值
 * */
function checkPlugins(name) {

    var name = name.toLowerCase();
    for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}


/**
 * 将nodeList对象转换为一个数组，兼容所有浏览器
 * @param node接收一个父节点下的所有node
 * @return 返回一个数组对象
 * */
function nodeListArray(nodes) {
    //使用dom
    var arr = null;
    try {
        Array.prototype.slice.call(nodes, 0);
    } catch (ex) {
        for (var i = 0; i < nodes.length; i++) {
            //兼容IE8使用COM的情况，遍历出所有的元素重新装入数组
            arr.push(nodes[i]);
        }
    }
    return arr;
}

/**
 * 获取指定元素的下一个兄弟元素，兼容IE8，若有返回下一个元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的下一个兄弟元素
 * */
function getNextElementSbiling(element) {
    if (element.nextElementSibling.nodeType === 1) {
        return element.nextElementSibling;
    } else {
        var el = element.nextSibling;
        //只要el的下一个节点不是元素就进行循环，但是一定要判断el是否为null，
        //若已经取到空了，就该马上停止循环，并且把上一个元素返回。
        while (el && 1 !== el.nodeType) {
            el = el.nextSibling;
        }
        return el;
    }
}


/**
 * 获取指定元素的上一个兄弟元素，兼容IE8，若有返回上一个元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的上一个兄弟元素
 * */
function getPreElementSbiling(element) {
    if (element.nextElementSibling.nodeType === 1) {
        return element.previousElementSibling
    } else {
        var el = element.previousSibling;
        //只要el的下一个节点不是元素就进行循环，但是一定要判断el是否为null，
        //若已经取到空了，就该马上停止循环，并且把上一个元素返回。
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;
        }
        return el;
    }
}


/**
 * 获取指定元素的第一个子元素，兼容IE8，若有返回第一个子元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的子元素
 * */
function getFirstElementChild(element) {

    if (element.firstElementChild.nodeType === 1) {
        return element.firstElementChild;
    } else {
        var el = element.firstChild;
        while (el && 1 !== el.nodeType) {
            el = el.getNextElementSbiling(el);
        }
        return el;
    }
}

/**
 * 获取指定元素的最后一个子元素，兼容IE8，若有最后第一个子元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的最后子元素
 * */
function getLastElementChild(element) {

    if (element.lastElementChild.nodeType === 1) {
        return element.lastElementChild;
    } else {
        var el = element.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.getPreElementSbiling(el);
        }
        return el;
    }
}

/**
 * document.getelementId的缩写
 * */
function my$(name) {
    return document.getElementById(name);
}


/**
 * h5新增方法classname删除classname中某个类名的简化方法
 * @param 原classname字符串
 * @param 要删除的classname字符串
 * @return 删除以后的新字符串
 * */
function deleteClassNameItem(preClsName, delName) {

    //使用空格切分字符串
    var cnArr = preClsName.split(/\s+/);
    //pos默认为-1，若是没有找到就什么都不删除
    var i = 0, len = cnArr.length, pos = -1;
    for (i; i < len; i++) {
        //遍历数组查找要删除的字符串，记录其位置
        if (cnArr[i] === delName) {
            //若是找到则记录其下标
            pos = i;
        }
    }
    //删除找到的元素，修改了原来的的数组 slice是一个新的数组被返回
    cnArr.splice(pos, 1);
    //返回修改后的数组
    return cnArr.join(" ");
}


/**
 * h5新增方法classname
 * @param 原classname字符串
 * @param 要添加的classname类名字符串
 * @return 最新的className字符串类名
 * */
function appendClassNameItem(preClsName, newName) {

    //使用空格切分字符串
    var cnArr = preClsName.split(/\s+/);
    //向数组中追加最后一个class类名
    cnArr.push(newName);
    //返回修改后的数组
    return cnArr.join(" ");
}


/**
 * 判定一个节点是否为元素类型
 * @param 节点对象
 * @return Boolean
 * */
var isElement = function (obj) {
    //html和xml中都有createElement方法
    var testDiv = document.createElement('div');
    if (obj && obj.nodeType === 1) {//先过滤最简单的
        if (window.Node && (obj instanceof Node )) { //如果是IE9,则判定其是否Node的实例
            //由于obj可能是来自另一个文档对象
            //他有可能是一个你自定义的对象节点，因此不能轻易返回false，做最后的排除
            return true;
        }
        try {
            //“最后”以这种效率非常差但肯定可行的方案进行判定
            //没有办法才会走这步，因为效率差，如果方法里直接用这个很明显效率太低
            testDiv.appendChild(obj);
            testDiv.removeChild(obj);
        } catch (e) {
            //很有可能是某个自定义对象中包含了nodeType属性，且值正好为1
            return false;
        }
        return true;
    }
    return false;
}


/**
 * 判定页面是XMl类型还是HTML类型
 * @param 任意元素
 * @return number(0为XMl,1为HTML，其他为-1(不是元素或者是xml和html之外的文档类型))
 * */
var getXMLType = function (el) {
    //善用功能型判定而不用属性型判定
    if (isElement(el)) {
        if (el.ownerDocument.createElement("p").nodeName !== el.ownerDocument.createElement("P").nodeName) {
            //此处未完善的地方是，新建完了p没有释放
            return 0;
        } else if (el.ownerDocument.createElement("p").nodeName === el.ownerDocument.createElement("P").nodeName) {
            return 1;
        }
        return -1;
    } else {
        return -1;
    }
}


/**
 * 判断B元素是否为A元素的子节点，修复了IE下只能判断元素节点的怪癖
 * @param 任意元素A
 * @param 任意元素B
 * @return Bool
 * */
var fixContains = function (nodeA, nodeB) {
    try {
        //如果是document节点了，其上层节点为null
        while (nodeB = nodeB.parentNode) {
            if (nodeB === nodeA) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}


/**
 * 兼容所有浏览器的监听事件相关修复，dom2级针对ie的修复
 * */
var eventUtils =
{
    /**
     * 修复I9以下版本不支持Dom2级监听事件,兼容所有浏览器的添加监听事件
     * @param element dom元素对象
     * @param type 事件名称
     * @param func 函数对象
     * */
    addHandle: function (element, type, func) {
        //判断是否为dom2级
        if (element.addEventListener) {
            element.addEventListener(type, func, false);
        } else if (element) {
            //使用ie专用的方法
            element.attachEvent('on' + type, func);
        } else {
            //使用dom0级或html级别使用所有浏览器
            element['on' + type] = func;
        }
    },

    /**
     * 修复I9以下版本不支持Dom2级监听事件,兼容所有浏览器的移除监听事件
     * */
    removeHandle: function (element, type, func) {
        //判断是否为dom2级
        if (element.removeEventListener) {
            element.removeEventListener(type, func, false);
        } else if (element) {
            //使用ie专用的方法
            element.detachEvent('on' + type, func);
        } else {
            //使用dom0级或html级别使用所有浏览器
            element['on' + type] = null;
        }

    },

    /**
     * 修复ie8以前event必须使用window.event调用，此方法用于内调
     * @return 兼容各个浏览器的event对象
     * */
    getEvent: function (e) {
        return e || window.event;
    },

    /**
     * 修复ie使用不同的获取事件源目标对象的id的api
     * @return 兼容各个浏览器事件源对象
     * */
    getEventTargetId: function (e) {
        var e = this.getEvent(e);
        return e.target["id"] || e.srcElement["id"];
    },

    /**
     * 修复ie使用不同的事件冒泡的api，其他浏览器为方法，ie使用属性
     * */
    stopPropagation: function (e) {
        var e = this.getEvent(e);
        //能力检测直接调方法会出错，所以要调用属性，看其返回是否存在即可
        if (e.stopPropagation) {
        } else {
            //使用ie的,true为取消事件冒泡
            e.cancelBubble = true;
        }
    },
    /**
     * 修复ie使用不同的阻止默认行为的api，其他浏览器为方法，ie使用属性
     * */
    preventDefault: function (e) {
        var e = this.getEvent(e);
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            //ie下的
            e.returnValue = false;
        }
    },

    /**
     * 修复ie使用pageX的兼容性问题,事件对象的兼容性问题也已经解决，直接传进来事件对象即可
     * */
    getPageX: function (e) {
        //判定e
        var event = this.getEvent(e);
        //返回正常下的pageX或者IE下的
        return event.pageX||event.clientX+scroll().left;
    },

    /**
     * 修复ie使用pageY的兼容性问题,事件对象的兼容性问题也已经解决，直接传进来事件对象即可
     * */
    getPageY: function (e) {
        var event = this.getEvent(e);
        //client的高度加上页面滚动的高度
        return event.pageY||event.clientY+scroll().top;
    }

}


/**
 * 兼容所有页面的getElementsByClassName
 * @param clsName 要查找的className
 * @param parentId 传入要查找范围内的元素的id，若省略则为document
 * @return 符合条件的className的数组集合
 * */
var getByClass = function (clsName, parentId) {
    var arr = [];
    //判断父类元素对象是否存在，如果存在则返回其第一个子元素对象
    var element = parentId ? document.getElementById(parentId) : document;
    //获得一个该元素对象或者document对象下面的所有标签数组
    var eleArr = element.getElementsByTagName("*");
    for (var i = 0, len = eleArr.length; i < len; i++) {
        //遍历数组如果数组中有一个元素的className与传进来的classname相等则将元素放入数组
        if (eleArr[i].className === clsName) {
            arr.push(eleArr[i]);
        }
    }
    return arr;
}


/**
 * 兼容所有浏览器的获取滚动上边距和左边距
 * @return 包含滚动上边距和左边距属性的对象
 * */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}


/**
 * 兼容所有浏览器的可视内容区域的宽高
 * @return 包含可视内容区域的宽高
 * */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}


/**
 * 动画的一系列方法
 * */
var animate = {
    /**
     * 匀速动画
     * @param ele 要添加缓动动画的元素
     * @param target 目标点
     * */
//判断步长是看元素在target的左边还是右边
//判断要不要移动是要看target和目标的距离是不是够一个步长
    animateAve: function (ele, target) {
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            ele.step = 10;
            ele.step = ele.offsetLeft <= target ? ele.step : -ele.step;
            var leader = ele.offsetLeft;
            leader += ele.step;
            //如果最终的目标和元素的起始位置大于步长
            if (Math.abs(target - ele.offsetLeft) > Math.abs(ele.step)) {
                ele.style.left = leader + "px";
            } else {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        }, 15);
    },

    /**
     * 获取渲染后指定的属性值(兼容IE)
     * @param ele 要获取的元素
     * @param attr 要获取的元素的属性
     * @return 元素指定的属性值,注意该属性值是字符串类型
     * */
    getCurrentStyle: function (ele, attr) {
        //当调用外面来的元素时，一定要判断这个元素是否存在或者是否为一个元素
        //否则就相当于给一个未知名的对象添加了一个属性，虽然也会返回undefined但是不是很省效率=
        if (ele && ele.currentStyle) {
            //先判断是否兼容IE
            return ele.currentStyle[attr];
        } else {
            return window.getComputedStyle(ele, null)[attr];
        }
    },

    /**
     * 为任意元素的任意属性实现动画，只能设置一个属性,不能设置透明度等
     * @param ele 要获取的元素
     * @param attr 要改变的属性
     * @param target 要获取的元素的属性
     * */
    animateOne: function (obj, attar, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //获得要改变的属性，属性是字符串且又可能带单位，所以使用parseInt转换
            var leader = parseInt(animate.getCurrentStyle(obj, attar)) || 0;
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            obj.style[attar] = leader + "px";
            if (leader == target) {
                clearInterval(timer);
            }
        }, 15)
    },
    /**
     * * 通过传入json改变对象的一组属性
     * * @param ele 要获取的元素
     * * @param json 要改变的属性的json
     * * @param fn 此回调函数为对象的所有属性都执行完毕以后调用的函数
     * * */
    animateJson: function (obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json) {
                //json 属性名:属性值 k:json[k]
                if (k == "opacity") {
                    //兼容IE7的透明属性
                    //获得opacity的值并且乘以100
                    var leader = parseInt(animate.getCurrentStyle(obj, k) * 100);
                    //将传进来的属性值乘以100，并且做相减
                    var target = json[k] * 100;
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    //将最终的结果除以
                    obj.style[k] = leader / 100;
                } else if (k == "zIndex") {
                    obj.style[k] = json[k];
                } else {
                    //获得要改变的属性，属性是字符串且又可能带单位，所以使用parseInt转换,left默认为auto
                    //所以如果获得的什么都不是，返回0
                    var leader = parseInt(animate.getCurrentStyle(obj, k)) || 0;
                    var target = json[k];
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader + "px";
                }
                //只要有一个未达到预定义的标准就把定时器置为false
                if (leader != target) {
                    flag = false;
                }
            }
            //当所有的属性都执行完毕，判断所有属性是否合格，若合格则清空定时器
            if (flag) {
                clearInterval(obj.timer);
                //回调函数在这里调用
                //但是调用以前要判断这个参数是否存在,只要我fn存在了就可以调用，否则不调用
                if (fn) {
                    fn();
                }
            }
        }, 15)
    }

}

/**
 * 传入一个数组，获取包含其最小值和索引的对象
 * @param arr需要获得最小值的数组
 * @return 包含最小值和索引的对象
 * */
function getArrMin(arr) {
    var obj = {};
    obj.index = 0;
    obj.value = arr[obj.index];
    for (var i = 0; i < arr.length; i++) {
        if (obj.value > arr[i]) {
            obj["value"] = arr[i];
            obj.index = i;
        }
    }
    return obj;
}

/**
 * 传入一个数组，获取包含其最大值和索引的对象
 * @param arr需要获得最大值的数组
 * @return 包含最大值和索引的对象
 * */
function getArrMax(arr) {
    var obj = {};
    obj.index = 0;
    obj.value = arr[obj.index];
    for (var i = 0; i < arr.length; i++) {
        if (obj.value < arr[i]) {
            obj["value"] = arr[i];
            obj.index = i;
        }
    }
    return obj;
}

/**
 * 获得浏览器默认选中的文字，兼容ie
 * @param arr需要获得最大值的数组
 * @return 包含最大值和索引的对象
 * */

function getSelectText() {
    //window为一般浏览器，document为i
    var text = window.getSelection().toString()||document.selection.createRange().text;
    return text;

}

/**
 * 将一组带空格的字符串，改变为首字母大写
 * @param str
 * @return 首字母大写后的字符串
 * */
function getStrCaption(str){
    var arr = str.split(" ");
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var newObj = arr[i].replace(arr[i].charAt(0),arr[i].charAt(0).toUpperCase());
        newArr.push(newObj);
    }
    return newArr.join(" ");
}
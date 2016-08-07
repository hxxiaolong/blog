/**
 * Created by apple on 16/4/22.
 */
/**
 * 兼容浏览器的innerText.setter
 * @param element使用innerText的元素
 * @param content要给元素设置的内容
 * */
function setInnerText(element,content){

    if(typeof element.innerText === "string"){
         element.innerText = content;
    }else{
         element.textContent = content;
    }

}
/**
 * 兼容浏览器的innerText.getter
 * @param element使用innerText的元素
 * @return 该元素的innerText内容
 * */
function getInnerText(element){

    if(typeof element.innerText === "string"){
        return element.innerText;
    }else{
        return element.textContent;
    }

}


/**
 * 根据location.search返回一个装有键值对的对象
 * @param 传入location对象获得其中所有的键值对的对象
 * @return 装有kv的对象
 * */
function kvOfSearch(locSear){
    var str = locSear.substring(1);;
    //保存数据对象
    var args = {};
    var kv=null;
    var name = null;
    var value = null;
    //获得键值集合的数组
    var items = str.length?str.split("&"):[];
    //遍历每个键值对,获得kv的单个数组,并且解码以后传入对象
    for (var i = 0; i < items.length; i++) {
        kv = items[i].length?items[i].split("="):[];
        name = decodeURIComponent(kv[0]);
        value = decodeURIComponent(kv[1]);
        if(name.length){
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
function checkPlugins(name){

    var name = name.toLowerCase();
    for (var i = 0; i < navigator.plugins.length; i++) {
            if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
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
function nodeListArray(nodes){
    //使用dom
    var arr = null;
    try{
         Array.prototype.slice.call(nodes,0);
    }catch(ex){
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
function getNextElementSbiling(element){
    if(element.nextElementSibling.nodeType === 1){
        return element.nextElementSibling;
    }else{
        var el = element.nextSibling;
        //只要el的下一个节点不是元素就进行循环，但是一定要判断el是否为null，
        //若已经取到空了，就该马上停止循环，并且把上一个元素返回。
        while(el && 1!==el.nodeType){
            el=el.nextSibling;
        }
        return el;
    }
}


/**
 * 获取指定元素的上一个兄弟元素，兼容IE8，若有返回上一个元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的上一个兄弟元素
 * */
function getPreElementSbiling(element){
    if(element.nextElementSibling.nodeType === 1){
        return element.previousElementSibling
    }else{
        var el = element.previousSibling;
        //只要el的下一个节点不是元素就进行循环，但是一定要判断el是否为null，
        //若已经取到空了，就该马上停止循环，并且把上一个元素返回。
        while(el && 1!==el.nodeType){
            el=el.previousSibling;
        }
        return el;
    }
}


/**
 * 获取指定元素的第一个子元素，兼容IE8，若有返回第一个子元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的子元素
 * */
function getFirstElementChild(element){

    if(element.firstElementChild.nodeType === 1){
        return element.firstElementChild;
    }else{
        var el = element.firstChild;
        while(el && 1!==el.nodeType){
             el=el.getNextElementSbiling(el);
        }
        return el;
    }
}

/**
 * 获取指定元素的最后一个子元素，兼容IE8，若有最后第一个子元素，若没有返回null
 * @param  指定的元素
 * @return 指定元素的最后子元素
 * */
function getLastElementChild(element){

    if(element.lastElementChild.nodeType === 1){
        return element.lastElementChild;
    }else{
        var el = element.lastChild;
        while(el && 1!==el.nodeType){
            el=el.getPreElementSbiling(el);
        }
        return el;
    }
}
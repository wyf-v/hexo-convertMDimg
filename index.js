

function ignore(data) {
    var source = data.source;
    var ext = source.substring(source.lastIndexOf('.')).toLowerCase();
    return ['md',].indexOf(ext) > -1;
}

function action(data) {
    var reverseSource = data.source.split("").reverse().join("");
    
    var fileName = reverseSource.substring(3, reverseSource.indexOf("/")).split("").reverse().join("");
    var regExp = RegExp("!\\[(.*?)\\]\\(" + fileName +
        '/(.+?)\\)', "g");
    // data.content = data.content.replace(regExp, "{%asset_img $2 %}","g");
    data.content = data.content.replace(regExp, "{% asset_img $2 $1 %}","g");
    data.raw = data.raw.replace(regExp, "{% asset_img $2 $1 %}","g");
    data._content = data._content.replace(regExp, "{% asset_img $2 $1 %}","g");
    // data.content = data.content.replace(regExp, "![]($2)","g");
    return data;
}

var deal_image=function(data){
    if(! ignore(data)){
        action(data)
    }
}
hexo.extend.filter.register('before_post_render',deal_image,0);
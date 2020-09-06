

function ignore(data) {
    var source = data.source;
    var ext = source.substring(source.lastIndexOf('.')).toLowerCase();
    return ['md',].indexOf(ext) > -1;
}

function action(data) {
    var reverseSource = data.source.split("").reverse().join("");
    console.log(reverseSource);

    var fileName = reverseSource.substring(3, reverseSource.indexOf("/")).split("").reverse().join("");
    console.log(fileName);
    var regExp = RegExp("!\\[(.*?)\\]\\(" + fileName +
        '/(.+?)\\)');
    console.log(regExp);
    // data.content = data.content.replace(regExp, "{%asset_img $2 %}","g");
    data.content = data.content.replace(regExp, "{% asset_img $2 $1 %}","g");
    data.raw = data.raw.replace(regExp, "{% asset_img $2 $1 %}","g");
    data._content = data._content.replace(regExp, "{% asset_img $2 $1 %}","g");
    // data.content = data.content.replace(regExp, "![]($2)","g");
    console.log(data.content)
    return data;
}

var deal_image=function(data){
    if(! ignore(data)){
        console.log("处理文件"+data.source);
        console.log(data);
        action(data)
        console.log(data);
    }
}
hexo.extend.filter.register('before_post_render',deal_image,0);
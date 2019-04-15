var $ = {
    ajax: function(opts) {
        // 创建xhr
        // get和post的区别  1.url不同，get需要拼接?  2.send,get发送的是null,post发送字符串data
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        // 建立连接
        var def = {
            async: true,
            dataType: 'json',
            type: 'get'
        }
        var opts = Object.assign({}, def, opts)
        var data = typeof opts.data == 'string' ? opts.data : this.format(opts.data)
        var url = opts.type == 'get' ? opts.url + '?' + data : opts.url
        xhr.open(opts.type, url, opts.async)
            // 判断
        xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // 成功
                    opts.success && opts.success(xhr.responseText)
                } else {
                    opts.error && opts.error()
                }
            }
            // 发送请求
        xhr.send(opts.type == 'get' ? null : data)
    },
    format: function(data) {
        // {name:"zhang", age: 18}
        // name=zhang&age=18
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&'
        }
        return str.replace(/&$/, '')
    }

}
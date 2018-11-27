var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var url = 'https://juejin.im/welcome/frontend';
var items = [];

https.get(url, function(res) {
    var data = "";
    res.on('data', function(chunk) {
        data += chunk;
    });
    res.on("end", function(chunk) {
        items = [];
        var $ = cheerio.load(data)
        $('#juejin .entry-list>li.item').each(function(index, element) {
            var $element = $(element);
            items.push({
                nav:$element.find('.main-header').html(),
                title: $element.find('.title-row a.title').text(),
                href: "https://juejin.im" + $element.find('.title-row a.title').attr('href'),
                like: $element.find('.action-row .like .count').text(),
                icon: $element.find('.action-row .action-list li').eq(0).find("a>img").attr('src'),
                icon1: $element.find('.action-row .action-list li').eq(1).find("a>img").attr('src'),
                count: $element.find('.action-row .action-list li').eq(0).find("a>span").text(),
                count1: $element.find('.action-row .action-list li').eq(1).find("a>span").text(),
                metaType: $element.find('.meta-row .meta-list li').eq(0).text(),
                metaAutor: $element.find('.meta-row .meta-list li').eq(1).text(),
                metaTime: $element.find('.meta-row .meta-list li').eq(2).text(),
                metaTag: $element.find('.meta-row .meta-list li').eq(3).text()

            });
        });
    });
});

http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
}).listen(8888);


console.log('Server running at http://127.0.0.1:8888/');

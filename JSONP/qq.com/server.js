/* 引入http server相关的包 */
var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2]; // 第2个参数指定为端口号

/* 要求用户输入端口号 */
if (!port) {
  console.log("Please describe the port number: node server.js 8888");
  process.exit(1);
}

/* 配置服务器响应机制 */
var server = http.createServer(function (request, response) {
  /* 解析request路径 */
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;
  console.log("Query path is" + pathWithQuery);

  /* 根据不同路径进行不同回复 */
  if (path === "/friends.js") {
    response.statusCode = 200;
    const data = fs.readFileSync("friends.json");
    const jsStr = fs.readFileSync("friends.js").toString();
    const sentStr = jsStr
      .replace("{{data}}", data)
      .replace("{{funcName}}", query.callback);
    console.log(query);
    response.setHeader("Content-Type", "text/js;charset=utf-8");
    response.write(sentStr);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`request path: ${path}, 您访问的页面不存在\n`);
    response.end();
  }
});

server.listen(port); // 开始监听指定端口
console.log(
  "Now the server is listening to port " +
    port +
    "  please open with the url: http://localhost:" +
    port
);

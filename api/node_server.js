import http from "http";

http.createServer((_, res) => {
  res.statusCode = 200;
  res.end("Hello, Node!");
}).listen(8003);

const http = require('http'); //웹서버가 되기 위해 노드js가 제공하는 기능 모듈 중에 http 모듈 사용

const hostname = '127.0.0.1'; //컴퓨터를 식별하는 식별자
const port = 3001;  //서버 컴퓨터에서 여러가지 서버들 중에 어떤 서버를 사용할것인지. 

//IP주소와 해당 포트번호를 바라보게 한다.
const server = http.createServer((req, res) => { //http객체의 createServer함수 사용
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World2');
});

server.listen(port, hostname, () => { //http객체의 listen함수 사용
    //IP주소와 해당 포트번호를 바라보게 한다.
  console.log(`Server running at http://${hostname}:${port}/`); 
});
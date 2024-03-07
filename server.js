const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  //console.log(req.url, req.method); //req is used to find the url of the site

  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello');
  });
  greet();
  greet();

//set header content type:
  res.setHeader('Content-Type', 'text/html');

//switch case for url paths:
  let path = './views/';
  switch (req.url) {
    case '/':
    path += 'index.html';
    res.statusCode = 200;
    break;
    case '/about':
    path += 'about.html';
    res.statusCode = 200;
    break;
    case '/about-me':
    res.setHeader('location', './about'); //redirect to about page.
    res.statusCode = 301;
    res.end();
    break;
    default:
    path += '404.html';
    res.statusCode = 404;
    break;
  }
//output response:
  // res.write('<head><link rel="whatever" href="#"></head>');
  // res.write('<p>hello</p>');
  // res.write('<p>helllllllllllllll</p>');
//end response:
  //res.end();

//sending a html file as a response:
  fs.readFile(path, (err, data) => {
    if(err){
      console.log(err); 
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });

 
});
//http.createServer() creates a server, using constant to save the server for future use
server.listen(3000, 'localhost', () => {
  console.log('listening for request on port 3000')
});
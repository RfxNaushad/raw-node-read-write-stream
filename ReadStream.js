const http = require('http');

const server = http.createServer((req, res)=> {
    if(req.url === '/'){
        res.write('<html><head><title>Form</title></head>');
        res.write('<body><form method="post" action="/process"><input name="message"/></form></body>'
        );
        res.end();
    }
    else if (req.url === '/process' && req.method === 'POST') {
        const body = [];
        req.on('data',(chunk)=>{
            // console.log(chunk.toString())
            body.push(chunk);
        })
        req.on('end',()=> {
            console.log('stream finished')
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
        })
        res.write('Thank you for submitting');
        res.end();
    }
    else {
        res.write('Not found');
        res.end();
    }
});

server.on('connection', ()=>{
    console.log("new connection...")
})

server.listen(3000);

console.log("listen on port 3000");





// // Read Stream And Write Stream-------
// const fs = require('fs')

// const ourReadStream = fs.createReadStream(`${__dirname}/myfile.txt`);
// const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`)

//  ourReadStream.on('data', (chunk) =>{
//      ourWriteStream.write(chunk);
//  }); 

// ourReadStream.pipe(ourWriteStream);



// read write pipe using server-------
// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res)=>{
//     const myReadStream = fs.createReadStream(`${__dirname }/myfile.txt`,'utf-8');
//     myReadStream.pipe(res);
// })
// server.listen(3000);
// console.log('Listening on port 3000')
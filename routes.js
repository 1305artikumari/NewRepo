const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Messages</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
            console.log(`chunk is ${chunk}`);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');

                return res.end();
            });
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Home</title></head>');
    res.write('<body><h4>hello world</h4></body>');
    res.write('</html>');
    res.end();

}

module.exports = {
    handler: requestHandler,
    someText: 'hello world'
};

//First way to export
// module.exports=requestHandler;

//Second way
// module.exports={
//     handler:requestHandler,
//     someText:"Some har text"
// };
//Third way
// module.exports.handler=requestHandler;
// module.exports.someText="sone hade code";
//four way
// exports.handler=server;
// exports.someText="Forth way";
// });
// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });








const http = require('http');
const fs = require('fs');
const port = 8001;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    if (req.url == "/") {
        fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
            }

            console.log('data from file' + data);

            res.write('<html>');
            res.write('<head><title>My document</title></head>');
            res.write('<body>');
            res.write('<form action="/message" method="POST">');
            res.write('<input type="text" name="message" id="message">');
            res.write('<button type="submit">send</button>');
            res.write('</form>');
            
            // Display the entered message (if available)
            if (data) {
                res.write(`<p>${data}</p>`);
            }
            
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }

    // Handle the form submission
    else if (req.url == "/message" && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsebody = Buffer.concat(body).toString();
            const message = parsebody.split("=")[1];
            
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('Inside fs.writeFile');

                // Redirect back to the root URL after writing the message
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<p>end</p>");
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
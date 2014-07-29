var http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8080;

function notFound (response) {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
}

function error(response, err) {
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(err + "\n");
    response.end();
}

function file (filename, response) {
    fs.exists(filename, function(exists) {
        if (!exists) {
            console.log(filename + " not found, returning core application...");
            filename = path.join(path.resolve(process.cwd()), "..");
        }

        // Yeah, that might work!
        if (fs.statSync(filename).isDirectory()) {
            filename = path.join(path.resolve(process.cwd()), "..", 'site') + '/index.html';
        }

        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                error(response, err);
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(path.resolve(process.cwd()), "..", "site", uri);

    console.log("Request: " + uri);

    file(filename, response);
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
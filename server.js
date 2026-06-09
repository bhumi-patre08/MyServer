// 1. Import core Node.js modules
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// 7. HTML Template Literals for Routes - Dynamic Home
const createHomeTemplate = (queryParams) => {
    const userName = queryParams.name || 'Guest';
    const theme = queryParams.theme || 'default';
    const bgColor = theme === 'dark' ? '#1a1a1a' : '#667eea';
    const textColor = theme === 'dark' ? '#fff' : '#333';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - My Server</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, ${bgColor} 0%, #764ba2 100%);
            color: ${textColor};
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 600px;
        }
        h1 { color: #667eea; margin-bottom: 20px; }
        p { font-size: 18px; color: #666; }
        .query-info {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
            color: #333;
        }
        nav {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        a {
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
        }
        a:hover { background: #764ba2; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, ${userName}!</h1>
        <p>This is the home page served with Node.js HTTP module</p>
        ${Object.keys(queryParams).length > 0 ? `
        <div class="query-info">
            <strong>Query Parameters Received:</strong><br>
            ${Object.entries(queryParams).map(([key, value]) => key + ': ' + value).join('<br>')}
        </div>
        ` : '<p style="color: #999;">Try adding query parameters: /?name=YourName&theme=dark</p>'}
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/?name=Bhumi&theme=dark">Try Query Params</a>
        </nav>
    </div>
</body>
</html>
`;
};

// 7. HTML Template Literals for Routes - Dynamic About
const createAboutTemplate = (queryParams) => {
    const userId = queryParams.id || 'N/A';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - My Server</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 600px;
        }
        h1 { color: #f5576c; margin-bottom: 20px; }
        p { font-size: 16px; color: #666; line-height: 1.6; }
        .user-id {
            background: #fff0f3;
            padding: 10px;
            border-radius: 5px;
            margin: 15px 0;
            color: #f5576c;
            font-weight: bold;
        }
        nav {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        a {
            padding: 10px 20px;
            background: #f5576c;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
        }
        a:hover { background: #f093fb; }
    </style>
</head>
<body>
    <div class="container">
        <h1>About This Server</h1>
        <p>This is a basic HTTP server built with pure Node.js core modules. It demonstrates fundamental concepts like routing, status codes, headers, and HTML template literals.</p>
        <p><strong>Tech Stack:</strong> Node.js (http module)</p>
        <p><strong>Features:</strong> Routing, Static File Serving, Dynamic HTML, Query Parameter Handling, Content-Type Headers</p>
        ${userId !== 'N/A' ? `<div class="user-id">User ID from Query: ${userId}</div>` : '<p style="color: #999;">Try adding: /about?id=12345</p>'}
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/about?id=12345">Try Query Params</a>
        </nav>
    </div>
</body>
</html>
`;
};

// 7. HTML Template Literals for Routes - 404 Not Found
const notFoundTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Not Found</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 600px;
        }
        h1 { color: #eb3349; font-size: 48px; margin-bottom: 20px; }
        p { font-size: 18px; color: #666; }
        nav {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        a {
            padding: 10px 20px;
            background: #eb3349;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
        }
        a:hover { background: #f45c43; }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>File or Page Not Found</p>
        <p>Please check your URL and try again.</p>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </div>
</body>
</html>
`;

// 2. Create the server
const server = http.createServer((req, res) => {
    // ENHANCED LOGGING: Log all requests with timestamp
    const timestamp = new Date().toLocaleString();
    console.log(`\n[${timestamp}] [${req.method}] ${req.url}`);

    // QUERY PARAMETER HANDLING: Parse URL using WHATWG URL API
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const queryParams = Object.fromEntries(parsedUrl.searchParams);

    // Log pathname details
    console.log(`  └─ Pathname: ${pathname}`);
    if (Object.keys(queryParams).length > 0) {
        console.log(`  └─ Query Params:`, queryParams);
    }
    
    // Track original res.end to log response status
    const originalEnd = res.end;
    res.end = function(...args) {
        const statusCode = res.statusCode;
        const statusMsg = statusCode === 200 ? '✓' : '✗';
        console.log(`  └─ Response: ${statusCode} ${statusMsg}`);
        return originalEnd.apply(res, args);
    };

    // 7. ROUTING: Handle / (home) and /about paths
    if (pathname === '/') {
        // 4. res.writeHead() with status code and Content-Type header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // 6. Return formatted HTML string using template literal with query params
        res.end(createHomeTemplate(queryParams));
    } 
    else if (pathname === '/about') {
        // 4. res.writeHead() with status code and Content-Type header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // 6. Return formatted HTML string using template literal with query params
        res.end(createAboutTemplate(queryParams));
    }
    else {
        // STATIC FILE SERVING: 3. Determine the file path for static assets
        let filePath = path.join(__dirname, pathname);

        // 5. Safely extract and normalize the file extension
        const extname = String(path.extname(filePath)).toLowerCase();
        
        // Complete dictionary of MIME types (Content-Type headers)
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.ico': 'image/x-icon'
        };

        // Fallback to binary stream if format isn't mapped
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        // BASIC CACHING HEADERS: Set cache strategy based on file type
        let cacheControl = 'no-cache'; // Default: no caching
        
        if (['.js', '.css', '.woff', '.woff2', '.ttf'].includes(extname)) {
            // Static assets - cache for 1 year
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'].includes(extname)) {
            // Images - cache for 30 days
            cacheControl = 'public, max-age=2592000';
        } else if (['.html', '.json'].includes(extname)) {
            // Dynamic content - cache for 5 minutes
            cacheControl = 'public, max-age=300, must-revalidate';
        }

        // Read the file from disk
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    // 8. 404 for undefined routes
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(notFoundTemplate);
                } else {
                    // Internal Server Error
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500: Internal Server Error</h1>');
                }
            } else {
                // 4. Success with status code and Content-Type header
                res.writeHead(200, { 
                    'Content-Type': contentType,
                    'Cache-Control': cacheControl
                });
                
                // 10. End response with content
                res.end(content);
            }
        });
    }
});

// 11. Start listening on localhost:3000
server.listen(PORT, () => {
    console.log('========================================');
    console.log('Server is running now ✓');
    console.log('========================================');
    console.log(`Your backend server is active at http://localhost:${PORT}/`);
    console.log('Routes available:');
    console.log(`  • http://localhost:${PORT}/ (Home)`);
    console.log(`  • http://localhost:${PORT}/about (About)`);
    console.log('Press Ctrl + C to stop the process anytime.');
    console.log('========================================');
});

const http = require('http');
const app = require('./app'); // Import the Express app
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});
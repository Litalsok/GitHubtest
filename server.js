const express = require('express');
const app = express();
const port = 3000; // or any desired port

// Serve static files from the 'public' directory (or wherever your Three.js files are)
app.use(express.static('src')); // main.js folder for Three.js files
app.use(express.static('models')); // models directory for 3D models

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
});
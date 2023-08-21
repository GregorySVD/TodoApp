import express = require("express");

const app = express();

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});

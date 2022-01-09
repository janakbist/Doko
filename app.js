const express = require('express');
const path = require('path');

const app = express();
// serving static file
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, function (err, done) {
    if (err) {
        console.log('error listening at port ', 8080)
    } else {
        console.log('server listening at port ' + PORT)
        console.log('Press CTRL +C to exit')
    }
})
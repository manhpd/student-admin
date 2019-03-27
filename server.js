const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
var port = process.env.por || 3000;
 
// default route
// app.get('/', function (req, res) {
//     return res.send({ error: true, message: 'hello' })
// });


var apiRouter = require('./routes/routes')(express);

app.use('/api', apiRouter);
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(port, function () {
    console.log("Express server running on port %d", port);
});

module.exports = app;
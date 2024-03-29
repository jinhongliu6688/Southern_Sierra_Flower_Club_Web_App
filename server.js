// const functions = require('firebase-functions');

const http = require('http'),
  url = require('url'),
  port = 8083;


const express = require('express');
const app = express();

const controller = require('./controller.js');

app.use(express.static('client'));
// app.use(`/.netlify/functions/api`, router);

/*

//get static indexhtml
app.get('/', controller.serveHTML);

//get static js
app.get('/script', controller.serveJS);

//get static css
app.get('/style', controller.serveCSS);
*/

//lookup flower
//pathparam flower common name
//access by req.params.comname
app.get('/flower/:comname', controller.getFlowerDetails);

app.get('/flower/search/:keyword', controller.searchFlower)

//return all flowers
app.get('/flower', controller.listFlowers);

//PUT
// sample: localhost:8083/flower/Douglas dustymaiden?genus=douglas is gay lmao&species=gagagag
app.put('/flower/:comname', controller.updateFlower);

//POST
app.post('/flower', controller.createFlower);

//DELETe
app.delete('/flower/:comname', controller.deleteFlower);

//app.post('/user/:username', controller.registerUser)

//add sighting
//query params
//sample: http://localhost:8083/sighting/?name=someflowernamefff&person=me&location=up ur butt around the corner&sighted=2018-09-20
app.post('/sighting', controller.addSighting);
app.get('/sighting/:comname', controller.getSightings);

app.post('/user', controller.registerUser);
app.get('/user', controller.authenticateUser);

app.all('/*', (req, res) => {
    // console.log("Failed to route " + req.pathname);
    console.log("Failed to route " + req.url);
    res.status(404).send("bish nothing here");
});
//starting the server
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT || port}!`))

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: '+add);
});

// exports.app = functions.https.onRequest(app);
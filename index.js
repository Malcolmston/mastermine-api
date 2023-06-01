
var express = require("express");
const { takeGuess, newGame } = require("./game_server/express.js");

const port = 3001


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/guess/:name/:guess", takeGuess)

app.post("/newgame", newGame)



app.listen(port, function() {
	console.log(`Listening on port ${port}`);
});




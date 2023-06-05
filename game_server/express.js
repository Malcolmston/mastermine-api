const {generate_secret, hint} = require("../game_helper/code.js");
const {Game_create, Game_addMove} = require("../game_server/seqilize.js")

var secret;

/**
 * the take quess function is used to get the users guess. 
 * @param {IncomingHttpHeaders} req the request
 * @param {OutgoingHttpHeader} res the reponse
 * @event if the user sends a valid req then status 200 is fired, otherwise a 412 status is called
 * GET
 */
async function takeGuess (req, res) {
    let {guess, name} = req.params
    guess =  guess.split(",")

	console.log(guess, name, secret)
    let hintVar;
    try {
        hintVar = hint(guess,secret )  
        
        

        res.status(200).json({
            guess: guess,
            hint: hintVar
        })

        return  await Game_addMove(name, guess)

    } catch( error ){
       // console.error( error )
        res.status(412).json({
            guess: guess,
            message: error.message,
            next: `the formatting must be /guess/1,1,1,1 not /guess/${guess}`
        })
    }
    
    
    
}

/**
 * the take quess function is used to get set the game name. 
 * @param {IncomingHttpHeaders} req the request
 * @param {OutgoingHttpHeader} res the reponse
 * @event if the user sends a valid req then status 200 is fired, otherwise a 406 status is called. a 507 method is called if the databace alredy has a game named that matches yours.
 * POST
 */
async function newGame (req, res) {
    let { name} = req.body

	console.log( name )
    try {
        let p =  await Game_create(name)

        secret = generate_secret(4)
        if( p == undefined ){
            res.status(507).json({
                next: `there is alredy a game with that same name`
            })
        }else {
        res.status(200).json({
            name: name,
            p
        })
    }

    } catch( error ){
        res.status(406).json({
            message: error.message,
            next: `something went worng`
        })
    }
}





module.exports = {takeGuess, newGame}
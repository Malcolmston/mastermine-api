/**
 * this function creates an array with any amount of numbers between 1 & 6
 * @param {Number} length is the length of the items that are guesed 
 * @returns {Array<Number>} returns an array of numbers between 1 & 6
 */
function generate_secret(length) {
    let arr = []

    for(let i = 0; i < length; i++){
        let red = Math.floor(Math.random() * 6) + 1
        arr.push( red )
    }

    return arr
}

/**
 * 
 * @param {Array<Number>} anser your guess 
 * @param {Array<Number>} password the commputers guess
 * @returns {JSON} returns a json with numbers corosponding to the anser. 0 is correct, 1 is that the guess is in the wronge place, and 2 is that the guess is incorect.
 */
function hint(anser, password){
    let obj = {}

   anser.forEach( (item, index) => { 
    obj[index] = (item == password[index]) ? 0 : ( password.includes( item ) ? 1 : 2 )
})

console.log( anser )


return obj
    //return anser.join() == password.join()
}


module.exports = {generate_secret, hint}
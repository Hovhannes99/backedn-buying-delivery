const numberGenerator = require("number-generator")

const  generateRandomNumbers = ()=> {
    const randNumber = Math.ceil(Math.random()*12) + 1;
    return numberGenerator.aleaRNGFactory(randNumber).uInt32()
}


module.exports = generateRandomNumbers



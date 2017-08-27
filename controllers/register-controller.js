// var connection = require("./../config");
var bcrypt = require("bcrypt-nodejs");

var hash = bcrypt.hashSync("bacon");
 console.log(hash);
console.log(bcrypt.compareSync("bacon", hash)); // true

console.log(bcrypt.compareSync("veggies", hash)); // false
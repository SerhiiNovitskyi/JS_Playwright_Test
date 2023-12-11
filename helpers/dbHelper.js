// import mysql from 'mysql2'
const mysql = require('mysql2')

//to run need to enter into console - node helpers/dbhelper.js

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "5863172392",
    database: "course_aqa_hillel"
})

connection.connect(function(err){
    if(err) {
        console.error('error during connection to DB' + err)
    } else {
        console.log('successfully connection to DB')
    }
})

// //create DataBase
// connection.query(`CREATE DATABASE course_aqa_hillel`,
// function(err) {
//     if(err) console.error(err.message)
//     else console.log('DB created')
// }) 


// //create DB
// connection.query(`CREATE TABLE \`group\` (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     age INT(5) NOT NULL
//     )`, function(err) {
//         if(err) console.error(err.message)
//         else console.log('Table created')
//     }) 

// // create Persons
// connection.query(`CREATE TABLE \`Persons\` (
//     PersonID INT PRIMARY KEY AUTO_INCREMENT,
//     LastName VARCHAR(255),
//     FirstName VARCHAR(255),
//     Address VARCHAR(255),
//     City VARCHAR(255)
// )`, function(err) {
//     if(err) console.error(err.message)
//     else console.log('Table Persons created')
// }) 

// create Person
connection.query(`INSERT INTO Persons(LastName, FirstName, Address, City) VALUES('22232422', 'FFFF34FFF', 'Shevche3nko','CHerKaSy')`, 
    function(err) {
    if(err) console.error(err.message)
    else console.log('Person Data Added')
})

connection.query(`SELECT * FROM Persons`,
    function(err, results) {
    if(err) console.error(err.message)
    else console.log(results)
})

// in the end need to close connection
    connection.end()
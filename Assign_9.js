const express = require('express');

const app = express();

app.use('/add-product',(req, res , next) =>{
    
    console.log('In the middleware!')
    // res.send('<h1>The "Add Product" Page</h1>');
    next(); //Allows the request to continue to the next middleware in line
    
});

console.log(routes.someText);
app.use('/',(req, res , next) =>{
    // console.log('In another middleware!');
    console.log('In another middleware!')
    res.send('<h1>Hello from Express!</h1>');
});
app.listen(4002);
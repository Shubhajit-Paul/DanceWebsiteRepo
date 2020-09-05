const express = require("express");
const path = require("path");
const app = express();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String
});
const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });

    // res.status(200).render('contact.pug');
})






// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
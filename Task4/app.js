const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/registrationDB', { useNewUrlParser: true });
let db = mongoose.connection;

//check DB connection
db.once('open', ()=> console.log('connected to MongoDB'));

//check for DB errors
db.on('error', (err)=>console.log(err));

//Init app
const app = express();

//Bring in models
let Student = require('./models/student');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
//Parse application/json
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Home Route
app.get('/', (req, res) =>{
    Student.find({}, (err, students) => {
        if (err)
            console.log(err);
        else{
            res.render('index', {
                title: 'Prospective Student\'s Info',
                students: students
            });
        }
    });
});

//Get Single Student
app.get('/student/:id', (req, res) =>{
    Student.findById(req.params.id, (err, student) => {
        res.render('student', {
            student:student
        });
    });
});

//Add Route
app.get('/students/add', (req, res) =>{
    res.render('add_students', {
        title: 'Add Student'
    });
});

//Add Submit POST Route
app.post('/students/add', (req, res) =>{
    let student = new Student();
    student.name = req.body.name;
    student.surname = req.body.surname;
    student.age = req.body.age;
    student.subject = req.body.subject;
    student.staff = req.body.staff;

    student.save( (err)=> {
       if (err) {
           console.log(err);
           return;
       }
       else
           res.redirect('/');
    });
});

//Load Edit Form
app.get('/student/edit/:id', (req, res) =>{
    Student.findById(req.params.id, (err, student) => {
        res.render('edit_student', {
            title:'Edit Student',
            student:student
        });
    });
});

//Update Submit POST Route
app.post('/students/edit/:id', (req, res) =>{
    let student = {};
    student.name = req.body.name;
    student.surname = req.body.surname;
    student.age = req.body.age;
    student.subject = req.body.subject;
    student.staff = req.body.staff;

    let query = {_id:req.params.id};

    Student.update(query, student, (err)=> {
        if (err) {
            console.log(err);
            return;
        }
        else
            res.redirect('/');
    });
});

app.delete('/student/:id', (req, res) =>{
    let query = {_id:req.params.id};

    Student.remove(query, (err) =>{
        if (err)
            console.log(err);
        res.send('Success');
    });
});

//Start Server
app.listen(3000, ()=>{
    console.log('Server started on port:3000');
});
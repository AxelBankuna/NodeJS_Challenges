const mongoose = require('mongoose');

//Student Schema
let studentSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name field is required']
    },
    surname:{
        type: String,
        required: [true, 'Surname field is required']
    },
    age:{
        type: Number,
        required: [true, 'Age field is required']
    },
    created_at: {type: Date,
        default: Date.now
    },
    subject:{
        type: String,
        required: [true, 'Subject of inquiry field is required']
    },
    staff:{
        type: String,
        required: [true, 'Staff who assisted field is required']
    }
});

let Student = module.exports = mongoose.model('Student', studentSchema);
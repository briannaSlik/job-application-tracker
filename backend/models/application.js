const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    company: { 
        type: String, 
        required: true
    },
    salary: { 
        type: String, 
        required: true
    },
    location: { 
        type: String, 
        required: true
    },
    hours: { 
        type: String, 
        required: true
    },
    link: { 
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Application', applicationSchema);
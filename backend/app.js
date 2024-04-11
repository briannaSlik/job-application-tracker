const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

const Application = require('./models/application')

const app = express();

mongoose.connect("mongodb+srv://daffadelicious:QlOExYDWxZ1iVzeP@cluster0.nstkmnz.mongodb.net/job_application_tracker?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log('DB Error')
        console.log(err.message)
    })

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, DELETE, OPTIONS')
    next();
});


// POST requests
app.post("/api/applications", (req, res, next) => {
    const application = new Application({
        title: req.body.title,
        company: req.body.company,
        salary: req.body.salary,
        location: req.body.location, 
        hours: req.body.hours, 
        link: req.body.link
    });

    application.save().then(result => {
        res.status(201).json({
            message: 'application added successfully',
            id: result._id
        });
    });
})

// GET requests
app.get('/api/applications', (req, res, next) => {
    Application.find()
        .then(applications => 
            res.status(200).json({
                message: 'Applications were fetched',
                applications: applications
            })
        );
});

app.get('/api/applications/:id', (req, res, next) => {
    Application.findById(req.params.id).then(application => {
        if (application){
            res.status(200).json(application);
        } else {
            res.status(404).json({ message: 'An application with that id could not be found'})
        }
    })
})

// PUT requests
app.put("/api/applications/:id", (req, res, next) => {
    const application = {
        title: req.body.title,
        company: req.body.company,
        salary: req.body.company,
        location: req.body.location, 
        hours: req.body.hours, 
        link: req.body.link
    }
    Application.findByIdAndUpdate(req.params.id, application, { new: true}).then(result => {
        console.log(result)
        res.status(200).json({ message: "Update successful"})
    }).catch((err) => {
        res.status(500).json({ error: err.message})
    })
})

// DELETE requests
app.delete("/api/applications/:id", (req, res, next) => {
    Application.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result)
        res.status(200).json({ message: "Application deleted!"})
    })
})

module.exports = app;
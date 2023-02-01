import Desk from "./.models/desk"
// const Desk = require('../models/desk')

const desk_index = (req, res) => {
  Desk.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { desks: result, title: 'All desks' });
    })
    .catch(err => {
      console.log(err);
    });
}

const desk_details = (req, res) => {
    const id = req.params.id
    Desk.findById(id)
      .then(result => {
        res.render('details', { desk: result, title: 'Desk Details' })
    })
      .catch(err => {
        console.log(err);
        res.render('404', { title: 'Desk not found' })
    })
}

const desk_create_get = (req, res) => {
    res.render('create', { title: 'Create a new desk' })
  }
  
const desk_create_post = (req, res) => {
  const desk = new Desk(req.body)
  desk.save()
    .then(result => {
      res.redirect('/desks');
  })
    .catch(err => {
      console.log(err);
  })
}

const desk_delete = (req, res) => {
    const id = req.params.id;
    Desk.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/desks' });
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  module.exports = {
    desk_create_get,
    desk_create_post,
    desk_delete,
    desk_details
  }
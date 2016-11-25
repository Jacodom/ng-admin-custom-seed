var express = require('express');
var router = express.Router();

var persons = [
  {
    id: 1,
    name: "Pepe",
    edad: 23
  },
  {
    id: 2,
    name: "Juan",
    edad: 25
  },
  {
    id: 3,
    name: "José",
    edad: 28
  }
];

/* GET all */
/* This is the endpoint that ng-admin uses for listViews() - when things need to be listed */
router.get('/base', function(req, res, next) {
  res.json(persons);
});

/* GET by id*/
/* This is the endpoint that ng-admin uses for showViews() - when a single thing needs to be show for edition */
router.get('/base/:id', function(req, res, next) {
  // parse to number format to compare with the existing id of the required person
  var req_id = parseInt(req.params.id);
  persons.forEach(function(person, i){
    if(person.id === req_id){
      res.status(200).json(person);
    }
  });
});

/* POST */
/* This is the endpoint that ng-admin uses for creationViews() - when a single thing is created */
router.post('/base', function(req, res, next){
  if(req.body){
    var newPerson = req.body;
    var lastid = persons[persons.length-1].id;
    newPerson.id = lastid + 1;
    persons.push(newPerson);
    res.status(200).json(newPerson);
  }
});

/* PUT */
/* This is the endpoint that ng-admin uses for editViews() - when a single thing is edited */
router.put('/base/:id', function(req, res, next){
  // parse to number format to compare with the existing id of the required person
  var req_id = parseInt(req.params.id);
  persons.forEach(function(person, i){
    if(person.id === req_id){
      // Go trought all the properties of the object and changes it with the new values
      Object.keys(person).forEach(function(key, i){
        person[key] = req.body[key];
      });
      res.status(200).json(person);
    }
  });
});

/* DELETE */
/* This is the endpoint that ng-admin uses for delete entities - when a single thing is removed */
router.delete('/base/:id', function(req, res, next){
  // parse to number format to compare with the existing id of the required person
  var req_id = parseInt(req.params.id);
  persons.forEach(function(person, i){
    if(person.id === req_id){
      // Finds the person index in the persons and removes it
      var found = persons.indexOf(person);
      if(found !== -1){
        persons.splice(found, 1);
      }
      res.status(200).json(person);
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/base', function(req, res, next) {
  var array = [
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
  res.json(array);
});

module.exports = router;

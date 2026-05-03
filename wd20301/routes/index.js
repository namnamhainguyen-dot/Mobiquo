var express = require('express');
var router = express.Router();

/* GET home page. */
// http://localhost:3000/
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Yen' });
  let data = [
    { name: 'Sun', age: 25 },
    { name: 'John', age: 30 },
    { name: 'Alice', age: 28 }
  ];
  res.json({ data });
});

//localhost:3000/abc => a+b
router.get("/abc/:a/:b", function(req, res, next) {
  //req: params, query, body, headers, cookies
  // let a = 5;
  // let b = 10;
  let {a, b} = req.params; // req.params.a, req.params.b
  res.json({ sum: Number(a) + Number(b) }); //15
});

// localhost:3000/sum?a=5&b=10 => a+b
router.get("/sum", function(req, res, next) {
  let {a, b} = req.query; // req.query.a, req.query.b
  res.json({ sum: Number(a) + Number(b) }); //15
}); 

// localhost:3000/dientich => body
router.get("/dientich", function(req, res, next) {
  let {a, b} = req.body; // req.body.chieudai, req.body.chieurong
  res.json({ dientich: Number(a) * Number(b) }); //15
});


module.exports = router;

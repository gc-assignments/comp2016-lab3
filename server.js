var connect = require('connect');
var url     = require('url');
var app     = connect();

function output(method, x, y) {
  var signs = {
    add: ' + ',
    subtract: ' - ',
    multiply: ' * ',
    divide: ' / '
  };
  var result = 'missing or invalid query strings';
  x = parseFloat(x);
  y = parseFloat(y);
  if (signs[method] && !isNaN(x) && !isNaN(y)) {
    var expression = x + signs[method] + y;
    result = expression + ' = ' + eval(expression);
  }
  return result;
}

app.use('/lab3', function(req, res) {
  var query = url.parse(req.url, true).query;
  res.end(output(query.method, query.x, query.y));
});

app.listen(3000);

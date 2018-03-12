const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost:3000');
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.locals.projects = [{id: 1, name: "sad"}];

app.get('/api/v1/projects', (request, response) => {
  const { projects } = app.locals;
  response.status(200).json(projects);
});


app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost:3000');
});
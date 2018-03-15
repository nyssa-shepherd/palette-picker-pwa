const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// app.locals.projects = [
//   {id: 1, projectName: 'Nyssa\'s Hot Shit Project'},
//   {id: 2, projectName: 'Nyssa\'s Bad Ass Project'}
// ];
app.locals.palettes = [
  {
    id: 1, 
    paletteName: 'Bitchin blue',
    color0: '#ab39cd',
    color1: '#32dea4',
    color2: '#983c23',
    color3: '#edb9c1',
    color4: '#023cc2'
  },
  {
    id: 2, 
    paletteName: 'Gnarley Green',
    color0: '#aae40d',
    color1: '#07d98d',
    color2: '#45de03',
    color3: '#63790c',
    color4: '#3a7e4d'
  }
]

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects', (request, response) => {
  const id = 1;
  const project = request.body;
  app.locals.projects.push({ id, project });
  response.status(201).json({ id, project });
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const { palettes } = app.locals;
  response.status(200).json(palettes);
});

app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost:3000');
});
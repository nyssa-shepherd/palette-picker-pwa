exports.seed = function(knex, Promise) {
  return knex('palettes').del() 
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Nyssa\'s Project'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { 
              name: 'Bitchin Blue',
              color0: '#3b73f2',
              color1: '#08bbf3',
              color2: '#4112e1',
              color3: '#287b95',
              color4: '#0a174c',
              projects_id: project[0]},
            { 
              name: 'Gnarley Green',
              color0: '#154622',
              color1: '#07d98d',
              color2: '#45de03',
              color3: '#63790c',
              color4: '#3a7e4d',
              projects_id: project[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

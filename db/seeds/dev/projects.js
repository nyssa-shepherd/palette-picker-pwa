exports.seed = function(knex, Promise) {
  return knex('palettes').del() 
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Nyssa\'s Project'
        }, 'id')
        .then(paper => {
          return knex('palettes').insert([
            { 
              name: 'Bitchin Blue',
              color0: '#82bc49',
              color1: '#22bb8d',
              color2: '#aba002',
              color3: '#a030e0',
              color4: '#cd6ba3',
              projects_id: paper[0] },
            { 
              name: 'Gnarley Green',
              color0: '#32b04b',
              color1: '#22b223',
              color2: '#ababad',
              color3: '#a022bd',
              color4: '#bada55',
              projects_id: paper[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

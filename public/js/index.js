let hexArr = [];
const projectArr = [];
const projObj = {
  name: ''
}

const fetchProjects = async() => {
  const response = await fetch('/api/v1/projects');
  const projects = await response.json();
  projects.forEach(project => {
    projectArr.push(project);
    fetchPalettes(project)
  });
}

const fetchPalettes = async(project) => {
  console.log(project)
  const response = await fetch(`/api/v1/projects/${project.id}/palettes`);
  const palettes = await response.json();
  await renderProject(palettes, project);
}

const renderProject = (palettes, project) => {
  $('.projects').prepend(`<h3 class='proj-name'>${project.name}</h3>`);
  $('select').append(`<option>${project.name}</option>`);

  palettes.forEach(palette => {
    $('.palette').append(`
      <h4>${palette.name}</h4>
      <div class='saved-colors'>
        <div class='small-box' style='background-color: ${palette.color0}'></div>
        <div class='small-box' style='background-color: ${palette.color1}'></div>
        <div class='small-box' style='background-color: ${palette.color2}'></div>
        <div class='small-box' style='background-color: ${palette.color3}'></div>
        <div class='small-box' style='background-color: ${palette.color4}'></div>
        <div class='trash-img'><div/>
      </div>
    `)
  });  
}

const submitProject = async(e) => {
  e.preventDefault();
  const post = await fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ name: $('#project-input').val()}), 
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
  await post.json();
  await fetchProjects();
  $('#project-input').val(''); 
}

const savePalette = async(e) => {
  e.preventDefault();
  const name = $('#pal-name-input').val();
  let projMatch = projectArr.find( project => {
    return project.name ===  $('select').val()? project : null;
  }); 

  let color0 = hexArr[0]
  let color1 = hexArr[1]
  let color2 = hexArr[2]
  let color3 = hexArr[3]
  let color4 = hexArr[4]
  let projects_id = projMatch.id
  let palette = { name, color0, color1, color2, color3, color4, projects_id }
  postPalette(projMatch, palette)
}

const postPalette = async(projMatch, palette) => {
  const post = await fetch(`/api/v1/projects/${projMatch.id}/palettes`, {
  method: 'POST',
  body: JSON.stringify(palette), 
  headers: new Headers({ 'Content-Type': 'application/json' })
})
console.log(post)
const postProject = await post.json();

$('#pal-name-input').val('');
}

const callHex = () => {
  hexArr = [];
  genRandomHex();
}

const genRandomHex = () => {
  let hex = "#";
  const possible = "ABCDEF0123456789";

  for (var i = 0; i < 6; i++) {
    hex += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return randomHexHelper(hex);
}

const randomHexHelper = hex => {
  hexArr.push(hex);
  hexArr.length < 6 ? genRandomHex() : setColors();
}

const setColors = () => {
  $('.color0').text(hexArr[0]);
  $('.color1').text(hexArr[1]);
  $('.color2').text(hexArr[2]);
  $('.color3').text(hexArr[3]);
  $('.color4').text(hexArr[4]);

  $('.box0').css('background-color', hexArr[0]);
  $('.box1').css('background-color', hexArr[1]);
  $('.box2').css('background-color', hexArr[2]);
  $('.box3').css('background-color', hexArr[3]);
  $('.box4').css('background-color', hexArr[4]);
}

$(document).ready(() => {
  fetchProjects();
  genRandomHex();
});
$('.save-pal-btn').on('click', savePalette);
$('.save-project-button').on('click', submitProject);
$('.gen-button').on('click', callHex);





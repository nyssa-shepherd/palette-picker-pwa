let hexArr = [];
const projectArr = [];
const projObj = {
  name: '',
  palName: [],
  colors: []
}

const fetchProjects = async() => {
  const response = await fetch('/api/v1/projects');
  const projects = await response.json();
  projects.forEach(project => fetchPalettes(project));
}

const submitProject = e => {
  e.preventDefault();
  let input = $('#project-input').val();
  projObj.name = input;

  projectArr.push(projObj);
  $('#project-input').val(''); 
  renderProject();
}

const renderProject = (palettes, project) => {
  $('.projects').prepend(`<h3 class='proj-name'>${project.name}</h3>`);
  $('select').append(`<option>${project.name}</option>`);

  palettes.forEach(palette => {
    $('.palette').append(`
      <h4>${palette.paletteName}</h4>
      <div class='saved-colors'>
        <div class='small-box' style='background-color: ${palette.color0}'></div>
        <div class='small-box' style='background-color: ${palette.color1}'></div>
        <div class='small-box' style='background-color: ${palette.color2}'></div>
        <div class='small-box' style='background-color: ${palette.color3}'></div>
        <div class='small-box' style='background-color: ${palette.color4}'></div>
        <div class='trash-img'><div/>
      </div>
    `)
 
    // $('.0').css('background-color', palette.color0);
    // $('.1').css('background-color', palette.color1);
    // $('.2').css('background-color', palette.color2);
    // $('.3').css('background-color', palette.color3);
    // $('.4').css('background-color', palette.color4);
  });
  
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

const fetchPalettes = async(project) => {
  console.log(project)
  const response = await fetch(`/api/v1/palettes/${project.id}`);
  const palettes = await response.json();
  await renderProject(palettes, project);
}

const savePalette = (e) => {
  e.preventDefault();
  const palObj = {
    projName: $('select').val(),
    palName: $('#pal-name-input').val(),
    colors: hexArr
  }

  let match = projectArr.find(proj => proj.name === palObj.projName ? proj : null);
  match.palName.push(palObj.palName);
  match.colors = palObj.colors;
  console.log(projectArr);
  $('#pal-name-input').val('');
}

$(document).ready(() => {
  fetchProjects();
  genRandomHex();
});
$('.save-pal-btn').on('click', savePalette);
$('.save-project-button').on('click', submitProject);
$('.gen-button').on('click', callHex);





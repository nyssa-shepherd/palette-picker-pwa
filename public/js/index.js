let hexArr = [];
const projectArr = [];
const projObj = {
  name: '',
  palName: [],
  colors: []
}

const submitProject = e => {
  e.preventDefault();
  let input = $('#project-input').val();
  projObj.name = input;

  projectArr.push(projObj);
  $('#project-input').val(''); 
  renderProject(input);
}

const renderProject = (input) => {
  $('.projects').prepend(`<h3 class='proj-name'>${input}</h3>`);
  $('select').prepend(`<option>${input}</option>`);
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
  $('.box0').text(hexArr[0]).css('background-color', hexArr[0]);
  $('.box1').text(hexArr[1]).css('background-color', hexArr[1]);
  $('.box2').text(hexArr[2]).css('background-color', hexArr[2]);
  $('.box3').text(hexArr[3]).css('background-color', hexArr[3]);
  $('.box4').text(hexArr[4]).css('background-color', hexArr[4]);
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

$(document).ready(genRandomHex);
$('.save-pal-btn').on('click', savePalette);
$('.save-project-button').on('click', submitProject);
$('.gen-button').on('click', callHex);





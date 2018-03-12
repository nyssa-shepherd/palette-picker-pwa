const projectArr = [];
let hexArr = [];

const submitProject = (e) => {
  e.preventDefault();
  const input = $('#project-input').val()
  projectArr.push(input);
}

const genRandomHex = () => {
  let hex = "#";
  const possible = "ABCDEF0123456789";

  for (var i = 0; i < 6; i++) {
    hex += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  console.log(hexArr)
  return randomHexHelper(hex);
}

const randomHexHelper = hex => {
  hexArr.push(hex);
  hexArr.length < 6 ? genRandomHex() : setColors();
}

const setColors = () => {
  $('.box0').text(hexArr[0]);
  $('.box1').text(hexArr[1]);
  $('.box2').text(hexArr[2]);
  $('.box3').text(hexArr[3]);
  $('.box4').text(hexArr[4]);
  hexArr = [];
}

$('.save-project-button').on('click', submitProject);
$('.gen-button').on('click', genRandomHex);




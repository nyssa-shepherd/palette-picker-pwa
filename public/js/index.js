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

  for (var i = 0; i < 6; i++)
   hex += possible.charAt(Math.floor(Math.random() * possible.length));
  console.log(hexArr);
   return makeHexArr(hex);
}

const makeHexArr = hex => {
  hexArr.push(hex);
  hexArr.length < 6 ? genRandomHex() : hexArr = [];
}

$('.save-project-button').on('click', submitProject);
$('.gen-button').on('click', genRandomHex);




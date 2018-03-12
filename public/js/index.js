const projectArr = [];

const submitProject = (e) => {
  e.preventDefault();
  const input = $('#project-input').val()
  projectArr.push(input);
}

$('.save-project-button').on('click', submitProject);

const makeid = () => {
  var text = "#";
  var possible = "ABCDEF0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());



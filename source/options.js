var urltypes = document.getElementsByName('urltype');
var urls = document.getElementById('urls');

document.getElementById('savebtn').onclick = saveOption;
document.getElementById('clearbtn').onclick = clearOption;

restoreOption();

function restoreOption() {
  switch (localStorage['urltype']) {
    case 'exclude':
      urltypes[0].checked = true;
      break;
    case 'include':
      urltypes[1].checked = true;
      break;
    default:
      urltypes[0].checked = true;
      break;
  }
  if (localStorage['urls']) {
    urls.value = localStorage['urls'];
  }
}

function saveOption() {
  if (urltypes[0].checked) {
    localStorage['urltype'] = urltypes[0].value;
  } else {
    localStorage['urltype'] = urltypes[1].value;
  }

  localStorage['urls'] = urls.value;
}

function clearOption() {
  delete localStorage['urls'];
  delete localStorage['urltype'];
}
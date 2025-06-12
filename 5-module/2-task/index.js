function toggleText() {
  let textId = document.querySelector('#text');
  let btn = document.querySelector('.toggle-text-button');

  btn.addEventListener('click', () => {
    if (textId.hidden) {
      textId.hidden = false;
    } else {
      textId.hidden = true;
    }
  });
}

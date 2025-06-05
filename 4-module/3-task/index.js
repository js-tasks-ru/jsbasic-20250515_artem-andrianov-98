function highlight(table) {
  const trArr = table.querySelectorAll('tbody tr');

  for (const trEl of trArr) {
    const tdArr = trEl.querySelectorAll('td');
    let gender; 
    let age;

    for (const tdEl of tdArr) {
      const text = tdEl.textContent;

      if (text === 'm' || text === 'f') {
        gender = text;
      }
      else if (Number.isInteger(Number(text))) {
        age = Number(text);
      }
    }

    if (gender === 'm') {trEl.classList.add('male');}
    else if (gender === 'f') {trEl.classList.add('female');}

    if (age < 18) {trEl.style.textDecoration = 'line-through';}

    const status = trEl.querySelector('td[data-available]');
    if (status) {
      trEl.classList.add(status.dataset.available === 'true' ? 'available' : 'unavailable');
    } else {
      trEl.hidden = true;
    }
  }
}


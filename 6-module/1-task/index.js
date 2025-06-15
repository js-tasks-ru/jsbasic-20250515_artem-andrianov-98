/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.renderHeader();
    this.renderBody(rows);
  }

  renderHeader() {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];

    for (let text of headers) {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    this.elem.appendChild(thead);
  }

  renderBody(rows) {
    const tbody = document.createElement('tbody');

    for (let row of rows) {
      const tr = document.createElement('tr');

      for (let key of ['name', 'age', 'salary', 'city']) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }

      const td = document.createElement('td');
      const button = document.createElement('button');
      button.textContent = 'X';

      button.addEventListener('click', () => {
        tr.remove();
      });

      td.appendChild(button);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    this.elem.appendChild(tbody);
  }
}

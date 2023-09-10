// index.js

questions.forEach((question) => {

  const html = `
  <tr>
    <td > 
      <div class="question-title" onclick="toggleDescription(${question.id})"> ${question.title } </div>
      <div class="question-description-${question.id}"> ${ question.description} </div>
    </td>
    <td> ${ question.categories }</td>
    <td> ${ question.complexity }</td>
    <td> 
      <button onclick={handleEdit()}>Edit</button>
      <button onclick={handleDelete}>Delete</button>
    </td>
  </tr>
  `;

  document.querySelector('.questions-table').innerHTML += html;
})

const handleEdit = () => {
  console.log('Edit')
};
const handleDelete = null;
const handleAdd = null;

const toggleDescription = (id) => {
  const elem = document.querySelector(`.question-description-${id}`);
  elem.style.display = (
    elem.style.display == '' ? 'block' : ''
  )
}

function openDialog() {
  const dialog = document.getElementById("myDialog");
  dialog.showModal(); 
}

function closeDialog() {
  const dialog = document.getElementById("myDialog");
  dialog.close();
}

console.log(questions)
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
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </td>
  </tr>
  `;

  document.querySelector('.questions-table').innerHTML += html;
})

const handleEdit = null;
const handleDelete = null;

const toggleDescription = (id) => {
  const elem = document.querySelector(`.question-description-${id}`);
  elem.style.display = (
    elem.style.display == '' ? 'block' : ''
  )
}


console.log(questions)
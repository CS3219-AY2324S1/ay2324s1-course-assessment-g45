// index.js

questions.forEach((question) => {
  const html = `
  <tr>
    <td> ${question.id }</td>
    <td > 
      <div class="question-title ${question.id}"> ${question.title } </div>
      <div class="question-description-${question.id}"> </div>
    </td>
    <td> ${ question.categories }</td>
    <td> ${question.complexity }</td>
  </tr>
  `;
  document.querySelector('.questions-container').innerHTML += html;
})

document.querySelectorAll('.question-title').forEach((e) => {
  e.onclick = (e) => {
    console.log(e)
    const id = e.target.classList[1];
    document.querySelector(`.question-description-${id}`).innerHTML += `
    <div>
      ${questions.filter(q => q.id == id)[0].description}
    </div>
    `
  }
})


console.log(questions)
// index.js
const convertToSlug = (inputString) => {
	return inputString.toLowerCase().replace(/\s+/g, '-');
}

questions.forEach((question) => {
  const html = `
  <tr>
    <td > 
      <div class="question-title" onclick="toggleDescription('${question.title}')"> ${question.title} </div>
      <div class="question-description-${convertToSlug(question.title)}"> ${question.description} </div>
    </td>
    <td> ${question.categories}</td>
    <td> ${question.complexity}</td>
    <td class=""actions> 
      <button class="edit-button" onclick="handleEditQuestion()">Edit</button>
      <button class="delete-button" onclick="handleDeleteQuestion()">Delete</button>
    </td>
  </tr>
  `;

  console.log(html)

  document.querySelector('.questions-table').innerHTML += html;
})

const handleEditQuestion = () => {
	console.log('edit question')
};

const handleDeleteQuestion = () => {
	console.log('delete question')
};

const toggleDescription = (title) => {
	const elem = document.querySelector(`.question-description-${convertToSlug(title)}`);
	elem.style.display = (
		elem.style.display == '' ? 'block' : ''
	)
}

console.log(questions)
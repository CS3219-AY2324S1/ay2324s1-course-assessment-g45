const formHtml = `
	<button class="add-question-button" onclick="openAddQuestionDialog()">Add a new question</button>
  <dialog id="add-question-dialog">
		<form id="question-form">
			<label for="title">Title:</label>
			<input type="text" id="title" name="title" required><br>

			<label for="question">Question:</label>
			<input type="text" id="question" name="question" required><br>

			<label for="category">Category:</label>
			<div id="category-display"></div>
			<br/>
				<input type="text" id="category" name="category">
				<button type="button" onclick="addCategory()">Add Category</button>
			<br/>

			<label for="complexity">Complexity:</label>
			<input type="text" id="complexity" name="complexity" required><br>

			<button type="button" onclick="closeAddQuestionDialog()">Cancel</button>
			<button type="submit">Submit</button>
		</form>
  </dialog>
`

document.getElementById('container').innerHTML += formHtml;

function openAddQuestionDialog() {
	const dialog = document.getElementById("add-question-dialog");
	dialog.showModal();
}

function closeAddQuestionDialog() {
	const dialog = document.getElementById("add-question-dialog");
	dialog.close();
}

// TODO: To add BACKEND operations
const handleAddQuestion = (question) => {
	// Frontend
	console.log('add question', question)
	closeAddQuestionDialog()
	const rowHtml = `
  <tr>
    <td > 
      <div class="question-title" onclick="toggleDescription('${question.title}')"> ${question.title} </div>
      <div class="question-description-${convertToSlug(question.title)}"> ${question.description} </div>
    </td>
    <td> ${question.categories}</td>
    <td> ${question.complexity}</td>
    <td> 
      <button onclick={handleEdit()}>Edit</button>
      <button onclick={handleDelete}>Delete</button>
    </td>
  </tr>
  `;

	document.querySelector('.questions-table').innerHTML += rowHtml;

	// TODO: Huy does his BACKEND magic here
	// doSomething()
};

const questionForm = document.getElementById("question-form");

// Keep track of categories for the current form
const categories = [];

function addCategory() {
	const inputField = document.getElementById("category");
	const category = inputField.value.trim()
	if (category == '') {
		return
	}
	categories.push(category)
	inputField.value = ""
	const displayField = document.getElementById("category-display");
	const categoryButton = `
		<button type="button" onclick="removeCategory('${category}')" class="category-name-${category}">${category}</button>
	`
	displayField.innerHTML += categoryButton
	console.log('categories', categories)
}

function removeCategory(category) {
	document.querySelector(`.category-name-${category}`).remove();
	const index = categories.indexOf(category)
	categories.splice(index, 1)
	console.log('categories', categories)
}

questionForm.addEventListener("submit", function (event) {
	event.preventDefault();

	const title = document.getElementById("title");
	const question = document.getElementById("question");
	const complexity = document.getElementById("complexity");

	const newQuestionObject = {
		title: title.value,
		question: question.value,
		categories,
		complexity: complexity.value
	}

	handleAddQuestion(newQuestionObject);

	//Clear the form
	categories.length = 0
	title.value = ''
	question.value = ''
	complexity.value = ''
	document.getElementById('category').value = ''
	document.getElementById('category-display').innerHTML = ''

	//Debug
	console.log('categories', categories)
});


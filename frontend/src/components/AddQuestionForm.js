const templateForm = `
  <dialog id="dialog">
		<form id="question-form">
			<label for="title">Title:</label>
			<input type="text" id="title" name="title" required><br>

			<label for="description">Description:</label>
			<input type="text" id="description" name="description" required><br>

			<label for="category">Category:</label>
			<div id="category-display"></div>
			<br/>
				<input type="text" id="category" name="category">
				<button type="button" onclick="addCategory()">Add Category</button>
			<br/>

			<label for="complexity">Complexity:</label>
			<input type="text" id="complexity" name="complexity" required><br>

			<button type="button" onclick="closeForm()">Cancel</button>
			<button type="submit">Submit</button>
		</form>
  </dialog>
`

document.getElementById('container').innerHTML += templateForm;

// Keep track of categories for the current form
const categories = [];

// Keep track of whether to edit a question
var oldSlug = '';

function openAddQuestionForm() {
	const dialog = document.getElementById("dialog");
	dialog.showModal();
}

function openEditQuestionForm(question) {
	oldSlug = getSlugFromQuestion(question)
	console.log(question)
	const title = document.getElementById("title");
	const description = document.getElementById("description");
	const complexity = document.getElementById("complexity");

	title.value = question.title
	description.value = question.description
	complexity.value = question.complexity

	question.categories.map((category) => {
		categories.push(category)
		const displayField = document.getElementById("category-display");
		const categoryButton = createCategoryButton(category)
		displayField.innerHTML += categoryButton
	})

	const dialog = document.getElementById("dialog");
	dialog.showModal();
}

function closeForm() {
	const dialog = document.getElementById("dialog");
	dialog.close();

	// Reset the form
	categories.length = 0
	document.getElementById('title').value = ''
	document.getElementById('description').value = ''
	document.getElementById('complexity').value = ''
	document.getElementById('category').value = ''
	document.getElementById('category-display').innerHTML = ''
	oldSlug = ''
}

// TODO: To add BACKEND operations
const handleAddQuestion = (question) => {
	// Frontend
	console.log('add question', question)
	const rowHtml = createTableRow(question);

	document.querySelector('.questions-table').appendChild(rowHtml);
	rowHtml.addEventListener("DOMContentLoaded", () => {
		document
		.querySelector(`.edit-button-for-${getSlugFromQuestion(question)}`)
		.addEventListener("click", () => {
			openEditQuestionForm(question)
		})
		document
		.querySelector(`.delete-button-for-${getSlugFromQuestion(question)}`)
		.addEventListener("click", () => {
			handleDeleteQuestion(question)
		})
	})

	// TODO: Huy does his BACKEND magic here

};

// TODO: To add BACKEND operations
const handleEditQuestion = (oldSlug, question) => {
	// Frontend
	console.log('edit question', question)
	const rowHtml = createTableRow(question);

	const oldRow = document.querySelector(`.row-of-${oldSlug}`);
	oldRow.parentElement.replaceChild(rowHtml, oldRow)

	// TODO: Huy does his BACKEND magic here

};

// TODO: To add BACKEND operations
const handleDeleteQuestion = (question) => {
	document
	.querySelector(`.edit-button-for-${getSlugFromQuestion(question)}`)
	.removeEventListener("click", () => {
		openEditQuestionForm(question)
	})
	document
	.querySelector(`.delete-button-for-${getSlugFromQuestion(question)}`)
	.removeEventListener("click", () => {
		handleDeleteQuestion(question)
	})
	document.querySelector(`.row-of-${getSlugFromQuestion(question)}`).remove()

	// TODO: Huy does his BACKEND magic here

};

const questionForm = document.getElementById("question-form");

function addCategory() {
	const inputField = document.getElementById("category");
	const category = inputField.value.trim()
	if (category == '') {
		return
	}
	categories.push(category)
	inputField.value = ""
	const displayField = document.getElementById("category-display");
	const categoryButton = createCategoryButton(category)
	displayField.innerHTML += categoryButton
	console.log('categories', categories)
}

function createCategoryButton(category) {
	console.log(category)
	return `<button type="button" onclick="removeCategory('${category}')" class="category-name-${getSlug(category)}">${category}</button>`
}

function removeCategory(category) {
	console.log('remove', category)
	document.querySelector(`.category-name-${getSlug(category)}`).remove();
	const index = categories.indexOf(category)
	categories.splice(index, 1)
	console.log('categories', categories)
}

questionForm.addEventListener("submit", function (event) {
	event.preventDefault();

	const newTitle = document.getElementById("title");
	const newDescription = document.getElementById("description");
	const newComplexity = document.getElementById("complexity");
	const newCategories = []
	categories.map((category) => newCategories.push(category))

	const newQuestionObject = {
		title: newTitle.value,
		description: newDescription.value,
		categories: newCategories,
		complexity: newComplexity.value
	}

	if (oldSlug == '') {
		handleAddQuestion(newQuestionObject);
	} else {
		handleEditQuestion(oldSlug, newQuestionObject);
	}

	closeForm()
});

questions.forEach((question) => {
  handleAddQuestion(question)
})

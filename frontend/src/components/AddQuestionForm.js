const templateForm = `
  <dialog id="dialog">
		<form id="question-form">
			<label for="title">Title:</label>
			<input type="text" id="title" name="title" required><br>
      <div id="warning" class="title-warning">Title already exists!</div>

			<label for="description">Description:</label>
			<textarea type="text" id="description" name="description" required></textarea>
      <br/>

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
`;

document.getElementById('container').innerHTML += templateForm;

// Keep track of categories for the current form
const categories = [];

// Keep track of whether to edit a question
var oldTitle = '';

function openAddQuestionForm() {
  const dialog = document.getElementById('dialog');
  dialog.showModal();
}

function openEditQuestionForm(question) {
  oldTitle = question.title;
  console.log(question);
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const complexity = document.getElementById('complexity');

  title.value = question.title;
  description.value = question.description;
  complexity.value = question.complexity;

  question.categories.map((category) => {
    categories.push(category);
    const displayField = document.getElementById('category-display');
    const categoryButton = createCategoryButton(category);
    displayField.innerHTML += categoryButton;
  });

  const dialog = document.getElementById('dialog');
  dialog.showModal();
}

function closeForm() {
  document.querySelector(`.title-warning`).style.display = '';

  const dialog = document.getElementById('dialog');
  dialog.close();

  // Reset the form
  categories.length = 0;
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('complexity').value = '';
  document.getElementById('category').value = '';
  document.getElementById('category-display').innerHTML = '';
  oldTitle = '';
}

const addQuestionFrontend = (question) => {
  // Frontend
  console.log('add question', question);

  // Prevents duplicate question titles
  if (document.querySelector(`.row-of-${getSlugFromQuestion(question)}`)) {
    throw Error('Duplicate question title');
  }

  const rowHtml = createTableRow(question);

  document.querySelector('.questions-table').appendChild(rowHtml);
  rowHtml.addEventListener('DOMContentLoaded', () => {
    document
      .querySelector(`.edit-button-for-${getSlugFromQuestion(question)}`)
      .addEventListener('click', () => {
        openEditQuestionForm(question);
      });
    document
      .querySelector(`.delete-button-for-${getSlugFromQuestion(question)}`)
      .addEventListener('click', () => {
        handleDeleteQuestion(question);
      });
  });
};

const handleAddQuestion = (question) => {
  try {
    addQuestionFrontend(question);
  } catch (err) {
    document.querySelector(`.title-warning`).style.display = 'block';
    return;
  }

  // Backend
  fetch('/api/questions/', {
    method: 'POST',
    body: JSON.stringify(question),
    headers: {
      'Content-type': 'application/json',
    },
  }).catch((error) => {
    console.log(error);
  });
  closeForm();
};

const handleEditQuestion = (oldTitle, question) => {
  // Frontend
  console.log('edit question', question);

  if (
    question.title !== oldTitle &&
    document.querySelector(`.row-of-${getSlugFromQuestion(question)}`)
  ) {
    console.log('Question title already exists');
    return;
  }

  const rowHtml = createTableRow(question);

  const oldRow = document.querySelector(`.row-of-${getSlug(oldTitle)}`);
  oldRow.parentElement.replaceChild(rowHtml, oldRow);

  // Backend
  fetch(`/api/questions/${oldTitle}`, {
    method: 'PATCH',
    body: JSON.stringify(question),
    headers: {
      'Content-type': 'application/json',
    },
  }).catch((error) => {
    console.log(error);
  });
  closeForm();
};

const handleDeleteQuestion = (question) => {
  document
    .querySelector(`.edit-button-for-${getSlugFromQuestion(question)}`)
    .removeEventListener('click', () => {
      openEditQuestionForm(question);
    });
  document
    .querySelector(`.delete-button-for-${getSlugFromQuestion(question)}`)
    .removeEventListener('click', () => {
      handleDeleteQuestion(question);
    });
  document.querySelector(`.row-of-${getSlugFromQuestion(question)}`).remove();

  // Backend
  fetch(`/api/questions/${question.title}`, {
    method: 'DELETE',
  }).catch((error) => {
    console.log(error);
  });
};

const questionForm = document.getElementById('question-form');

function addCategory() {
  const inputField = document.getElementById('category');
  const category = inputField.value.trim();
  if (category == '') {
    return;
  }
  categories.push(category);
  inputField.value = '';
  const displayField = document.getElementById('category-display');
  const categoryButton = createCategoryButton(category);
  displayField.innerHTML += categoryButton;
  console.log('categories', categories);
}

function createCategoryButton(category) {
  console.log(category);
  return `<button type="button" onclick="removeCategory('${category}')" class="category-name-${getSlug(
    category
  )}">${category}</button>`;
}

function removeCategory(category) {
  console.log('remove', category);
  document.querySelector(`.category-name-${getSlug(category)}`).remove();
  const index = categories.indexOf(category);
  categories.splice(index, 1);
  console.log('categories', categories);
}

questionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTitle = document.getElementById('title');
  const newDescription = document.getElementById('description');
  const newComplexity = document.getElementById('complexity');
  const newCategories = [];
  categories.map((category) => newCategories.push(category));

  const newQuestionObject = {
    title: newTitle.value,
    description: newDescription.value,
    categories: newCategories,
    complexity: newComplexity.value,
  };

  if (oldTitle == '') {
    handleAddQuestion(newQuestionObject);
  } else {
    handleEditQuestion(oldTitle, newQuestionObject);
  }

  // closeForm();
});

fetch('/api/questions/', {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((questions) => {
    questions.forEach((question) => {
      addQuestionFrontend(question);
    });
  })
  .catch((error) => {
    console.log(error);
  });

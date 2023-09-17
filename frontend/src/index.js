// index.js
const getSlugFromQuestion = (question) => {
  return getSlug(question.title)
}

const getSlug = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-');
}

const createTableRow = (question) => {
  const newRow = document.createElement("tr");
  newRow.classList.add(`row-of-${getSlugFromQuestion(question)}`);

  const questionTitle = document.createElement("td");
  questionTitle.innerHTML = `
    <div class="question-title" onclick="toggleDescription('${getSlugFromQuestion(question)}')"> ${question.title} </div>
    <div class="question-description-${getSlugFromQuestion(question)}"> ${question.description} </div>
  `
  newRow.appendChild(questionTitle)

  const questionCategory = document.createElement("td");
  questionCategory.innerHTML = question.categories
  newRow.appendChild(questionCategory)

  const questionComplexity = document.createElement("td");
  questionComplexity.innerHTML = question.complexity
  newRow.appendChild(questionComplexity)

  const questionActions = document.createElement("td");
  questionActions.classList.add("actions")

  const editButton = document.createElement("button");
  editButton.classList.add(`edit-button-for-${getSlugFromQuestion(question)}`)
  editButton.textContent = "Edit"
  editButton.addEventListener("click", () => {
    openEditQuestionForm(question)
  })

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(`delete-button-for-${getSlugFromQuestion(question)}`)
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", () => {
    handleDeleteQuestion(question)
  })

  questionActions.appendChild(editButton)
  questionActions.appendChild(deleteButton)

  newRow.append(questionActions)

  return newRow
}

const toggleDescription = (slug) => {
  const elem = document.querySelector(`.question-description-${slug}`);
  elem.style.display = (
    elem.style.display == '' ? 'block' : ''
  )
}

console.log(questions)
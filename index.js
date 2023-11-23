const form = document.querySelector(".main-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list-items ul");

// Function to create a new todo item
function createTodoItem(text) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = `
      ${text}
      <button class="btn btn-danger btn-sm float-end delete">X</button>
      <button class="btn btn-primary btn-sm float-end edit">Edit</button>
    `;
  return li;
}

// Add todo item when form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const newTodoItem = createTodoItem(todoText);
    todoList.appendChild(newTodoItem);
    todoInput.value = "";
  }
});

// Delete todo item when delete button is clicked
todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const listItem = e.target.closest("li");
    listItem.remove();
  }
});

// Edit todo item when edit button is clicked
todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    const listItem = e.target.closest("li");
    const currentText = listItem.firstChild.textContent.trim();

    // Set the modal input field value to the current todo item text
    const modalInput = document.getElementById("editModalInput");
    modalInput.value = currentText;

    // Open the Bootstrap modal
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();

    // Save changes when the modal form is submitted
    const modalForm = document.getElementById("modalForm");
    modalForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const newText = modalInput.value.trim();
      if (newText !== "") {
        listItem.firstChild.textContent = newText;
        editModal.hide();
      }
    });
  }
});

const form = document.querySelector("#todo-form");
const dialog = document.querySelector("#todo-dialog");

const content = document.querySelector("#content");

function collectFormData(dataset) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    dataset(data);
    // form.reset();
    dialog.close();
  });
}

function initiatePage() {
  //  set p navigation, sidebar etc.
}

function createTextElement(tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
}

function renderTodoCard(todo) {
  const card = document.createElement("div");
  card.classList.add("todo-card");
  card.dataset.id = todo.id;
  card.append(
    createTextElement("h3", todo.title),
    createTextElement("p", todo.description),
    createTextElement("p", `Due: ${todo.dueDate}`),
    createTextElement("p", `Priority: ${todo.priority}`),
    createTextElement("p", `Status: ${todo.done ? "Done" : "Not Done"}`),
  );
  return card;
}

function renderTodos(card) {
  document.querySelector(".container").append(card);
}

function renderProjects(project) {
  const pocket = document.createElement("div");
  pocket.classList.add("pocket");
  pocket.dataset.id = project.id;
  pocket.append(
    createTextElement("h2", project.title),
    createTextElement("p", project.description),
  );
  const container = document.createElement("div");
  container.classList.add("container");
  pocket.append(container);
  content.append(pocket);
  //   const projectList = document.querySelector("#project-list");
  //   const projectItem = document.createElement("li");
  //   projectItem.textContent = project.title;
  //   projectList.append(projectItem);
  //   content.append(projectList);
}

export {
  collectFormData,
  renderTodos,
  renderTodoCard,
  renderProjects,
  initiatePage,
};

const todoform = document.querySelector("#todo-form");
const tododialog = document.querySelector("#todo-dialog");
const projectform = document.querySelector("#project-form");
const projectdialog = document.querySelector("#project-dialog");
const sidebar = document.querySelector(".sidebar");
const workspace = document.querySelector(".workspace");

function initiatePage() {
  //  set p navigation, sidebar etc.
}

// ease of creation of elements with text content and class names
function createTextElement(tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
}

function createContainer(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

function createButton(text, action) {
  const button = document.createElement("button");
  button.textContent = text;
  button.dataset.action = action;
  return button;
}

// ToDo Cards
function collectFormData(form, dialog, dataset) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    dataset(data);
    // form.reset();
    dialog.close();
  });
}

function createCard(todo) {
  const card = createContainer("div", "todo-card");
  card.dataset.id = todo.id;
  card.dataset.priority = todo.priority;
  const cardheader = createContainer("div", "header");
  const details = createContainer("div", "details");
  cardheader.append(
    createTextElement("h3", todo.title),
    createTextElement("p", `Due: ${todo.dueDate}`),
  );
  details.append(
    createTextElement("p", todo.description),
    // createTextElement("p", `Priority: ${todo.priority}`),
    createTextElement("p", `Status: ${todo.done ? "Done" : "Not Done"}`),
  );
  card.append(cardheader, details);
  card.append(createActionButtons());
  return card;
}

function placeTodoCard(card) {
  // muss spezifiziert werden, welcher container in welchem projekt!!
  document.querySelector(".container").append(card);
}

function todoActions({ onEdit, onDelete }) {
  const actions = {
    edit: onEdit,
    delete: onDelete,
  };
  workspace.addEventListener("click", (e) => {
    const card = e.target.closest(".todo-card");
    if (!card) return;

    const action = e.target.closest("[data-action]")?.dataset.action;

    if (action && actions[action]) {
      actions[action](card.dataset.id);
    } else if (!action) {
      card.classList.toggle("expanded"); // Klick daneben: auf- und zuklappen
    }
  });
}

function renderTodos(todos) {
  document
    .querySelector(".container")
    .replaceChildren(...todos.map(createCard));
}
// Projects

function renderSidebar(projects) {
  sidebar.replaceChildren(...projects.map(createSidebarItem));
}

function SidebarActions({ onSelect, onDelete, onEdit }) {
  const actions = {
    select: onSelect,
    delete: onDelete,
    edit: onEdit,
  };
  sidebar.addEventListener("click", (e) => {
    const item = e.target.closest(".project-container");

    if (!item) return;

    const actionEl = e.target.closest("[data-action]");
    const action = actionEl?.dataset.action;
    if (action && actions[action]) {
      actions[action](item.dataset.id);
    } else {
      onSelect(item.dataset.id);
    }
  });
}

// nutzt Essentials, um den Workspace zu füllen
function renderWorkspace(project) {
  const workspace = document.querySelector(".workspace");
  const projectcontainer = createProjectEssentials(project);
  const container = createContainer("div", "container");
  projectcontainer.append(container);
  workspace.replaceChildren(projectcontainer);
  renderTodos(project.todoList);
}

function createProjectEssentials(project) {
  const projectcontainer = createContainer("div", "project-container");
  const text = createContainer("aside", "textEl");
  text.append(
    createTextElement("h3", project.title),
    createTextElement("p", project.description),
  );
  projectcontainer.dataset.id = project.id;
  projectcontainer.append(text);
  return projectcontainer;
}

// fügt Essentials Buttons hinzu für Sidebar
function createSidebarItem(project) {
  const item = createProjectEssentials(project);
  if (!project.isdefault) {
    item.append(createActionButtons());
  }
  return item;
}

function createActionButtons() {
  const buttons = createContainer("aside", "buttons");
  buttons.append(
    createButton("Delete", "delete"),
    createButton("Edit", "edit"),
  );
  return buttons;
}

export function collectProjectFormData(dataset) {
  collectFormData(projectform, projectdialog, dataset);
}

export function collectTodoFormData(dataset) {
  collectFormData(todoform, tododialog, dataset);
}

export {
  placeTodoCard,
  createCard,
  renderWorkspace,
  initiatePage,
  renderSidebar,
  SidebarActions,
  renderTodos,
  todoActions,
};

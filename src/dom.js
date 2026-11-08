const todoform = document.querySelector("#todo-form");
const tododialog = document.querySelector("#todo-dialog");
const projectform = document.querySelector("#project-form");
const projectdialog = document.querySelector("#project-dialog");
const sidebar = document.querySelector(".sidebar");

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
  card.append(
    createTextElement("h3", todo.title),
    createTextElement("p", todo.description),
    createTextElement("p", `Due: ${todo.dueDate}`),
    createTextElement("p", `Priority: ${todo.priority}`),
    createTextElement("p", `Status: ${todo.done ? "Done" : "Not Done"}`),
  );
  return card;
}

function placeTodoCard(card) {
  // muss spezifiziert werden, welcher container in welchem projekt!!
  document.querySelector(".container").append(card);
}

// Projects

function renderSidebar(projects) {
  sidebar.replaceChildren(...projects.map(createSidebarItem));
  // ...projects.map((project) => {
  //   const projectcontainer = createSidebarItem(project);
  //   projectcontainer.addEventListener("click", () => {
  //     renderWorkspace(project);
  //     console.log(`Rendering workspace for project: ${project.title}`);
  //   });
  //   return projectcontainer;
  // }),
  // );
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
  //   const projectList = document.querySelector("#project-list");
  //   const projectItem = document.createElement("li");
  //   projectItem.textContent = project.title;
  //   projectList.append(projectItem);
  //   content.append(projectList);
}

function createProjectEssentials(project) {
  const projectcontainer = createContainer("div", "project-container");
  const projectTitle = createTextElement("h3", project.title);
  const projectDescription = createTextElement("p", project.description);
  projectcontainer.dataset.id = project.id;
  projectcontainer.append(projectTitle, projectDescription);
  return projectcontainer;
}

// fügt Essentials Buttons hinzu für Sidebar
function createSidebarItem(project) {
  const item = createProjectEssentials(project);
  const deleteButton = createButton("Delete", "delete");
  const editButton = createButton("Edit", "edit");
  item.append(deleteButton, editButton);
  return item;
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
};

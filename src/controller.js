import "./styles.css";
import createToDo from "./todo_factory.js";
import * as dom from "./dom.js";
import {
  createProject,
  findProject,
  deleteProject,
  editProject,
} from "./projects.js";

// Todo - Creator Module:
// title, desciption, dueDate, prioritylevel, optional: notes, checklist?

// Controller Module:

export default function init() {
  dom.initiatePage();

  // default project for todos that are not assigned to a project
  const notepad = createProject(
    "Notepad",
    "Alle Notizen, die nicht zu einem Projekt gehören",
    { isdefault: true },
  );
  const projectlist = [notepad];
  let currentProject = notepad;
  dom.renderWorkspace(currentProject);
  dom.renderSidebar(projectlist);

  // vermischt den auftrag mit logik, die im project modul passiert
  dom.SidebarActions({
    onSelect: (projectId) => {
      currentProject = findProject(projectlist, projectId);
      dom.renderWorkspace(currentProject);
    },
    onDelete: (projectId) => {
      dom.renderSidebar(deleteProject(projectlist, projectId));
      dom.renderWorkspace((currentProject = notepad));
    },
    onEdit: (projectId) => {
      let p = editProject(projectlist, projectId);
      dom.renderSidebar(projectlist);
      if (currentProject === p) dom.renderWorkspace(currentProject);
    },
  });

  // direct data from the form to the todo factory module, render the todo card and append it to the project
  // function addTodo(data) {
  //   const todo = createToDo(
  //     data.title,
  //     data.description,
  //     data.dueDate,
  //     data.priority,
  //   );

  //   // wird mal currentproject.push.todo
  //   if (todo.project === "notepad") {
  //     notepad.todoList.push(todo);
  //   }

  //   // renderToDos(currentProject.todos);
  //   const renderedCard = createCard(todo);
  //   placeTodoCard(renderedCard);
  // }

  // collectTodoFormData(addTodo);
  dom.collectTodoFormData((data) => {
    const todo = createToDo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
    );

    // wird mal currentproject.push.todo
    if (todo.project === "notepad") {
      notepad.todoList.push(todo);
    }

    // renderToDos(currentProject.todos);
    const renderedCard = dom.createCard(todo);
    dom.placeTodoCard(renderedCard);
  });

  dom.collectProjectFormData((data) => {
    const project = createProject(data.title, data.description);
    projectlist.push(project);
    console.log(projectlist);
    dom.renderSidebar(projectlist);
  });
}

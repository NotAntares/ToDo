import "./styles.css";
import createToDo from "./todo_factory.js";
import * as dom from "./dom.js";
import {
  createProject,
  findProject,
  deleteProject,
  editProject,
} from "./projects.js";
import * as storage from "./storage.js";

// Todo - Creator Module:
// title, desciption, dueDate, prioritylevel, optional: notes, checklist?

// Controller Module:

export default function init() {
  dom.initiatePage();
  storage.initiateStorage();
  let projectlist = storage.loadStorage();

  if (!projectlist || projectlist.length === 0) {
    projectlist = [
      createProject(
        "Notepad",
        "Alle Notizen, die nicht zu einem Projekt gehören",
        { isdefault: true },
      ),
    ];
  }

  // default project for todos that are not assigned to a project

  let currentProject = projectlist[0];
  dom.renderWorkspace(currentProject);
  dom.renderSidebar(projectlist);

  dom.SidebarActions({
    onSelect: (projectId) => {
      currentProject = findProject(projectlist, projectId);
      dom.renderWorkspace(currentProject);
    },
    onDelete: (projectId) => {
      dom.renderSidebar(deleteProject(projectlist, projectId));
      dom.renderWorkspace((currentProject = projectlist[0]));
    },
    onEdit: (projectId) => {
      let p = editProject(projectlist, projectId);
      dom.renderSidebar(projectlist);
      if (currentProject === p) dom.renderWorkspace(currentProject);
    },
  });

  dom.TodoActions();

  // add new Todo
  dom.collectTodoFormData((data) => {
    const todo = createToDo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
    );

    currentProject.todoList.push(todo);
    dom.renderTodos(currentProject.todoList);
    storage.populateStorage(projectlist);
  });

  // add new project
  dom.collectProjectFormData((data) => {
    const project = createProject(data.title, data.description);
    projectlist.push(project);
    console.log(projectlist);
    dom.renderSidebar(projectlist);
    storage.populateStorage(projectlist);
  });
}

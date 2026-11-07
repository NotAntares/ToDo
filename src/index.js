import "./styles.css";
import createToDo from "./todo_factory.js";
import {
  collectFormData,
  renderTodos,
  renderTodoCard,
  renderProjects,
  initiatePage,
} from "./dom.js";
import { createProject } from "./projects.js";

// Todo - Creator Module:
// title, desciption, dueDate, prioritylevel, optional: notes, checklist?

// Controller Module:

// das hier sollte in eine init-funktiomn, die beim laden der Seite aufgerufen wird
const notepad = createProject(
  "Notepad",
  "Alle Notizen, die nicht zu einem Projekt gehören",
);
renderProjects(notepad);

// direct data from the form to the todo factory module, render the todo card and append it to the project
function addTodo(data) {
  const todo = createToDo(
    data.title,
    data.description,
    data.dueDate,
    data.priority,
  );
  if (todo.project === "notepad") {
    notepad.project.push(todo);
  }
  console.log(notepad);
  const renderedCard = renderTodoCard(todo);
  renderTodos(renderedCard);
}

collectFormData(addTodo);

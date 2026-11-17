function createToDo(
  title,
  description = null,
  dueDate = null,
  priority = "low",
) {
  console.log(title, description, dueDate, priority);
  return {
    title,
    description,
    dueDate,
    priority,
    done: false,
    project: "notepad",
    id: crypto.randomUUID(),
  };
}

function findTodo(todolist, id) {
  return todolist.find((p) => p.id === id);
}

function deleteTodo(todolist, id) {
  const p = findTodo(todolist, id);
  if (!p) return todolist; // nichts gefunden

  todolist.splice(todolist.indexOf(p), 1);
  return todolist;
}

function editTodo(todolist, id) {
  const p = findTodo(todolist, id);
  if (!p) return null;

  const title = prompt("Neuer Titel", p.title);
  const description = prompt("Neue Beschreibung", p.description);
  if (title === null || description === null) return null; // abgebrochen

  p.title = title;
  p.description = description;
  return p;
}

function toggleTodo(todolist, id) {
  const t = findTodo(todolist, id);
  if (!t) return null;
  t.done = !t.done;
  return t;
}

export { createToDo, findTodo, deleteTodo, editTodo, toggleTodo };

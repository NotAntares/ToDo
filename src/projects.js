function createProject(title, description, { isdefault = false } = {}) {
  return {
    title,
    description,
    isdefault,
    id: crypto.randomUUID(),
    todoList: [],
  };
}

function findProject(projectList, id) {
  return projectList.find((p) => p.id === id);
}

function deleteProject(projectList, id) {
  const p = findProject(projectList, id);
  if (!p || p.isDefault) return projectList; // nichts gefunden oder Notepad

  projectList.splice(projectList.indexOf(p), 1);
  return projectList;
}

function editProject(projectList, id) {
  const p = findProject(projectList, id);
  p.title = prompt("write new Title");
  p.description = prompt("new descriptiom");
  return p;
}

export { createProject, findProject, deleteProject, editProject };

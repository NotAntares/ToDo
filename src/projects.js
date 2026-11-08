function createProject(title, description) {
  let todoList = [];
  return {
    title,
    description,
    id: crypto.randomUUID(),
    todoList,
  };
}

export { createProject };

function createProject(title, description) {
  let project = [];
  return {
    title,
    description,
    id: crypto.randomUUID(),
    project,
  };
}

export { createProject };

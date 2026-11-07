export default function createToDo(
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

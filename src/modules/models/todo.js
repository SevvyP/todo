// ToDo represents a single task that the user wants to complete
export class ToDo {
  constructor(title, dueDate, priority, notes, checked) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checked = checked;
  }

  getTitle() {
    return this.title;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.priority;
  }

  getNotes() {
    return this.notes;
  }

  getChecked() {
    return this.checked;
  }

  setTitle(title) {
    this.title = title;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setNotes(notes) {
    this.notes = notes;
  }

  setChecked(checked) {
    this.checked = checked;
  }
}

// ToDoList represents a list of tasks that the user wants to complete
export class ToDoList {
  constructor(name) {
    this.name = name;
    this.toDoList = [];
  }

  addToDo(toDo) {
    this.toDoList.push(toDo);
  }

  getToDoList() {
    return this.toDoList;
  }

  removeToDo(index) {
    this.toDoList.splice(index, 1);
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}

// createDefaultTodo creates a default ToDo object with default values
export function createDefaultTodo() {
  return new ToDo("Title", "Due Date", "Priority", "Add a note", false);
}

// createDefaultToDoList creates a default ToDoList object with default values
export function createDefaultToDoList() {
  const toDoList = new ToDoList("Default List");
  toDoList.addToDo(createDefaultTodo());
  return toDoList;
}

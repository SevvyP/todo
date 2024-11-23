import {
  ToDo,
  ToDoList,
  createDefaultToDoList,
  createDefaultTodo,
} from "./todo";
import "./styles.css";

// Render the ToDoList object and save it to session storage
function renderToDoList(index) {
  // Save the ToDoList to session storage
  const toDoListsJSON = JSON.stringify(toDoLists);
  sessionStorage.setItem("toDoLists", toDoListsJSON);

  const toDoListElement = document.getElementById("toDoList");
  toDoListElement.innerHTML = ""; // Clear the list

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add ToDo";
  addBtn.addEventListener("click", () => {
    toDoLists[index].addToDo(createDefaultTodo());
    renderToDoList(index);
  });
  addBtn.className = "addBtn";
  toDoListElement.appendChild(addBtn);

  toDoLists[index].getToDoList().forEach((toDo, index2) => {
    const toDoElement = document.createElement("div");
    toDoElement.className = "toDoListItem";

    const titleElement = document.createElement("h2");
    titleElement.textContent = toDo.getTitle();
    toDoElement.appendChild(titleElement);

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = `Due Date: ${toDo.getDueDate()}`;
    toDoElement.appendChild(dueDateElement);

    const priorityElement = document.createElement("p");
    priorityElement.textContent = `Priority: ${toDo.getPriority()}`;
    toDoElement.appendChild(priorityElement);

    const notesElement = document.createElement("p");
    notesElement.textContent = `Notes: ${toDo.getNotes()}`;
    toDoElement.appendChild(notesElement);

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = `toDo${index}`;
    checkboxElement.checked = toDo.getChecked();
    checkboxElement.addEventListener("change", () => {
      toDo.setChecked(!toDo.getChecked());
      renderToDoList(index);
    });
    toDoElement.appendChild(checkboxElement);

    const labelElement = document.createElement("label");
    labelElement.htmlFor = `toDo${index}`;
    labelElement.textContent = "Completed";
    toDoElement.appendChild(labelElement);

    const removeButtonElement = document.createElement("button");
    removeButtonElement.id = `removeToDo${index}`;
    removeButtonElement.textContent = "Remove";
    removeButtonElement.addEventListener("click", () => {
      toDoLists[index].removeToDo(index2);
      renderToDoList(index);
    });
    toDoElement.appendChild(removeButtonElement);

    toDoListElement.appendChild(toDoElement);
  });
}

// Check session storage for existing ToDoLists
const toDoLists = [];
const storedToDoLists = JSON.parse(sessionStorage.getItem("toDoLists"));
if (storedToDoLists) {
  storedToDoLists.forEach((toDoList) => {
    const newToDoList = new ToDoList(toDoList.name);
    toDoList.toDoList.forEach((toDo) => {
      const newToDo = new ToDo(
        toDo.title,
        toDo.description,
        toDo.dueDate,
        toDo.priority,
        toDo.notes,
        toDo.checked
      );
      newToDoList.addToDo(newToDo);
    });
    toDoLists.push(newToDoList);
  });
} else {
  toDoLists.push(createDefaultToDoList());
  toDoLists.push(createDefaultToDoList());
  toDoLists[0].setName("To Do List 1");
  toDoLists[1].setName("To Do List 2");
}

toDoLists[0].setName("To Do List 1");
toDoLists[1].setName("To Do List 2");

// render sidebar
toDoLists.forEach((toDoList, index) => {
  const sideBar = document.getElementById("sidebar");
  const sideBarItem = document.createElement("div");
  sideBarItem.textContent = toDoList.getName();
  sideBarItem.addEventListener("click", () => {
    renderToDoList(index);
  });
  sideBar.appendChild(sideBarItem);
});

renderToDoList(0);

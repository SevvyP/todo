import {
  ToDo,
  ToDoList,
  createDefaultToDoList,
  createDefaultTodo,
} from "./todo";
import "./styles.css";
import lessthan from "./assets/lessthan.svg";
import burger from "./assets/burger.svg";

// Render the ToDoList object and save it to session storage
function renderToDoList(index) {
  // Save the ToDoList to session storage
  const toDoListsJSON = JSON.stringify(toDoLists);
  localStorage.setItem("toDoLists", toDoListsJSON);

  const toDoListElement = document.getElementById("toDoList");
  toDoListElement.innerHTML = ""; // Clear the list

  const addElement = document.getElementById("add");
  addElement.innerHTML = ""; // Clear the add button
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add ToDo";
  addBtn.addEventListener("click", () => {
    toDoLists[index].addToDo(createDefaultTodo());
    renderToDoList(index);
  });
  addBtn.className = "addBtn";
  addElement.appendChild(addBtn);

  toDoLists[index].getToDoList().forEach((toDo, index2) => {
    const toDoElement = document.createElement("div");
    toDoElement.className = "toDoListItem";

    const radioElement = document.createElement("input");
    radioElement.type = "radio";
    radioElement.checked = toDo.getChecked();
    radioElement.addEventListener("change", () => {
      toDo.setChecked(!toDo.getChecked());
      renderToDoList(index);
    });
    radioElement.className = "checked";
    toDoElement.appendChild(radioElement);

    const titleElement = document.createElement("h2");
    titleElement.textContent = toDo.getTitle();
    titleElement.className = "title";
    toDoElement.appendChild(titleElement);

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = `${toDo.getDueDate()}`;
    dueDateElement.className = "duedate";
    toDoElement.appendChild(dueDateElement);

    const priorityElement = document.createElement("p");
    priorityElement.textContent = `${toDo.getPriority()}`;
    priorityElement.className = "priority";
    toDoElement.appendChild(priorityElement);

    const removeButtonElement = document.createElement("button");
    removeButtonElement.textContent = "Remove";
    removeButtonElement.addEventListener("click", () => {
      toDoLists[index].removeToDo(index2);
      renderToDoList(index);
    });
    removeButtonElement.className = "removetodo";
    toDoElement.appendChild(removeButtonElement);

    const notesElement = document.createElement("p");
    notesElement.textContent = `${toDo.getNotes()}`;
    notesElement.className = "notes";
    toDoElement.appendChild(notesElement);

    toDoListElement.appendChild(toDoElement);
  });
}

// Check session storage for existing ToDoLists
const toDoLists = [];
const storedToDoLists = JSON.parse(localStorage.getItem("toDoLists"));
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
  const sideBarItem = document.createElement("h2");
  sideBarItem.textContent = toDoList.getName();
  sideBarItem.className = "listname";
  sideBarItem.addEventListener("click", () => {
    const lists = document.querySelectorAll(".listname");
    lists.forEach((list) => {
      list.classList.remove("selected");
    });
    sideBarItem.classList.add("selected");
    renderToDoList(index);
  });
  sideBar.appendChild(sideBarItem);
});

const lessthenBtn = document.createElement("img");
lessthenBtn.src = lessthan;
lessthenBtn.id = "lessthan";
lessthenBtn.addEventListener("click", () => {
  const sideBar = document.getElementById("sidebar");
  sideBar.classList.toggle("hidden");
  toggleImg();
});
const header = document.getElementById("header");
header.appendChild(lessthenBtn);

function toggleImg() {
  const img = document.getElementById("lessthan");
  if (img.src === lessthan) {
    img.src = burger;
  } else {
    img.src = lessthan;
  }
}

renderToDoList(0);

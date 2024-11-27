import {
  ToDo,
  ToDoList,
  createDefaultToDoList,
  createDefaultTodo,
} from "../models/todo";
import lessthan from "../../assets/lessthan.svg";
import burger from "../../assets/burger.svg";

export class ToDoListsView {
  constructor() {
    // get todolists from local storage if they exist
    this.toDoLists = getToDoListsFromStorage();

    this.container = document.getElementById("container");
    this.sidebar = document.getElementById("sidebar");
    this.content = document.getElementById("content");
    this.header = document.getElementById("header");
    this.list = document.getElementById("list");
    this.toDoList = document.getElementById("toDoList");
    this.add = document.getElementById("add");
    this._renderList(0);
    this._renderSidebar();
    this._renderHeader();
  }

  _renderList(index) {
    this.toDoList.innerHTML = ""; // Clear the list
    this.add.innerHTML = ""; // Clear the add button

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add ToDo";
    addBtn.addEventListener("click", () => {
      this.toDoLists[index].addToDo(createDefaultTodo());
      saveToDoListsToStorage(this.toDoLists);
      this._renderList(index);
    });
    addBtn.className = "addBtn";
    this.add.appendChild(addBtn);

    this.toDoLists[index].getToDoList().forEach((toDo, index2) => {
      const toDoElement = document.createElement("div");
      toDoElement.className = "toDoListItem";

      const checkboxElement = document.createElement("input");
      checkboxElement.type = "checkbox";
      checkboxElement.checked = toDo.getChecked();
      checkboxElement.addEventListener("change", () => {
        toDo.setChecked(!toDo.getChecked());
        saveToDoListsToStorage(this.toDoLists);
        this._renderList(index);
      });
      checkboxElement.className = "checked";
      toDoElement.appendChild(checkboxElement);

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
        this.toDoLists[index].removeToDo(index2);
        saveToDoListsToStorage(this.toDoLists);
        this._renderList(index);
      });
      removeButtonElement.className = "removetodo";
      toDoElement.appendChild(removeButtonElement);

      const notesElement = document.createElement("p");
      notesElement.textContent = `${toDo.getNotes()}`;
      notesElement.className = "notes";
      toDoElement.appendChild(notesElement);

      this.toDoList.appendChild(toDoElement);
    });
  }
  _renderHeader() {
    const lessthenBtn = document.createElement("img");
    lessthenBtn.src = lessthan;
    lessthenBtn.id = "lessthan";
    lessthenBtn.addEventListener("click", () => {
      this.sidebar.classList.toggle("hidden");
      toggleImg();
    });
    const imgDiv = document.createElement("div");
    imgDiv.id = "imgDiv";
    imgDiv.appendChild(lessthenBtn);
    this.header.appendChild(imgDiv);
    this.header.appendChild(imgDiv);
  }
  _renderSidebar() {
    const appTitle = document.createElement("h1");
    appTitle.textContent = "To Do List";
    appTitle.id = "apptitle";
    this.sidebar.appendChild(appTitle);
    this.toDoLists.forEach((toDoList, index) => {
      const sideBarItem = document.createElement("h2");
      sideBarItem.textContent = toDoList.getName();
      sideBarItem.className = "listname";
      if (index == 0) {
        sideBarItem.classList.add("selected");
      }
      sideBarItem.addEventListener("click", () => {
        const lists = document.querySelectorAll(".listname");
        lists.forEach((list) => {
          list.classList.remove("selected");
        });
        sideBarItem.classList.add("selected");
        this._renderList(index);
      });
      this.sidebar.appendChild(sideBarItem);
    });
  }
}

function getToDoListsFromStorage() {
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
    toDoLists[0].setName("To Do List 1");
  }
  return toDoLists;
}

function saveToDoListsToStorage(toDoLists) {
  const toDoListsJSON = JSON.stringify(toDoLists);
  localStorage.setItem("toDoLists", toDoListsJSON);
}

function toggleImg() {
  const img = document.getElementById("lessthan");
  if (img.src === lessthan) {
    img.src = burger;
  } else {
    img.src = lessthan;
  }
}

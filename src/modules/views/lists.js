import {
  ToDo,
  ToDoList,
  createDefaultToDoList,
  createDefaultTodo,
} from "../models/todo";
import lessthan from "../../assets/lessthan.svg";
import burger from "../../assets/burger.svg";
import edit from "../../assets/edit.svg";
import expand from "../../assets/expand.svg";
import calendar from "../../assets/calendar.svg";

export default class ToDoListsView {
  constructor() {
    // get todolists from local storage if they exist
    this.toDoLists = getToDoListsFromStorage();

    this.container = document.getElementById("container");
    this.sidebar = document.getElementById("sidebar");
    this.content = document.getElementById("content");
    this.header = document.getElementById("header");
    this.title = document.getElementById("title");
    this.list = document.getElementById("list");
    this.toDoList = document.getElementById("toDoList");
    this.add = document.getElementById("add");
    this._renderList(0);
    this._renderSidebar(0);
    this._renderHeader();
  }

  _renderList(index) {
    this.toDoList.innerHTML = ""; // Clear the list
    this.add.innerHTML = ""; // Clear the add button
    this.title.innerHTML = ""; // Clear the title

    const listTitle = document.createElement("h1");
    listTitle.textContent = this.toDoLists[index].getName();
    listTitle.contentEditable = true;
    listTitle.spellcheck = false;
    listTitle.addEventListener("input", () => {
      if (listTitle.textContent === "") {
        listTitle.textContent = "List Title";
      }
      this.toDoLists[index].setName(listTitle.textContent);
      saveToDoListsToStorage(this.toDoLists);
      this._renderSidebar(index);
    });
    this.title.appendChild(listTitle);

    const removeListBtn = document.createElement("button");
    removeListBtn.textContent = "Remove List";
    removeListBtn.className = "removeListBtn";
    removeListBtn.addEventListener("click", () => {
      this.toDoLists.splice(index, 1);
      saveToDoListsToStorage(this.toDoLists);
      this._renderSidebar(0);
      this._renderList(0);
    });
    this.title.appendChild(removeListBtn);

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
      const toDoHeaderElement = document.createElement("div");
      toDoHeaderElement.className = "toDoListItemHeader";

      const checkboxElement = document.createElement("input");
      checkboxElement.type = "checkbox";
      checkboxElement.checked = toDo.getChecked();
      checkboxElement.addEventListener("change", () => {
        toDo.setChecked(!toDo.getChecked());
        saveToDoListsToStorage(this.toDoLists);
      });
      checkboxElement.className = "checked";
      toDoHeaderElement.appendChild(checkboxElement);

      const titleElement = document.createElement("h2");
      titleElement.textContent = toDo.getTitle();
      titleElement.className = "title";
      titleElement.contentEditable = true;
      titleElement.spellcheck = false;
      titleElement.addEventListener("input", () => {
        if (titleElement.textContent === "") {
          titleElement.textContent = "Title";
        }
        toDo.setTitle(titleElement.textContent);
        saveToDoListsToStorage(this.toDoLists);
      });
      toDoHeaderElement.appendChild(titleElement);

      const dueDateElement = document.createElement("div");
      const dueDateText = document.createElement("p");
      dueDateText.textContent = `${toDo.getDueDate()}`;
      dueDateElement.className = "duedate";
      const dueDateImg = document.createElement("img");
      dueDateImg.src = calendar;
      dueDateElement.appendChild(dueDateImg);
      dueDateElement.appendChild(dueDateText);
      toDoHeaderElement.appendChild(dueDateElement);

      const priorityElement = document.createElement("p");
      priorityElement.textContent = `${toDo.getPriority()}`;
      priorityElement.className = "priority";
      toDoHeaderElement.appendChild(priorityElement);

      const expandContainer = document.createElement("div");
      const notesElement = document.createElement("p");
      notesElement.className = "notes";
      notesElement.textContent = `${toDo.getNotes()}`;
      notesElement.contentEditable = true;
      notesElement.spellcheck = false;
      notesElement.addEventListener("input", () => {
        if (notesElement.textContent === "") {
          notesElement.textContent = "Add a note";
        }
        toDo.setNotes(notesElement.textContent);
        saveToDoListsToStorage(this.toDoLists);
      });
      expandContainer.appendChild(notesElement);

      const removeButtonElement = document.createElement("button");
      removeButtonElement.textContent = "Remove";
      removeButtonElement.addEventListener("click", () => {
        this.toDoLists[index].removeToDo(index2);
        saveToDoListsToStorage(this.toDoLists);
        this._renderList(index);
      });
      removeButtonElement.className = "removetodo";
      removeButtonElement.classList.toggle("hidden");
      expandContainer.appendChild(removeButtonElement);

      // expand notes, toggle visibility of edit and remove
      const expandElement = document.createElement("img");
      expandElement.className = "expand";
      expandElement.src = expand;
      expandElement.addEventListener("click", () => {
        toDoElement.classList.toggle("expanded");
        expandElement.classList.toggle("expanded");
        notesElement.classList.toggle("expanded");
        removeButtonElement.classList.toggle("hidden");
      });
      toDoHeaderElement.appendChild(expandElement);

      toDoElement.appendChild(toDoHeaderElement);
      toDoElement.appendChild(expandContainer);

      this.toDoList.appendChild(toDoElement);
    });
  }
  _renderHeader() {
    this.header.innerHTML = "";
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
  _renderSidebar(listIndex) {
    this.sidebar.innerHTML = "";
    const appTitle = document.createElement("h1");
    appTitle.textContent = "To Do List";
    appTitle.id = "apptitle";
    this.sidebar.appendChild(appTitle);
    this.toDoLists.forEach((toDoList, index) => {
      const sideBarItem = document.createElement("div");
      const sideBarTitle = document.createElement("h2");
      sideBarTitle.textContent = toDoList.getName();
      sideBarItem.className = "listname";
      sideBarItem.appendChild(sideBarTitle);
      if (index == listIndex) {
        sideBarItem.classList.add("selected");
      }
      sideBarItem.addEventListener("click", () => {
        this._renderSidebar(index);
        this._renderList(index);
      });
      this.sidebar.appendChild(sideBarItem);
    });

    const addListBtn = document.createElement("button");
    addListBtn.textContent = "Add List";
    addListBtn.className = "addListBtn";
    addListBtn.addEventListener("click", () => {
      const newList = createDefaultToDoList();
      this.toDoLists.push(newList);
      saveToDoListsToStorage(this.toDoLists);
      this._renderSidebar(this.toDoLists.length - 1);
      this._renderList(this.toDoLists.length - 1);
    });
    this.sidebar.appendChild(addListBtn);
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

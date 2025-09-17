const { createElement } = require("react");

function update() {
  const val = document.getElementById("inputval");
  const data = val.value;
  const yo = document.createElement("div");

  yo.innerHTML = data;
  yo.id = "uniqueDiv";
  yo.className = "yoyo";
  yo.style.backgroundColor = "white";
  yo.style.height = "50px";
  yo.style.borderRadius = "20px";
  yo.style.width = "550px";
  yo.style.margin = " 20px auto";
  yo.style.alignItems = "center";
  yo.style.display = "flex";
  yo.style.justifyContent = "space-between";
  yo.style.fontSize = "20px";
  yo.style.fontFamily = "'Virgil', Arial, sans-serif";

  // Generate unique ID using random

  const uniqueId = "check-" + Math.random().toString(36).substr(2, 9);

  yo.innerHTML = `
      <span style="flex: 1; padding-left: 20px; font-family: 'Virgil', Arial, sans-serif;">${data}</span>     
            
            <button class="btn edit-btn" title="Edit" onclick="editAction(this)">
                <svg class="edit-icon" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
            </button>     

            <button class="btn delete-btn" title="Delete" onclick="deleteAction(this)">
                <svg class="delete-icon" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>
            
         <div class="checkbox-wrapper">

         <input check="${uniqueId}" type="checkbox" class="check" id="${uniqueId}" onclick="under(this)" />
            <label for="${uniqueId}" class="label">
                <svg width="45" height="45" viewBox="0 0 95 95">
                <rect x="30" y="20" width="50" height="50" stroke="black" fill="none"></rect><g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"stroke="black"stroke-width="3"fill="none"class="path1"> 
                </path></g></svg></label>

            </div>   
            
        `;
  const contentContainer = document.querySelector(".content");
  contentContainer.appendChild(yo);
}
function under(checkbox) {
  const todoItem = checkbox.closest('div[style*="background-color: white"]');
  const textSpan = todoItem.querySelector("span");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      textSpan.style.textDecoration = "line-through";
      textSpan.style.opacity = "0.6";
      todoItem.style.backgroundColor = "#f0f0f0";
      const editBtn = todoItem.querySelector(".btn.edit-btn");
      editBtn.style.display = "none";
    } else {
      const editBtn = todoItem.querySelector(".btn.edit-btn");
      textSpan.style.textDecoration = "none";
      textSpan.style.opacity = "1";
      todoItem.style.backgroundColor = "white";
      editBtn.style.display = "block";
    }
  });
}
function deleteAction(button) {
  const todoItem = button.closest("div");
  todoItem.remove();
}
function editAction(button) {
  const todoItem = button.closest(".yoyo");
  const textSpan = todoItem.querySelector("span");
  const currentText = textSpan.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.style.flex = "1";
  input.style.marginLeft = "20px";
  input.style.fontSize = "20px";
  input.style.fontFamily = "'Virgil', Arial, sans-serif";
  input.style.border = "2px solid #007bff";
  input.style.borderRadius = "5px";
  input.style.padding = "5px";
  input.style.outline = "none";

  textSpan.replaceWith(input);
  input.focus();
  input.select();

  function saveEdit() {
    const newText = input.value.trim();
    if (newText) {
      const newSpan = document.createElement("span");
      newSpan.style.flex = "1";
      newSpan.style.paddingLeft = "20px";
      newSpan.style.fontFamily = "'Virgil', Arial, sans-serif";
      newSpan.textContent = newText;
      input.replaceWith(newSpan);
    } else {
      const newSpan = document.createElement("span");
      newSpan.style.flex = "1";
      newSpan.style.paddingLeft = "20px";
      newSpan.style.fontFamily = "'Virgil', Arial, sans-serif";
      newSpan.textContent = currentText;
      input.replaceWith(newSpan);
    }
  }
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  });
  
  input.addEventListener("blur", saveEdit);
}

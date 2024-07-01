const field = document.querySelector("#field");
const button = document.querySelector("button");
const wrapper = document.querySelector("#todo-wrapper");

function createItem(value, id) {
  return `
          <div class="item">
                    <div class="left">
                         <input type="checkbox" name="" id="">
                         <p>${value}</p>
                    </div>

                    <div class="right">
                         <button>
                              <i class="fa-regular fa-pen-to-square"></i>
                              <span>Edit</span>
                         </button>

                         <button data-id="${id}" class="delete_item">
                              <i class="fa-solid fa-trash-can"></i>
                              <span>Del</span>
                         </button>

                    </div>
               </div>
     `;
}

function saveElement(value) {
  const todo = {
    name: value,
    status: "active",
    id: Date.now(),
  };

  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }

  data.push(todo);
  localStorage.setItem("todos", JSON.stringify(data));

  const item = createItem(todo.value, todo.id);
  wrapper.innerHTML += item;
}

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const todo = field.value;

    if (todo.length < 5) {
      alert("Eng kamida 6 ta belgidan iborat bo'lishi kerak");
      field.focus();
      field.style.outlineColor = "red";
      return false;
    }

    saveElement(field.value);
    field.value = "";
    field.focus();
  });

document.addEventListener("DOMContentLoaded", function () {
  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }

  if (data.length > 0) {
    data.forEach((value) => {
      const item = createItem(value.name, value.id);
      wrapper.innerHTML += item;
    });
  }

  const deleteButtons = this.querySelectorAll(".delete_item");
  deleteButtons.length > 0 &&
    deleteButtons.forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        let isDelete = confirm("rostdan ham o'chirmoqchimisiz?");

        if (isDelete) {
          let deleteId = this.getAttribute("data-id");
          let copied = JSON.parse(JSON.stringify(data));

          copied = copied.filter(function (el) {
            return el.id != deleteId;
          });

          localStorage.setItem("todos", JSON.stringify(copied));
          window.location.reload();
        }
      });
    });
});
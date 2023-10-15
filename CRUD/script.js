document.getElementById("addTodo").addEventListener("click", async function () {
  const input = document.getElementById("todoText");
  const title = input.value;

  if (title) {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, complated: false }),
      });
      const todo = await res.json();
      render(todo);
      input.value = "";
    } catch (error) {
      console.log(error.message);
    }
  }
});

window.addEventListener("DOMContentLoaded", getAllTodo());

async function getAllTodo() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    const todos = await res.json();
    console.log(todos);
    todos.forEach((todo) => render(todo));
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data) {
      document.getElementById(`todo${id}`).remove();
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function toggleComplateTodo(id) {
  const complated = document.querySelector(`#todo${id} input`).checked;

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complated }),
      }
    );
    const data = await res.json();
  } catch (error) {}
}

function render({ id, title, complated }) {
  const todos = document.getElementById("todos");
  todos.insertAdjacentHTML(
    "beforeend",
    `
            <div class="form-check">
                <label id="todo${id}" class="form-check-label" ">
                <input  onchange="toggleComplateTodo(${id})" type="checkbox" ${
      complated && "checked"
    }/>
                ${title}
                <button onclick="deleteTodo(${id})" class="close-btn">X</button>
                </label>
            </div>
        `
  );
}

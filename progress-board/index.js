import Kanban from "./kanban.js";

const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const completed = document.querySelector(".cards.completed");

const taskbox = [todo, pending, completed];

function addTaskCard(task, index) {
    const colIndex = Number(index);
    if (!taskbox[colIndex]) return;

    const element = document.createElement("form");
    element.className = "card";
    element.draggable = true;
    element.dataset.id = task.taskId;
    element.innerHTML = `
        <input value="${task.content}" type="text" name="task" autocomplete="off" disabled="disabled">
        <div>
            <span class="task-id">#${task.taskId}</span>
            <span>
                <button type="button" class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                <button type="button" class="bi bi-check-lg update hide" data-id="${task.taskId}" data-column="${colIndex}"></button>
                <button type="button" class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
            </span>
        </div>
    `;
    taskbox[colIndex].appendChild(element);
}

// Initial render of existing tasks
Kanban.getAllTasks().forEach((tasks, index) => {
    tasks.forEach(task => {
        addTaskCard(task, index);
    });
});

// Adding new tasks
const addForms = document.querySelectorAll(".add");
addForms.forEach((form, index) => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        const input = form.querySelector("input[name='task']");
        const content = input.value.trim();

        if (content !== "") {
            const task = Kanban.insertTask(index, content);
            addTaskCard(task, index);
            form.reset();
        }
    });
});

taskbox.forEach(column => {
    column.addEventListener("click", event => {
        const btn = event.target.closest("button");
        if (!btn) return;

        event.preventDefault();
        const card = btn.closest(".card");
        const formInput = card.querySelector("input[name='task']");

        if (btn.classList.contains("edit")) {
            formInput.removeAttribute("disabled");
            formInput.focus();
            btn.classList.add("hide");
            card.querySelector(".update").classList.remove("hide");
        }

        if (btn.classList.contains("update")) {
            formInput.setAttribute("disabled", "disabled");
            btn.classList.add("hide");
            card.querySelector(".edit").classList.remove("hide");

            const taskId = btn.dataset.id;
            const columnId = btn.dataset.column;
            const content = formInput.value;

            Kanban.updateTask(taskId, {
                columnId: columnId,
                content: content
            });
        }

        if (btn.classList.contains("delete")) {
            card.remove();
            Kanban.deleteTask(btn.dataset.id);
        }
    });

    // Drag & Drop
    column.addEventListener("dragstart", event => {
        if (event.target.classList.contains("card")) {
            event.target.classList.add("dragging");
        }
    });

    column.addEventListener("dragover", event => {
        event.preventDefault();
        const card = document.querySelector(".dragging");
        if (card) {
            column.appendChild(card);
        }
    });

    column.addEventListener("dragend", event => {
        if (event.target.classList.contains("card")) {
            event.target.classList.remove("dragging");

            const taskId = event.target.dataset.id;
            const columnId = event.target.parentElement.dataset.id;
            const content = event.target.querySelector("input[name='task']").value;

            Kanban.updateTask(taskId, {
                columnId: columnId,
                content: content
            });
        }
    });
});
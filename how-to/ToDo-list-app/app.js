const btnAdd = document.querySelector("#btn-add");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector("#count-value"); // Corrección del selector
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);

        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="task-name">${taskName}</span>
        <button class="edit">
            <img src="icons/edit.svg">
        </button>
        <button class="delete">
            <img src="icons/trash.svg">
        </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        }
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;

            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }

            const taskText = targetElement.previousElementSibling?.innerText;
            if (taskText) {
                newTaskInput.value = taskText;
            }
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        }
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.addEventListener('change', () => {
            checkBox.nextElementSibling.classList.toggle("completed");

            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }

            displayCount(taskCount);
        });
    });

    taskCount += 1;
    displayCount(taskCount);

    newTaskInput.value = "";
}

btnAdd.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
    tasksContainer.innerHTML = ""; // Eliminar tareas previamente creadas
}

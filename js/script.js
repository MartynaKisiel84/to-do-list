{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, { content: newTaskContent }
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = tasks.filter((task, taskIndex) => taskIndex !== index);
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) =>
            taskIndex === index ? { ...task, done: !task.done } : task
        );
        render();
    };

    const markAllTasksDone = (index) =>
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");
        
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
               <li class="tasks__item js-task"
               >
                    <button class="tasks__button 
            tasks__button--done js-done">
                   ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${        
            task.done ? " tasks__content--done" : ""}">
                   ${task.content}
                   </span>
                <button class="tasks__button 
            tasks__button--remove js-remove">
                 🗑
                </button>
               </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };
    const onFormSubmit =  (event) => {
        event.preventDefault();
        const newTaskItem = document.querySelector(".js-newTask");
        const newTaskContent = newTaskItem.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskItem.value = "";
        }
    };
    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const rescheduleModal = document.getElementById('rescheduleModal');
    const closeModalBtn = document.querySelector('.closeBtn');
    const newDeadlineInput = document.getElementById('newDeadlineInput');
    const updateDeadlineBtn = document.getElementById('updateDeadlineBtn');
    const cancelRescheduleBtn = document.getElementById('cancelRescheduleBtn');

    let tasks = [];
    let rescheduleTaskIndex = null;

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const category = categoryInput.value;
        const deadline = deadlineInput.value;

        if (taskText && deadline) {
            const task = {
                text: taskText,
                category,
                deadline,
                completed: false
            };
            tasks.push(task);
            taskInput.value = '';
            categoryInput.value = 'general';
            deadlineInput.value = '';
            renderTasks();
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.category);
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const taskDetails = document.createElement('div');
            taskDetails.classList.add('task-details');

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            taskDetails.appendChild(taskText);

            const taskInfo = document.createElement('div');
            taskInfo.classList.add('task-info');

            const deadline = document.createElement('span');
            deadline.textContent = `Due: ${new Date(task.deadline).toLocaleString()}`;

            taskInfo.appendChild(deadline);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('removeBtn');
            removeBtn.addEventListener('click', () => removeTask(index));

            const rescheduleBtn = document.createElement('button');
            rescheduleBtn.textContent = 'Reschedule';
            rescheduleBtn.classList.add('rescheduleBtn');
            rescheduleBtn.addEventListener('click', () => openRescheduleModal(index));

            taskItem.appendChild(taskDetails);
            taskItem.appendChild(taskInfo);
            taskItem.appendChild(rescheduleBtn);
            taskItem.appendChild(removeBtn);
            taskList.appendChild(taskItem);
        });
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function openRescheduleModal(index) {
        rescheduleTaskIndex = index;
        rescheduleModal.style.display = 'flex';
    }

    function closeRescheduleModal() {
        rescheduleTaskIndex = null;
        rescheduleModal.style.display = 'none';
    }

    function updateDeadline() {
        const newDeadline = newDeadlineInput.value;
        if (newDeadline && rescheduleTaskIndex !== null) {
            tasks[rescheduleTaskIndex].deadline = newDeadline;
            rescheduleTaskIndex = null;
            newDeadlineInput.value = '';
            closeRescheduleModal();
            renderTasks();
        }
    }

    closeModalBtn.addEventListener('click', closeRescheduleModal);
    cancelRescheduleBtn.addEventListener('click', closeRescheduleModal);
    updateDeadlineBtn.addEventListener('click', updateDeadline);

    renderTasks();
});

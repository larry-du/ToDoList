const allTaskData = JSON.parse(localStorage.getItem('taskData')) || [];

function createTaskToLocalStorage(taskInfo) {
    const taskData = {
        title: taskInfo.title,
        date: taskInfo.date,
        time: taskInfo.time,
        comment: taskInfo.comment,
        id: $.now(),
        isEdit: false,
        isStar: false,
        isComplete: false
    }

    allTaskData.push(taskData);
    localStorage.setItem('taskData', JSON.stringify(allTaskData));
    // return taskData
}

export { createTaskToLocalStorage, allTaskData };
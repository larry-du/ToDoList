const allTaskData = JSON.parse(localStorage.getItem('allMessage')) || [];

function createTaskToLocalStorage(taskInfo) {
    const allMessage = {
        title: taskInfo.title,
        date: taskInfo.date,
        time: taskInfo.time,
        comment: taskInfo.comment,
        id: Date.now(),
        isEdit: false,
        isStar: false,
        isComplete: false
    }
    
    allTaskData.push(allMessage);
    localStorage.setItem('allMessage', JSON.stringify(allTaskData));
    // return allMessage
}

export { createTaskToLocalStorage, allTaskData };
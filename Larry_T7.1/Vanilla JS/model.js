// function getTaskFromLocalStorage() {
//     return allData;
// }
const allData = JSON.parse(localStorage.getItem('allMessage')) || [];

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
    allData.push(allMessage);
    localStorage.setItem('allMessage', JSON.stringify(allData));
    // return allMessage
}



export { createTaskToLocalStorage, allData };
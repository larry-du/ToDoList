// function getTaskFromLocalStorage() {
//     return allData;
// }
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

// function sortData(filterProgress) {
//     return filterProgress.sort((a, b) => {
//         const scoreA = (a.isStar ? 200 : 0) + (a.isComplete ? -300 : 0)
//         const scoreB = (b.isStar ? 200 : 0) + (b.isComplete ? -300 : 0)
//         return scoreB - scoreA;
//     })
// }

export { createTaskToLocalStorage, allTaskData };
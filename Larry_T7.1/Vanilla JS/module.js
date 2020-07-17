import { createTaskToLocalStorage, allData } from './model.js';
import { creatList, creatEditList } from './template.js';
const addTask = document.querySelector('.add-task');
const addTaskButton = document.querySelector('#add-button');
const listArea = document.querySelector('.to-do-list-area');
// const allData = getTaskFromLocalStorage();

render()

function addNewTask() {
    const addArea = document.querySelector('.add-area');
    const newTask = document.querySelector('.event-add')
    addArea.classList.add('add-area-none');
    newTask.classList.add('event-area-block');
}

function addTaskData() {
    const addArea = document.querySelector('.add-area');
    const newTask = document.querySelector('.event-add');
    const title = document.querySelector('.event .type-title');
    // console.log(title)
    const date = document.querySelector('.event input[type="date"]');
    // console.log(date)
    const time = document.querySelector('.event input[type="time"]');
    // console.log(time)
    const comment = document.querySelector('.event .comment-area');
    // console.log(comment)
    const taskInfo = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value
    }
    createTaskToLocalStorage(taskInfo)

    render()

    title.value = '';
    date.value = '';
    time.value = '';
    comment.value = '';

    addArea.classList.remove('add-area-none');
    newTask.classList.remove('event-area-block');
}

// function creatList(data) {
//     return `
// <div class="task task-${data.id} container ${data.isEdit ? 'isEdit' : ''} ${data.isStar ? 'high-light' : ''} ${data.complete ? 'complete' : ''}">
//     <div class="card">
//         <div class="card-body">
//             <div class="card-title">
//                 <div class="check-area">
//                     <input type="checkbox"
//                         id="task-check-${data.id}" ${data.complete ? 'checked' : ''}>
//                     <label for="task-check-${data.id}"></label>
//                 </div>
//                 <input class="list-title" value="${data.title}" disabled>
//             </div>
//             <div class="edit-area">
//                 <i class="fas fa-star top-star"></i>
//                 <i class="fal fa-pen edit-pen"></i>
//                 <i class="fal fa-trash-alt trash"></i>
//             </div>
//         </div>
//         <div class="status">
//             <div class="date">
//                 <i class="far fa-calendar-alt"></i>
//                 <span>${data.date}</span>
//             </div>
//             <i class="fal fa-file"></i>
//             <i class="fal fa-comment-dots"></i>
//         </div>
//     </div>
// </div>`
// }

// function creatEditList() {
//     return `<div class="save-info">
//     <div class="save-detail">
//         <div class="deadline">
//             <div class="deadline-icon">
//                 <i class="far fa-calendar-alt fa-fw"></i>
//                 <span>Deadline</span>
//             </div>
//             <div class="date-area">
//                 <input type="date">
//                 <input type="time">
//             </div>
//         </div>

//         <div class="file">
//             <div class="file-icon">
//                 <i class="fal fa-file fa-fw"></i>
//                 <span>file</span>
//             </div>
//             <div class="file-area">
//                 <div class="file-information">
//                     <p>20180514.zip</p>
//                     <p>uploaded yesterday</p>
//                 </div>
//                 <button class="add-file">
//                 </button>
//             </div>

//         </div>

//         <div class="comment">
//             <div class="comment-icon">
//                 <i class="fal fa-comment-dots fa-fw"></i>
//                 <span>comment</span>
//             </div>

//             <textarea class="comment-area"
//                 placeholder="Type your memo here..."></textarea>
//         </div>
//     </div>
//     <div class="check-button">
//     <button  class="cancel">
//         <i class="fal fa-times"></i>
//         Cancel
//     </button>
//     <button class="save">
//         <i class="fal fa-plus"></i>
//         Save
//     </button>
// </div>
// </div>
// `
// }

function render() {
    listArea.innerHTML = allData.map(data => creatList(data)).join('');
    const [...tasks] = document.querySelectorAll('.task');

    const editPage = creatEditList();
    tasks.map(task => task.insertAdjacentHTML('beforeend', editPage))
}

eventBinding(allData)
function eventBinding(allData) {
    // allData
    const task = [];
    allData.map((data, dataIndex) => {
        const dom = document.querySelector(`.task-${allData[dataIndex].id}`)
        // dom.addEventListener()
        // console.log(tasks)
        // console.log(allData)
    })


}
function mounted() {
    render()
    eventBinding()
}





addTask.addEventListener('click', addNewTask);
addTaskButton.addEventListener('click', addTaskData);
// tasks.map(task => {
//     task.addEventListener('click', controller)
// });
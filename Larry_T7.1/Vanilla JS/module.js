import { createTaskToLocalStorage, allData } from './model.js';
import { creatList, creatEditList } from './template.js';
const addTask = document.querySelector('.add-task');
const addTaskButton = document.querySelector('#add-button');
const listArea = document.querySelector('.to-do-list-area');

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

function render() {
    listArea.innerHTML = allData.map(data => creatList(data)).join('');
    const [...tasks] = document.querySelectorAll('.task');

    const editPage = creatEditList();
    tasks.map(task => task.insertAdjacentHTML('beforeend', editPage));
    eventBinding(allData)
}

// eventBinding(allData)
function eventBinding(allData) {
    // console.log(allData)
    allData.map(data => {
        const taskElement = document.querySelector(`.task-${data.id}`)
        taskElement.addEventListener('click', event => {
            taskEventBinding.call(taskElement, event);
        })
    })
}

function taskEventBinding(event) {
    // console.log(e)
    const isStar = event.target.classList.contains('top-star');
    const isEdit = event.target.classList.contains('edit-pen');
    const isDelete = event.target.classList.contains('trash');
    const isSave = event.target.classList.contains('save');
    const isCancel = event.target.classList.contains('cancel');

    if (isStar) {
        this.classList.toggle('high-light')
    }
    if (isEdit) {
        this.classList.toggle('isEdit');
    }
    if (isDelete) {

    }
    if (isSave) {
    }
    if (isCancel) {
        console.log(this)
        const title = this.querySelector('.task .type-title');
        console.log(title)
        const date = this.querySelector('.task input[type="date"]');
        // console.log(date)
        const time = this.querySelector('.task input[type="time"]');
        // console.log(time)
        const comment = this.querySelector('.task .comment-area');
        // console.log(comment)
        // title.value = '';
        // date.value = '';
        // time.value = '';
        // comment.value = '';
        this.classList.remove('isEdit')
    }



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
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
    const date = document.querySelector('.event input[type="date"]');
    const time = document.querySelector('.event input[type="time"]');
    const comment = document.querySelector('.event .comment-area');

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
    eventBinding(allData);
}

function eventBinding(allData) {
    allData.map(data => {
        const taskElement = document.querySelector(`.task-${data.id}`)
        taskElement.addEventListener('click', event => {
            taskEventBinding.call(taskElement, event, allData);
        })
    })
}

function taskEventBinding(event, allData) {
    const isStar = event.target.classList.contains('top-star');
    const isEdit = event.target.classList.contains('edit-pen');
    const isDelete = event.target.classList.contains('trash');
    const isSave = event.target.classList.contains('save');
    const isCancel = event.target.classList.contains('cancel');

    const title = this.querySelector('.list-title');
    const date = this.querySelector('input[type="date"]');
    const time = this.querySelector('input[type="time"]');
    const comment = this.querySelector('.comment-area');

    // const taskClass = this.classList;
    // const classNumber = taskClass[1].slice(5);
    const setNumber = this.dataset.number;
    const dataIndex = allData.findIndex(data => data.id === Number(setNumber));

    if (isStar) {
        console.log(isComplete)
        this.classList.toggle('high-light');
    }
    if (isEdit) {
        title.disabled = !title.disabled;
        title.value = allData[dataIndex].title;
        date.value = allData[dataIndex].date;
        time.value = allData[dataIndex].time;
        comment.value = allData[dataIndex].comment;

        this.classList.toggle('isEdit');
    }
    if (isDelete) {
        allData.splice(dataIndex, 1);
        localStorage.setItem('allMessage', JSON.stringify(allData));
        render();
    }
    if (isSave) {
        const allMessage = {
            title: title.value,
            date: date.value,
            time: time.value,
            comment: comment.value,
            id: allData[dataIndex].id
        }
        allData[dataIndex] = allMessage;
        localStorage.setItem('allMessage', JSON.stringify(allData));
        this?.classList.remove('isEdit');
    }

    if (isCancel) {
        title.value = '';
        date.value = '';
        time.value = '';
        comment.value = '';
        this.classList.remove('isEdit');
        render();
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
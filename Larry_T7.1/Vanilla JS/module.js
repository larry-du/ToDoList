import { createTaskToLocalStorage, allData } from './model.js';
import { creatList, creatEditList } from './template.js';
const addTask = document.querySelector('.add-task');
// const addTaskButton = document.querySelector('#add-button');
const event = document.querySelector('.event')
// console.log(event)
const listArea = document.querySelector('.to-do-list-area');
let currentTask = null;


render(sortData());

function addNewTask() {
    const addArea = document.querySelector('.add-area');
    const newTask = document.querySelector('.event-add');
    addArea.classList.add('add-area-none');
    newTask.classList.add('event-area-block');
}

function addTaskData(event) {
    const addArea = document.querySelector('.add-area');
    const newTask = document.querySelector('.event-add');
    const title = document.querySelector('.event .type-title');
    const date = document.querySelector('.event input[type="date"]');
    const time = document.querySelector('.event input[type="time"]');
    const comment = document.querySelector('.event .comment-area');
    const addTaskButton = document.querySelector('#add-button');
    const cancelButton = document.querySelector('#cancel-button')

    const taskInfo = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value
    }

    if (event.target === addTaskButton) {
        createTaskToLocalStorage(taskInfo);

        render(sortData());

        title.value = '';
        date.value = '';
        time.value = '';
        comment.value = '';

        addArea.classList.remove('add-area-none');
        newTask.classList.remove('event-area-block');
    }

    if (event.target === cancelButton) {
        title.value = '';
        date.value = '';
        time.value = '';
        comment.value = '';

        addArea.classList.remove('add-area-none');
        newTask.classList.remove('event-area-block');
    }

}

function render(sortData) {
    listArea.innerHTML = sortData.map(data => creatList(data)).join('');
    const [...tasks] = document.querySelectorAll('.task');

    const editPage = creatEditList();
    tasks.map(task => task.insertAdjacentHTML('beforeend', editPage));
    editEventBinding(sortData);
}

function editEventBinding(sortData) {
    sortData.map(data => {
        const taskElement = document.querySelector(`.task-${data.id}`)
        taskElement.addEventListener('click', event => {
            taskEditEventBinding.call(taskElement, event);
        })
    })
}

function taskEditEventBinding(event) {
    const isStar = event.target.classList.contains('top-star');
    const isEdit = event.target.classList.contains('edit-pen');
    const isDelete = event.target.classList.contains('trash');
    const isSave = event.target.classList.contains('save');
    const isCancel = event.target.classList.contains('cancel');

    // const label = this.querySelector('label');
    const check = this.querySelector('input[type="checkbox"]');
    const title = this.querySelector('.list-title');
    const date = this.querySelector('input[type="date"]');
    const time = this.querySelector('input[type="time"]');
    const comment = this.querySelector('.comment-area');

    // const taskClass = this.classList;
    // const classNumber = taskClass[1].slice(5);
    const taskNumber = this.dataset.number;
    const dataIndex = allData.findIndex(data => data.id === Number(taskNumber));
    const targetTask = allData[dataIndex];

    if (event.target === check) {
        targetTask.isComplete = !targetTask.isComplete;
        localStorage.setItem('allMessage', JSON.stringify(allData))
        render(sortData());
    }
    if (date.value) {
        // console.log('abc')
    }

    if (isStar) {
        targetTask.isStar = !targetTask.isStar;
        localStorage.setItem('allMessage', JSON.stringify(allData))
        render(sortData());
        // this.classList.toggle('high-light');
    }

    if (isEdit) {
        title.disabled = !title.disabled;
        title.value = targetTask.title;
        date.value = targetTask.date;
        time.value = targetTask.time;
        comment.value = targetTask.comment;

        let preTask = currentTask
        currentTask = targetTask.id;
        this.classList.toggle('isEdit');
        if (preTask && preTask !== currentTask) {
            const preTaskElement = document.querySelector(`[data-number="${preTask}"]`)
            preTaskElement.classList.remove('isEdit');
        }

    }

    if (isDelete) {
        allData.splice(dataIndex, 1);
        localStorage.setItem('allMessage', JSON.stringify(allData));
        render(sortData());
    }

    if (isSave) {
        const allMessage = {
            title: title.value,
            date: date.value,
            time: time.value,
            comment: comment.value,
            id: targetTask.id
        }
        targetTask = allMessage;
        localStorage.setItem('allMessage', JSON.stringify(allData));
        render(sortData());
        // this?.classList.remove('isEdit');
    }

    if (isCancel) {
        title.value = '';
        date.value = '';
        time.value = '';
        comment.value = '';
        this.classList.remove('isEdit');
        render(sortData());
    }
}

function sortData() {
    // console.log(allData)
    const hightLight = allData.filter(data => data.isStar);
    // console.log(hightLight)
    const normal = allData.filter(data => !data.isStar);

    return [...hightLight, ...normal]
}

function mounted() {
    render()
    editEventBinding()
}

addTask.addEventListener('click', addNewTask);
// addTaskButton.addEventListener('click', addTaskData);
event.addEventListener('click', (event) => addTaskData(event))
// tasks.map(task => {
//     task.addEventListener('click', controller)
// });
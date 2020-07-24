import { createTaskToLocalStorage, allTaskData } from './model.js';
import { creatList, creatEditList } from './template.js';
const addTask = document.querySelector('.add-task');
const event = document.querySelector('.event');
const nav = document.querySelector('nav');
const listArea = document.querySelector('.to-do-list-area');
const taskLeft = document.querySelector('.task-left');
let currentTask = null;
let state = 'all';
render(sortData());
taskClassification();

function taskClassification() {
    nav.addEventListener('click', (event) => {
        changeState(event);
        render(sortData())
    });
    // nav.addEventListener('click', event => render(sortData()));
}

function changeState(event) {
    if (event.target.dataset.state === 'all') {
        state = 'all';
    }
    if (event.target.dataset.state === 'in-progress') {
        state = 'progress';
    }
    if (event.target.dataset.state === 'task-completed') {
        state = 'complete';
    }
    console.log(state);
}

function sortInProgress() {
    if (state === 'all') {
        return allTaskData
    }
    if (state === 'progress') {
        return allTaskData.filter(data => !data.isComplete)
    }
    if (state === 'complete') {
        return allTaskData.filter(data => data.isComplete)
    }
}

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
    const cancelButton = document.querySelector('#cancel-button');

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
    // console.log(sortData)
    listArea.innerHTML = sortData.map(data => creatList(data)).join('');
    const [...tasks] = document.querySelectorAll('.task');
    taskLeft.innerText = `${[...tasks].length} tasks left`

    const editPage = creatEditList();
    tasks.map(task => task.insertAdjacentHTML('beforeend', editPage));
    // taskClassification();
    editEventBinding(sortData);
}

function editEventBinding(sortData) {
    sortData.map(data => {
        const taskElement = document.querySelector(`.task-${data.id}`);
        taskElement.addEventListener('click', event => {
            taskEditEventBinding.call(taskElement, event);
        })
        taskElement.addEventListener('dragstart', event => {
            dragTask.call(taskElement, event);
        })
        taskElement.addEventListener('drop', event => {
            putTask.call(taskElement, event)
        });
        taskElement.addEventListener('dragenter', cancelDefault);
        taskElement.addEventListener('dragover', cancelDefault);
    })
}

function dragTask(event) {
    event.dataTransfer.setData('text/plain', this.dataset.number);
}

function putTask(event) {
    let dataNumber = event.dataTransfer.getData('text/plain');
    const dragDom = document.querySelector(`div[data-number="${dataNumber}"]`);
    listArea.insertBefore(dragDom, this);
}

function cancelDefault(e) {
    e.preventDefault();
    // e.stopPropagation();
    // return false
};

function taskEditEventBinding(event) {
    const isStar = event.target.classList.contains('top-star');
    const isEdit = event.target.classList.contains('edit-pen');
    const isDelete = event.target.classList.contains('trash');
    const isSave = event.target.classList.contains('save');
    const isCancel = event.target.classList.contains('cancel');

    const check = this.querySelector('input[type="checkbox"]');
    const title = this.querySelector('.list-title');
    const date = this.querySelector('input[type="date"]');
    const time = this.querySelector('input[type="time"]');
    const comment = this.querySelector('.comment-area');
    // const taskClass = this.classList;
    // const classNumber = taskClass[1].slice(5);
    const taskNumber = this.dataset.number;
    const targetDataIndex = allTaskData.findIndex(data => data.id === Number(taskNumber));
    const targetTask = allTaskData[targetDataIndex];

    if (event.target === check) {
        targetTask.isComplete = !targetTask.isComplete;
        localStorage.setItem('allMessage', JSON.stringify(allTaskData));
        render(sortData());
    }

    if (isStar) {
        targetTask.isStar = !targetTask.isStar;
        localStorage.setItem('allMessage', JSON.stringify(allTaskData));
        render(sortData());
        // this.classList.toggle('high-light');
    }

    if (isEdit) {
        title.disabled = !title.disabled;
        title.value = targetTask.title;
        date.value = targetTask.date;
        time.value = targetTask.time;
        comment.value = targetTask.comment;

        let preTask = currentTask;
        currentTask = targetTask.id;
        this.classList.toggle('isEdit');

        if (preTask && preTask !== currentTask) {
            const preTaskElement = document.querySelector(`[data-number="${preTask}"]`);
            preTaskElement.classList.remove('isEdit');
        }
    }

    if (isDelete) {
        allTaskData.splice(targetDataIndex, 1);
        localStorage.setItem('allMessage', JSON.stringify(allTaskData));
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
        allTaskData[targetDataIndex] = allMessage;
        localStorage.setItem('allMessage', JSON.stringify(allTaskData));
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
    // // console.log(allData)
    // const hightLight = allData.filter(data => data.isStar);
    // // console.log(hightLight)
    // const normal = allData.filter(data => !data.isStar);
    // // const complete = allData.filter(data => data.isComplete)

    // return [...hightLight, ...normal]
    // console.log(allData)
    // let sortData = []
    // allTaskData.map((data, dataIndex) => {
    //     if (data.isStar) {
    //         const isStarTask = allTaskData.slice(dataIndex, dataIndex + 1);
    //         sortData.unshift(...isStarTask);
    //     }
    //     if (!data.isStar && !data.isComplete) {
    //         const isNormal = allTaskData.slice(dataIndex, dataIndex + 1);
    //         sortData.push(...isNormal);
    //     }
    //     if (data.isComplete) {
    //         const isCompleteTask = allTaskData.slice(dataIndex, dataIndex + 1);
    //         sortData.push(...isCompleteTask);
    //     }
    //     // if (data.isStar && data.isComplete) {
    //     //     const isNormal = allTaskData.slice(dataIndex, dataIndex + 1);
    //     //     sortData.push(...isNormal);
    //     // }

    // })
    // console.log(sortData)
    // return sortData

    return sortInProgress().sort((a, b) => {
        const scoreA = (a.isStar ? 200 : 0) + (a.isComplete ? -300 : 0)
        const scoreB = (b.isStar ? 200 : 0) + (b.isComplete ? -300 : 0)
        return scoreB - scoreA;
    })
}

// function mounted() {
//     render()
//     editEventBinding()
// }



addTask.addEventListener('click', addNewTask);

event.addEventListener('click', addTaskData);
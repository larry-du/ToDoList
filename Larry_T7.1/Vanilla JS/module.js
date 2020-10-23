import { createTaskToLocalStorage, allTaskData } from './model.js';
import { createList, createEditList } from './template.js';
const addTask = document.querySelector('.add-task');
const nav = document.querySelector('nav');
const starArea = document.querySelector('.star-area');
const unfinishedArea = document.querySelector('.unfinished-area');
const completeArea = document.querySelector('.complete-area');
const taskLeft = document.querySelector('.task-left');
let currentTask = null;
let state = 'all';
taskClassification();
render(sortData());
newEventBinding();

//分類進行或已完成任務
function taskClassification() {
    nav.addEventListener('click', (event) => {
        changeState(event);
        render(taskStateClassification());
    });
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
}

function taskStateClassification() {
    if (state === 'all') {
        return sortData();
    }
    if (state === 'progress') {
        return {
            top: sortData().top,
            middle: sortData().middle,
            bottom: []
        }
    }
    if (state === 'complete') {
        return {
            top: [],
            middle: [],
            bottom: sortData().bottom
        }
    }
}

//資料排序
function sortData() {
    const top = allTaskData.filter(data => data.isStar && !data.isComplete);
    const middle = allTaskData.filter(data => !data.isStar && !data.isComplete);
    const bottom = allTaskData.filter(data => data.isComplete);
    const getOrder = allTaskData.map(x => x.order).some(x => x !== null)

    if (getOrder) {
        const starSort = top.sort((a, b) => {
            return a.order - b.order;
        })

        const middleSort = middle.sort((a, b) => {
            return a.order - b.order;
        })

        const bottomSort = bottom.sort((a, b) => {
            if (a.isStar === b.isStar) {
                return a.order - b.order;
            }
            if (a.isStar && !b.isStar) {
                return -1;
            }
            if (!a.isStar && b.isStar) {
                return 1;
            }
        })
        return {
            top: [...starSort],
            middle: [...middleSort],
            bottom: [...bottomSort]
        }
    }

    if (!getOrder) {
        const starSort = top.sort((a, b) => {
            return b.id - a.id;
        })

        const middleSort = middle.sort((a, b) => {
            return b.id - a.id;
        })

        const bottomSort = bottom.sort((a, b) => {
            if (a.isStar === b.isStar) {
                return b.id - a.id;
            }
            if (a.isStar && !b.isStar) {
                return -1;
            }
            if (!a.isStar && b.isStar) {
                return 1;
            }
            // a.isStar && !b.isStar ? -1 : 1
        })
        return {
            top: [...starSort],
            middle: [...middleSort],
            bottom: [...bottomSort]
        };
    }
}

//畫面
function openNewTask() {
    const addArea = document.querySelector('.add-area');
    const newTask = document.querySelector('.event-add');
    addArea.classList.add('add-area-none');
    newTask.classList.add('event-area-block');
}

//新任務事件綁定
function newEventBinding() {
    const eventTask = document.querySelector('.event');
    eventTask.addEventListener('click', event => {
        taskNewEventBinding.call(eventTask, event)
    })
}

function taskNewEventBinding(event) {
    const isStar = event.target.classList.contains('top-star');
    const isEdit = event.target.classList.contains('edit-pen');
    const isAddNewTask = event.target.classList.contains('add-button');
    const isCancelTask = event.target.classList.contains('cancel-button');
    const addArea = document.querySelector('.add-area');
    const newTask = document.querySelector('.event-add');
    const title = document.querySelector('.event .type-title');
    const date = document.querySelector('.event input[type="date"]');
    const time = document.querySelector('.event input[type="time"]');
    const comment = document.querySelector('.event .comment-area');
    const check = this.querySelector('input[type="checkbox"]');
    const getStar = this.classList.contains('high-light');
    const done = this.classList.contains('is-complete')

    const taskInfo = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value,
        isStar: false,
        isComplete: false
    }

    if (isStar) {
        this.classList.toggle('high-light');
    }

    if (event.target === check) {
        this.classList.toggle('is-complete');
    }

    if (isEdit) {
        addArea.classList.remove('add-area-none');
        newTask.classList.remove('event-area-block');
    }

    if (isAddNewTask) {

        if (getStar) {
            taskInfo.isStar = true;
        }

        if (done) {
            taskInfo.isComplete = true;
        }

        createTaskToLocalStorage(taskInfo);
        render(sortData());

        clearInputValue();
        check.checked = false;
        // console.log(check.checked = false, check.checked)
        this.classList.remove('high-light');
        this.classList.remove('is-complete');
        addArea.classList.remove('add-area-none');
        newTask.classList.remove('event-area-block');
    }
    if (isCancelTask) {
        clearInputValue();
        check.checked = false;
        this.classList.remove('high-light');
        this.classList.remove('is-complete');
        addArea.classList.remove('add-area-none');
        newTask.classList.remove('event-area-block');
    }

}

function clearInputValue() {
    const title = document.querySelector('.event .type-title');
    const date = document.querySelector('.event input[type="date"]');
    const time = document.querySelector('.event input[type="time"]');
    const comment = document.querySelector('.event .comment-area');
    title.value = '';
    date.value = '';
    time.value = '';
    comment.value = '';
}

//畫面渲染
function render({ top, middle, bottom }) {
    starArea.innerHTML = top.map(data => createList(data)).join('');
    unfinishedArea.innerHTML = middle.map(data => createList(data)).join('');
    completeArea.innerHTML = bottom.map(data => createList(data)).join('');
    const [...tasks] = document.querySelectorAll('.task');
    taskLeft.innerText = `${[...tasks].length} tasks left`

    const editPage = createEditList();
    tasks.map(task => task.insertAdjacentHTML('beforeend', editPage));

    editEventBinding([...top, ...middle, ...bottom]);
}

//編輯任務事件綁定
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
            dropTask.call(taskElement, event);
        });
        taskElement.addEventListener('dragenter', cancelDefault);
        taskElement.addEventListener('dragover', cancelDefault);
    })
}

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
    const taskNumber = this.dataset.number;
    const targetDataIndex = allTaskData.findIndex(data => data.id === Number(taskNumber));
    const targetTask = allTaskData[targetDataIndex];

    if (event.target === check) {
        if (!targetTask.isEdit) {
            targetTask.isComplete = !targetTask.isComplete;
            localStorage.setItem('allMessage', JSON.stringify(allTaskData));
            render(sortData());
        }
    }

    if (isStar) {
        if (targetTask.isEdit) {
            this.classList.toggle('high-light');
        } else {
            targetTask.isStar = !targetTask.isStar;
            localStorage.setItem('allMessage', JSON.stringify(allTaskData));
            render(sortData());
        }
    }

    if (isEdit) {
        title.disabled = !title.disabled;
        title.value = targetTask.title;
        date.value = targetTask.date;
        time.value = targetTask.time;
        comment.value = targetTask.comment;
        targetTask.isEdit = !targetTask.isEdit;

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
            isStar: targetTask.isStar,
            isComplete: targetTask.isComplete,
            id: targetTask.id
        }

        if (this.classList.contains('high-light')) {
            allMessage.isStar = true;
        }

        if (check.checked) {
            allMessage.isComplete = true;
        }

        allTaskData[targetDataIndex] = allMessage;
        localStorage.setItem('allMessage', JSON.stringify(allTaskData));
        render(sortData());
    }

    if (isCancel) {
        clearInputValue();
        this.classList.remove('isEdit');
        render(sortData());
    }
}

//拖曳事件
function dragTask(event) {
    event.dataTransfer.setData('text/plain', this.dataset.number);
}
function dropTask(event) {
    const dataNumber = event.dataTransfer.getData('text/plain');
    const dragDom = document.querySelector(`div[data-number="${dataNumber}"]`);

    if (dragDom.parentElement !== this.parentElement) return

    if (dragDom.nextElementSibling === this) {
        this.parentElement.insertBefore(this, dragDom);
    } else {
        this.parentElement.insertBefore(dragDom, this);
    }
    saveRandomTask();
}

function saveRandomTask() {
    const [...taskDom] = document.querySelectorAll('.task');
    taskDom.filter(done => done.classList.contains('is-complete'))
        .map(star => star.dataset.number)
        .forEach((starNumber, index) => {
            const starIndex = allTaskData.findIndex(data => {
                return data.id === Number(starNumber)
            })
            allTaskData[starIndex].order = index + 1;
        })
    taskDom.filter(done => !done.classList.contains('is-complete'))
        .map(star => star.dataset.number)
        .forEach((starNumber, index) => {
            const starIndex = allTaskData.findIndex(data => {
                return data.id === Number(starNumber)
            })
            allTaskData[starIndex].order = index + 1;
        })
    localStorage.setItem('allMessage', JSON.stringify(allTaskData))
}

function cancelDefault(e) {
    e.preventDefault();
    // e.stopPropagation();
    // return false
};

addTask.addEventListener('click', openNewTask);




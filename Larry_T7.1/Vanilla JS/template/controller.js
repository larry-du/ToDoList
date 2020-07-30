import { createTaskToLocalStorage, allTaskData, sortData } from '../model'
import { taskClassification, addNewTask, addTaskData, render } from '../module'


let state = 'all';

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
    // console.log(state);
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

sortData(sortInProgress())
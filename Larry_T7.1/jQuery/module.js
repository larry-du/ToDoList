// const event = $('.event');
import { createTaskToLocalStorage, allTaskData } from './model.js';
import { createList, createEditList } from './template.js';
let currentTask = null;
render(sortData());

$('.add-area').on('click', openNewTask);

function openNewTask() {
    $('.add-area').addClass('add-area-none');
    $('.event-add').addClass('event-area-block');
}

//事件委派
$('.event').on('click', $('.event'), newEventBinding);

function newEventBinding(e) {
    const isStar = $(e.target).hasClass('top-star');
    const isEdit = $(e.target).hasClass('edit-pen');
    const isCancel = $(e.target).hasClass('cancel-button');
    const isAddNewTask = $(e.target).hasClass('add-button');
    const title = $('.event .type-title')[0];
    const date = $('.event input[type="date"]')[0];
    const time = $('.event input[type="time"]')[0];
    const comment = $('.event .comment-area')[0];
    const check = $('.event input[type="checkbox"]');

    // console.log(title)
    const taskInfo = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value,
        isStar: false,
        isComplete: false
    }

    if (isStar) {
        $(this).toggleClass('high-light');
    }
    if (isEdit) {
        $('.add-area').removeClass('add-area-none');
        $('.event-add').removeClass('event-area-block');
    }
    if ($(e.target)[0] === check[0]) {
        $(this).toggleClass('is-complete');
    }
    if (isCancel) {
        clearNewTaskData();
        removeEventClass();
    }

    if (isAddNewTask) {
        if ($(this).hasClass('high-light')) {
            taskInfo.isStar = true;
        }
        if ($(this).hasClass('is-complete')) {
            taskInfo.isComplete = true;
        }
        createTaskToLocalStorage(taskInfo);
        render(sortData());
        clearNewTaskData();
        removeEventClass();
    }
}

function clearNewTaskData() {
    const title = $('.event .type-title');
    const date = $('.event input[type="date"]');
    const time = $('.event input[type="time"]');
    const comment = $('.event .comment-area');
    const check = $('input[type="checkbox"]')
    title[0].value = '';
    date[0].value = '';
    time[0].value = '';
    comment[0].value = '';
    check[0].checked = false;

}
function removeEventClass() {
    $('.event').removeClass('high-light');
    $('.event').removeClass('is-complete');
    $('.add-area').removeClass('add-area-none');
    $('.event-add').removeClass('event-area-block');
}

function sortData() {
    const top = allTaskData.filter(data => data.isStar && !data.isComplete);
    const middle = allTaskData.filter(data => !data.isStar && !data.isComplete);
    const bottom = allTaskData.filter(data => data.isComplete);

    const starSort = top.sort((a, b) => b.id - a.id);
    const middleSort = middle.sort((a, b) => b.id - a.id)
    const bottomSort = bottom.sort((a, b) => {
        if (a.isStar === b.isStar) {
            return b.id - a.id
        }
        a.isStar && !b.isStar ? -1 : 1;
        // return (a.isStar === b.isStar)
        //     ? (b.id - a.id)
        //     : a.isStar && !b.isStar
        //         ? -1
        //         : 1;
    })

    return {
        top: [...starSort],
        middle: [...middleSort],
        bottom: [...bottomSort]
    }
}

function render({ top, middle, bottom }) {
    $('.star-area').html(
        $.map(top, data => createList(data)).join('')
    );
    $('.unfinished-area').html(
        $.map(middle, data => createList(data)).join('')
    );
    $('.complete-area').html(
        $.map(bottom, data => createList(data)).join('')
    );
    $.map($('.task'), task => {
        // task.insertAdjacentHTML('beforeend', createEditList())
        $(task).append(createEditList());
    });
    $('.task').on('click', $('.task'), newTaskEventBinding);
}

function newTaskEventBinding(e) {
    const isStar = $(e.target).hasClass('top-star');
    const isEdit = $(e.target).hasClass('edit-pen');
    const isCancel = $(e.target).hasClass('cancel');
    const isSave = $(e.target).hasClass('save');
    const isDelete = $(e.target).hasClass('trash');

    const title = $(this).find(`.list-title`);
    const date = $(this).find('input[type="date"]');
    const time = $(this).find('input[type="time"]');
    const comment = $(this).find('.comment-area');

    const taskNumber = this.dataset.number;

    const targetDataIndex = allTaskData.findIndex(data => {
        return data.id === Number(taskNumber)
    });
    const targetTask = allTaskData[targetDataIndex];

    if (isStar) {
        targetTask.isStar = !targetTask.isStar;
        localStorage.setItem('taskData', JSON.stringify(allTaskData));
        render(sortData());
        console.log(targetTask.isStar);
    }

    if (isSave) {
        const taskData = {
            title: title[0].value,
            date: date[0].value,
            time: time[0].value,
            comment: comment[0].value,
            id: targetTask.id
        }
        allTaskData[targetDataIndex] = taskData;
        localStorage.setItem('taskData', JSON.stringify(allTaskData));
        render(sortData());
    }

    if (isEdit) {
        //編輯時 tittle可修改
        title.disabled = !title.disabled
        title.val(targetTask.title)
        date.val(targetTask.date)
        time.val(targetTask.time)
        comment.val(targetTask.comment)
        let preTask = currentTask;
        currentTask = targetTask.id;
        $(this).toggleClass('isEdit');

        if (preTask && preTask !== currentTask) {
            $(`[data-number="${preTask}"]`).removeClass('isEdit')
        }
    }

    if (isDelete) {
        allTaskData.splice(targetDataIndex, 1)
        localStorage.setItem('taskData', JSON.stringify(allTaskData));
        render(sortData());
    }

    if (isCancel) {
        clearEditTaskData();
        $(this).removeClass('isEdit');
        render(sortData());
    }

}

function clearEditTaskData() {
    const title = $(this).find(`.list-title`);
    const date = $(this).find('input[type="date"]');
    const time = $(this).find('input[type="time"]');
    const comment = $(this).find('.comment-area');
    title.val('')
    date.val('')
    time.val('')
    comment.val('')
}


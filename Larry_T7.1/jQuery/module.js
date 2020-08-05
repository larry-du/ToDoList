// const event = $('.event');
import { createTaskToLocalStorage, allTaskData } from './model.js';
import { createList, createEditList } from './template.js';
render(sortData());

$('.add-area').on('click', openNewTask);

function openNewTask() {
    $('.add-area').addClass('add-area-none');
    $('.event-add').addClass('event-area-block');
}

$('.event').on('click', $('.event'), newEventBinding)

function newEventBinding(e) {
    const isStar = $(e.target).hasClass('top-star');
    const isEdit = $(e.target).hasClass('edit-pen');
    const isCancel = $(e.target).hasClass('cancel-button');
    const isAddNewTask = $(e.target).hasClass('add-button');
    const title = $('.event .type-title');
    const date = $('.event input[type="date"]');
    const time = $('.event input[type="time"]');
    const comment = $('.event .comment-area');

    const taskInfo = {
        title: title[0].value,
        date: date[0].value,
        time: time[0].value,
        comment: comment[0].value,
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
    if (isCancel) {
        clearInputValue();
        $('.add-area').removeClass('add-area-none');
        $('.event-add').removeClass('event-area-block');
    }
    if (isAddNewTask) {
        createTaskToLocalStorage(taskInfo);
        render(sortData())
        clearInputValue();
        $('.add-area').removeClass('add-area-none');
        $('.event-add').removeClass('event-area-block');
    }
}

function clearInputValue() {
    const title = $('.event .type-title');
    const date = $('.event input[type="date"]');
    const time = $('.event input[type="time"]');
    const comment = $('.event .comment-area');
    title.value = '';
    date.value = '';
    time.value = '';
    comment.value = '';
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
        a.isStar && b.isStar ? -1 : 1;
    })

    return {
        top: [...starSort],
        middle: [...middleSort],
        bottom: [...bottomSort]
    }

}

function render({ top, middle, bottom }) {
    $('.star-area').html($.map(top, data => createList(data)).join(''));
    $('.unfinished-area').html($.map(middle, data => createList(data)).join(''));
    $('.complete-area').html($.map(bottom, data => createList(data)).join(''));

}
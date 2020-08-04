const event = $('.event');

$('.add-area').on('click', openNewTask);

function openNewTask() {
    $('.add-area').addClass('add-area-none');
    $('.event-add').addClass('event-area-block');
}

$(document).on('click', event, newEventBinding)

function newEventBinding(e) {
    const isStar = $(e.target).hasClass('top-star');
    const isEdit = $(e.target).hasClass('edit-pen');
    const isCancel=$(e.target).hasClass('cancel-button');
    const isAddNewTask=$(e.target).hasClass('add-button');
    
}
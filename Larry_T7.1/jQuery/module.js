// const event = $('.event');

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
    console.log(this)
    if (isStar) {
        $(this).toggleClass('high-light');
    }
    if (isEdit) {
        $('.add-area').removeClass('add-area-none');
        $('.event-add').removeClass('event-area-block');
    }
    if (isCancel) {
        clearInputValue()
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
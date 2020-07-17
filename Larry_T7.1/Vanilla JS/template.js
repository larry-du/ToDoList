function creatList(data) {
    return `
<div class="task task-${data.id} container ${data.isEdit ? 'isEdit' : ''} ${data.isStar ? 'high-light' : ''} ${data.complete ? 'complete' : ''}">
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <div class="check-area">
                    <input type="checkbox"
                        id="task-check-${data.id}" ${data.complete ? 'checked' : ''}>
                    <label for="task-check-${data.id}"></label>
                </div>
                <input class="list-title" value="${data.title}" disabled>
            </div>
            <div class="edit-area">
                <i class="fas fa-star top-star"></i>
                <i class="fal fa-pen edit-pen"></i>
                <i class="fal fa-trash-alt trash"></i>
            </div>
        </div>
        <div class="status">
            <div class="date">
                <i class="far fa-calendar-alt"></i>
                <span>${data.date}</span>
            </div>
            <i class="fal fa-file"></i>
            <i class="fal fa-comment-dots"></i>
        </div>
    </div>
</div>`
}

function creatEditList() {
    return `<div class="save-info">
    <div class="save-detail">
        <div class="deadline">
            <div class="deadline-icon">
                <i class="far fa-calendar-alt fa-fw"></i>
                <span>Deadline</span>
            </div>
            <div class="date-area">
                <input type="date">
                <input type="time">
            </div>
        </div>

        <div class="file">
            <div class="file-icon">
                <i class="fal fa-file fa-fw"></i>
                <span>file</span>
            </div>
            <div class="file-area">
                <div class="file-information">
                    <p>20180514.zip</p>
                    <p>uploaded yesterday</p>
                </div>
                <button class="add-file">
                </button>
            </div>

        </div>

        <div class="comment">
            <div class="comment-icon">
                <i class="fal fa-comment-dots fa-fw"></i>
                <span>comment</span>
            </div>

            <textarea class="comment-area"
                placeholder="Type your memo here..."></textarea>
        </div>
    </div>
    <div class="check-button">
    <button  class="cancel">
        <i class="fal fa-times"></i>
        Cancel
    </button>
    <button class="save">
        <i class="fal fa-plus"></i>
        Save
    </button>
</div>
</div>
`
}

export { creatList, creatEditList }
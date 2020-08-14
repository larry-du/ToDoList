export function creatList(item) {
    return `<div class="task container">
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <div class="check-area">
                    <input type="checkbox"
                        id="task-${item.id}">
                    <label for="task-${item.id}"></label>
                </div>
                <span>${item.title}</span>
            </div>
            <div class="edit-area">
                <i class="fas fa-star important"></i>
                <i class="fal fa-pen"></i>
                <i class="fal fa-trash-alt trash"></i>
            </div>
        </div>
        <div class="status">
            <div class="date">
                <i class="far fa-calendar-alt"></i>
                <span>${item.date}</span>
            </div>
            <i class="fal fa-file"></i>
            <i class="fal fa-comment-dots"></i>
        </div>
    </div>
</div>`
} 
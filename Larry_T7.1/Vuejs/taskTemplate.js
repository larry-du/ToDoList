const template = `<div>
<div v-for="data in toDo" class="task task-${data.id} container" 
:class="{'isEdit':data.isEdit , 'high-light':data.isStar ,'is-complete':data.isComplete}"
data-number="${data.id}" draggable="true">
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <div class="check-area">
                    <input type="checkbox"
                        id="task-check-${data.id}" ${data.isComplete ? 'checked' : ''}>
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
            <i class="fal fa-file file-icon"></i>
            <i class="fal fa-comment-dots comment-icon"></i>
        </div>
    </div>
</div>
</div>`

export default {
    template,
    props: {
        toDo: {
            type: Array,
            required: true,
        }
    }
}
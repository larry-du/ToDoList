const template = `
    <div class="task container"
        :class="{'isEdit': isEdit , 'high-light':task.isStar ,'is-complete':task.isComplete }"
        :key="task.dataId"
        draggable="true">
        <div class="card">
            <div class="card-body">
                <div class="card-title">
                    <div class="check-area">
                        <input type="checkbox"
                            :id="'task-check-' + task.dataId"
                            :checked="task.isComplete">
                        <label :for="'task-check-'+ task.dataId"></label>
                    </div>
                    <input class="list-title"
                        :value="task.title"
                        disabled>
                </div>
                <div class="edit-area">
                    <i class="fas fa-star top-star"
                        @click="highLightButton($event, task)"></i>
                    <i class="fal fa-pen edit-pen"
                    @click="editTaskButton($event, task)"></i>
                    <i class="fal fa-trash-alt trash"></i>
                </div>
            </div>
            <div class="status">
                <div class="date">
                    <i class="far fa-calendar-alt"></i>
                    <span>{{task.date}}</span>
                </div>
                <i class="fal fa-file file-icon"></i>
                <i class="fal fa-comment-dots comment-icon"></i>
            </div>
        </div>
        <div class="save-info" :class="{'save-area-block':task.isEdit}">
        <div class="save-detail">
            <div class="deadline">
                <div class="deadline-icon">
                    <i class="far fa-calendar-alt fa-fw"></i>
                    <span>Deadline</span>
                </div>
                <div class="date-area">
                    <input type="date" :value="task.date">
                    <input type="time" :value="task.time">
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
                    <input class="add-file"
                        type="file">
                </div>

            </div>

            <div class="comment">
                <div class="comment-icon">
                    <i class="fal fa-comment-dots fa-fw"></i>
                    <span>comment</span>
                </div>

                <textarea class="comment-area"
                    placeholder="Type your memo here..."
                    :value="task.comment"></textarea>
            </div>
        </div>
        <div class="check-button">
            <button class="cancel">
                <i class="fal fa-times"></i>
                Cancel
            </button>
            <button class="save">
                <i class="fal fa-plus"></i>
                Save
            </button>
        </div>
    </div>
</div>`

export default {
    template,
    props: {
        task: {
            type: Object,
            required: true
        },
        isEdit: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            current: null
        }
    },
    methods: {
        highLightButton(e, data) {
            data.isStar = !data.isStar;
        },
        editTaskButton(e, data) {
            this.$emit('toggle-edit-task', data.dataId)
        }

    },
    // computed: {
    //     test() {
    //         console.log(111)
    //         return data.dataId === this.current
    //     }
    // }
}
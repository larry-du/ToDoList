const template = `
    <div class="task container"
        :class="{'isEdit': isEdit , 'high-light':task.isStar ,'is-complete':task.isComplete }"

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
                        v-model="currentTaskMessage.title"
                        :disabled="!isEdit">
                </div>
                <div class="edit-area">
                    <i class="fas fa-star top-star"
                        @click="highLightButton($event, task)"></i>
                    <i class="fal fa-pen edit-pen"
                    @click="editTaskButton($event, task)"></i>
                    <i class="fal fa-trash-alt trash"
                    @click="deleteTask(task)"></i>
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
        <div class="save-info" :class="{'save-area-block':isEdit}">
        <div class="save-detail">
            <div class="deadline">
                <div class="deadline-icon">
                    <i class="far fa-calendar-alt fa-fw"></i>
                    <span>Deadline</span>
                </div>
                <div class="date-area">
                    <input type="date" v-model="currentTaskMessage.date">
                    <input type="time" v-model="currentTaskMessage.time">
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
                    v-model="currentTaskMessage.comment"
                    ></textarea>
            </div>
        </div>
        <div class="check-button">
            <button class="cancel"
            @click="closeEditTask(task)">
                <i class="fal fa-times"></i>
                Cancel
            </button>
            <button class="save"
            @click="saveEditTask(task)">
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
            current: null,
            currentTaskMessage: {
                title: this.task.title,
                date: this.task.date,
                time: this.task.time,
                comment: this.task.comment,
                dataId: this.task.dataId,
                isStar: this.task.isStar,
                isComplete: this.task.isComplete,
                isEdit: this.task.isEdit
            },
            preTaskMessage: {}
        }
    },

    methods: {
        initPreTaskMessage() {
            this.preTaskMessage = JSON.parse(JSON.stringify(this.currentTaskMessage))
        },
        highLightButton(e, data) {
            this.$emit('get-star', data.dataId);
        },
        editTaskButton(e, data) {
            // this.initPreTaskMessage();
            this.initPreTaskMessage();
            // this.preTaskMessage = JSON.parse(JSON.stringify(this.currentTaskMessage))
            this.$emit('toggle-edit-task', data.dataId);
        },
        deleteTask(data) {
            this.$emit('task-delete', data.dataId);
        },
        closeEditTask(data) {
            this.currentTaskMessage = this.preTaskMessage;
            this.$emit('task-close', data);
        },
        saveEditTask(data) {
            this.$emit('task-edit-save', this.currentTaskMessage);
        }

    }
    // computed: {
    //     preTaskMessage() {
    //         return {
    //             title: this.task.title,
    //             date: this.task.date,
    //             time: this.task.time,
    //             comment: this.task.comment,
    //             dataId: this.task.dataId,
    //             isStar: this.task.isStar,
    //             isComplete: this.task.isComplete,
    //             isEdit: this.task.isEdit
    //         }
    //     }
    // }
}
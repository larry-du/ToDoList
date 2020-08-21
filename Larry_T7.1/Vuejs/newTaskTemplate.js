const template = `
<div class="event event-add container"
    :class="{'event-area-block':openTask ,'high-light':this.taskData.isStar ,'is-complete': this.taskData.isComplete}"
    >
    <div class="edit">
        <div class="card">
            <div class="card-body">
                <div class="card-title">
                    <div class="check-area">
                        <input type="checkbox"
                            id="event-check"
                            @click="addComplete"
                            class="check">
                        <label for="event-check"></label>
                    </div>

                    <input type="text"
                        placeholder="Type Something Here..."
                        class="type-title"
                        v-bind:value="taskData.title"
                        @input="addTitle">

                </div>
                <div class="edit-area">
                    <i class="fas fa-star top-star"
                    @click="highLight"></i>
                    <i class="fal fa-pen edit-pen" @click="editNewTask"></i>
                </div>
            </div>
        </div>
        <div class="edit-info">
            <div class="deadline">
                <div class="deadline-icon ">
                    <i class="far fa-calendar-alt fa-fw"></i>
                    <span>Deadline</span>
                </div>
                <div class="date-area">
                    <input type="date"
                        class="date"
                        :value="taskData.date"
                        @input="addDate">
                    <input type="time"
                        :value="taskData.time"
                        @input="addTime">
                </div>
            </div>

            <div class="file">
                <div class="file-icon">
                    <i class="fal fa-file fa-fw"></i>
                    <span>file</span>
                </div>
                <div class="file-area">
                    <input type="file"
                        class="add-file">
                </div>
            </div>

            <div class="comment">
                <div class="comment-icon">
                    <i class="fal fa-comment-dots fa-fw"></i>
                    <span>comment</span>
                </div>
                <textarea class="comment-area"
                    placeholder="Type your memo here..."
                    :value="taskData.comment"
                    @input="addComment"></textarea>
            </div>
        </div>
    </div>
    <div class="check-button">
        <button class="cancel-button"
            @click="closeNewTask">
            <i class="fal fa-times"></i>
            Cancel
        </button>
        <button class="add-button"
            @click="saveNewTask">
            <i class="fal fa-plus"></i>
            Add Task
        </button>
    </div>
</div>
`

export default {
    template,
    props: {
        openTask: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            taskData: {
                title: '',
                date: '',
                time: '',
                comment: '',
                dataId: '',
                isStar: false,
                isComplete: false,
                isEdit: false
            },

        }
    },
    methods: {
        editNewTask() {
            this.$emit('change-task-state');
        },
        closeNewTask() {
            this.clearData();
            this.$emit('cancel-new-task');
        },
        addTitle(event) {
            this.taskData.title = event.target.value;
        },
        addDate(event) {
            this.taskData.date = event.target.value;
        },
        addTime(event) {
            this.taskData.time = event.target.value;
        },
        addComment(event) {
            this.taskData.comment = event.target.value;
        },
        saveNewTask() {
            this.taskData.dataId = Date.now();
            this.$emit('change-task-state', this.taskData);
            this.clearData();
        },
        clearData() {
            this.taskData = {
                title: '',
                date: '',
                time: '',
                comment: '',
                dataId: '',
                // isEdit: false,
            };
        },
        highLight() {
            this.taskData.isStar = !this.taskData.isStar;
            if (this.taskData.isStar) {
                this.taskData.isStar = this.taskData.isStar;
            }
        },
        addComplete() {
            this.taskData.isComplete = !this.taskData.isComplete;
            if (this.taskData.isComplete) {
                this.taskData.isComplete = this.taskData.isComplete
            }
        }
    }

}

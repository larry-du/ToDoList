const template = `
    <div class="task container"
        :class="{'isEdit': isEdit , 'high-light':task.isStar ,'is-complete':task.isComplete }"
        draggable="true"
        @dragstart="getDragItem($event)"
        @drop="toDropItem($event)"
        @dragenter.prevent
        @dragover.prevent>
        <div class="card">

        <pre>{{task.isComplete}}</pre>
        
            <div class="card-body">
                <div class="card-title">
                    <div class="check-area">
                        <input type="checkbox"
                            :id="'task-check-' + task.dataId"
                            :checked="task.isComplete"
                            @change="$emit('update-edit:task',{...task, isComplete:!task.isComplete})">
                        <label :for="'task-check-'+ task.dataId"></label>
                    </div>
                    <input class="list-title"
                        :value="task.title"
                        @input="$emit('update-edit:task',{...task, title:$event.target.value})"
                        :disabled="!isEdit">
                </div>
                <div class="edit-area">
                    <i class="fas fa-star top-star"
                        @click="$emit('get-star', task.dataId)"></i>
                    <i class="fal fa-pen edit-pen"
                    @click="editTaskButton(task)"></i>
                    <i class="fal fa-trash-alt trash"
                    @click="$emit('delete-edit-task', task.dataId);"></i>
                </div>
            </div>
            <div class="status">
                <div class="date" v-if="task.date">
                    <i class="far fa-calendar-alt"></i>
                    <span>{{task.date}}</span>
                </div>
                <i class="fal fa-file file-icon" v-if="task.isFileName"></i>
                <i class="fal fa-comment-dots comment-icon" v-if="task.comment"></i>
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
                        type="file"
                        @change="addEditFile(currentTaskMessage,$event)">
                        <span>{{currentTaskMessage.isFileName}}</span>
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
            @click="cancelEditTask(task)">
                <i class="fal fa-times"></i>
                Cancel
            </button>
            <button class="save"
            @click="$emit('save-edit-task', currentTaskMessage)">
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
        taskIndex: {
            type: Number,
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
                // title: this.task.title,
                date: this.task.date,
                time: this.task.time,
                comment: this.task.comment,
                dataId: this.task.dataId,
                isStar: this.task.isStar,
                isComplete: this.task.isComplete,
                isEdit: this.task.isEdit,
                isFileName: this.task.isFileName,
                order: this.task.order
            },
            preTaskMessage: {}
        }
    },

    methods: {
        // test() {
        //     const data = { ...this.task, isComplete: !this.task.isComplete }
        //     this.$emit('update:edit-task',data )
        //     // console.log(">>>>>>>",data);
        // },
        initPreTaskMessage() {
            //儲存畫面一開始資料,使用JSON.parse避免 call by reference問題
            this.preTaskMessage = JSON.parse(JSON.stringify(this.currentTaskMessage));
        },
        editTaskButton(data) {
            this.initPreTaskMessage();
            this.$emit('toggle-edit-task', data.dataId);
        },
        cancelEditTask(data) {
            //如果取消 將畫面一開始資料賦值給currentTask啟動vue更新畫面
            this.currentTaskMessage = this.preTaskMessage;
            this.$emit('cancel-edit-task', data);
        },
        addEditFile(data, event) {
            data.isFileName = event.target.files[0].name
        },
        getDragItem(event) {
            event.dataTransfer.setData('text', this.currentTaskMessage.dataId);
            this.$emit('get-drag-event', event)
        },
        toDropItem(event) {
            const dragId = event.dataTransfer.getData('text');
            this.$emit('to-drop-item', dragId, this.taskIndex, event)
        }
    },
    computed: {
        pre() {
            return {
                title: task.title,
                date: task.date,
                time: task.time,
                comment: task.comment,
                dataId: task.dataId,
                isStar: task.isStar,
                isComplete: task.isComplete,
                isEdit: task.isEdit,
                isFileName: task.isFileName,
                order: task.order
            }
        }
    }
}
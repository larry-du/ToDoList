const template = `
    <div class="task container"
        :class="{'isEdit': task.isEdit , 'high-light':task.isStar ,'is-complete':task.isComplete }"
        draggable="true"
        @dragstart="getDragItem($event)"
        @drop="toDropItem($event)"
        @dragenter.prevent
        @dragover.prevent>
        <div class="card">
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
                        :disabled="!task.isEdit">
                </div>
                <div class="edit-area">
                    <i class="fas fa-star top-star"
                        @click="$emit('update-edit:task', {...task,isStar:!task.isStar})"></i>
                    <i class="fal fa-pen edit-pen"
                    @click="editTaskButton"></i>
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
        <div class="save-info" :class="{'save-area-block':task.isEdit}">
        <div class="save-detail">
            <div class="deadline">
                <div class="deadline-icon">
                    <i class="far fa-calendar-alt fa-fw"></i>
                    <span>Deadline</span>
                </div>
                <div class="date-area">
                    <input type="date" 
                    :value="task.date"
                    @input="$emit('update-edit:task',{...task,date:$event.target.value})">
                    <input type="time" 
                    :value="task.time"
                    @input="$emit('update-edit:task',{...task,time:$event.target.value})">
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
                        @change="$emit('update-edit:task',{...task,isFileName:$event.target.files[0].name})">
                        <span>{{task.isFileName}}</span>
                </div>
            </div>

            <div class="comment">
                <div class="comment-icon">
                    <i class="fal fa-comment-dots fa-fw"></i>
                    <span>comment</span>
                </div>

                <textarea class="comment-area"
                    placeholder="Type your memo here..."
                    :value="task.comment"
                    @input="$emit('update-edit:task',{...task,comment:$event.target.value})"></textarea>
            </div>
        </div>
        <div class="check-button">
            <button class="cancel"
            @click="$emit('cancel-edit',preTaskMessage)">
                <i class="fal fa-times"></i>
                Cancel
            </button>
            <button class="save"
            @click="$emit('save-edit',task)">
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
        // isEdit: {
        //     type: Boolean,
        //     required: true
        // }
    },
    data() {
        return {
            current: null,
            // currentTaskMessage: {
            //     // title: this.task.title,
            //     date: this.task.date,
            //     time: this.task.time,
            //     comment: this.task.comment,
            //     dataId: this.task.dataId,
            //     isStar: this.task.isStar,
            //     isComplete: this.task.isComplete,
            //     isEdit: this.task.isEdit,
            //     isFileName: this.task.isFileName,
            //     order: this.task.order
            // },
            preTaskMessage: {}
        }
    },

    methods: {
        initPreTaskMessage() {
            //儲存畫面一開始資料,使用JSON.parse避免 call by reference問題
            this.preTaskMessage = JSON.parse(JSON.stringify(this.initTask));
        },
        editTaskButton() {
            // console.log(event);
            this.initPreTaskMessage();
            this.$emit('update-edit:task', { ...this.task, isEdit: !this.task.isEdit });
        },
        // cancelEditTask(data) {
        //     //如果取消 將畫面一開始資料賦值給currentTask啟動vue更新畫面
        //     this.currentTaskMessage = this.preTaskMessage;
        //     this.$emit('cancel-edit-task', data);
        // },

        // getDragItem(event) {
        //     event.dataTransfer.setData('text', this.currentTaskMessage.dataId);
        //     this.$emit('get-drag-event', event)
        // },
        // toDropItem(event) {
        //     const dragId = event.dataTransfer.getData('text');
        //     this.$emit('to-drop-item', dragId, this.taskIndex, event)
        // }
    },
    computed: {
        initTask() {
            return {
                title: this.task.title,
                date: this.task.date,
                time: this.task.time,
                comment: this.task.comment,
                dataId: this.task.dataId,
                isStar: this.task.isStar,
                isComplete: this.task.isComplete,
                isEdit: this.task.isEdit,
                isFileName: this.task.isFileName,
                order: this.task.order
            }
        }
    }
}
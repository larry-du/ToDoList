const template = `
<div class="event event-add container"
    :class="{'event-area-block':data.isCreateTask,'high-light':data.isStar ,'is-complete': data.isComplete}">
    <div class="edit">
        <div class="card">
            <div class="card-body">
                <div class="card-title">
                    <div class="check-area">
                        <input type="checkbox"
                            id="event-check"
                            :checked="data.isComplete"
                            @input="$emit('update:task', Object.assign({}, data, { isComplete: !data.isComplete}))"
                            class="check">
                        <label for="event-check"></label>
                    </div>

                    <input type="text"
                        placeholder="Type Something Here..."
                        class="type-title"
                        v-bind:value="data.title"
                        @input="$emit('update:task',Object.assign({},data ,{title:$event.target.value}))">

                </div>
                <div class="edit-area">
                    <i class="fas fa-star top-star"
                        @click="$emit('update:task',Object.assign({},data,{isStar:!data.isStar}))"
                        ></i>
                    <i class="fal fa-pen edit-pen"
                        @click="$emit('update:task',Object.assign({},data,{isEdit:!data.isEdit}))"></i>
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
                        :value="data.date"
                        @input="$emit('update:task',Object.assign({},data,{date:$event.target.value}))">
                    <input type="time"
                        :value="data.time"
                        @input="$emit('update:task',Object.assign({},data,{time:$event.target.value}))">
                </div>
            </div>

            <div class="file">
                <div class="file-icon">
                    <i class="fal fa-file fa-fw"></i>
                    <span>file</span>
                </div>
                <div class="file-area">
                    <input type="file"
                        class="add-file"
                        @change="$emit('update:task',Object.assign({},data,{isFileName:$event.target.files[0].name}))">
                    <span>{{data.isFileName}}</span>
                </div>
            </div>

            <div class="comment">
                <div class="comment-icon">
                    <i class="fal fa-comment-dots fa-fw"></i>
                    <span>comment</span>
                </div>
                <textarea class="comment-area"
                    placeholder="Type your memo here..."
                    :value="data.comment"
                    @input="$emit('update:task',Object.assign({},data,{comment:$event.target.value}))"></textarea>
            </div>
        </div>
    </div>
    <div class="check-button">
        <button class="cancel-button"
            @click="$emit('cancel')">
            <i class="fal fa-times"></i>
            Cancel
        </button>
        <button class="add-button"
            @click="$emit('submit', Object.assign({}, data, { dataId: Date.now() }))">
            <i class="fal fa-plus"></i>
            Add Task
        </button>
    </div>
</div>
`

export default {
    template,
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
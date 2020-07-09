// import { creatList } from './template/creatListTemplate.js'

// console.log(creatList)
//取得編輯頁面元素
const eventAdd = document.querySelector('.event-add');
//取得增加任務按鈕元素
const addArea = document.querySelector('.add-area');
const editSaveArea = document.querySelector('.save-area');
// console.log(editSaveArea)
//取得增加任務元素
const addTask = document.querySelector('.add-task');
const addButton = document.querySelector('#add');
const addSchedule = document.querySelector('.add-schedule');
const saveButton = document.querySelector('#save-button');
//取得localStorage資料,如無資料會是空陣列
let items = JSON.parse(localStorage.getItem('items')) || [];

//畫面渲染
render();

//開啟與關閉增加任務
function toggleAddTaskArea(e) {
    // console.log(e.target)
    if (eventAdd.matches('.event-area-block')) {
        eventAdd.classList.remove('event-area-block');
        return
    };
    addArea.classList.add('add-area-none');
    eventAdd.classList.add('event-area-block');
}

function addTaskList(e) {
    //取得編輯頁面標題元素
    const title = document.querySelector('.type-tittle');
    // console.log(title.value)
    //取得日期元素
    const date = document.querySelector('.edit-info input[type="date"]');
    // console.log(date)
    //取得時間元素
    const time = document.querySelector('.edit-info input[type="time"]');
    //取得留言內容元素
    const comment = document.querySelector('.edit-info .comment-area');
    //存資料
    const allMessage = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value,
        id: Date.now()
    }
    //將資料上傳
    items.push(allMessage);
    //畫面渲染
    render();
    //資料存進localStorage
    localStorage.setItem('items', JSON.stringify(items));
    //輸入內容清空
    title.value = '';
    date.value = '';
    time.value = '';
    comment.value = '';
    //增加任務頁面關閉
    eventAdd.classList.remove('event-area-block');
    //增加任務按鈕開啟
    addArea.classList.remove('add-area-none');
}

//動態新增的清單
function creatList(item) {
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
                <i class="fal fa-pen edit-pen"></i>
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

//動態新增編輯清單
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
    <button>
        <i class="fal fa-times"></i>
        Cancel
    </button>
    <button id="save-button">
        <i class="fal fa-plus"></i>
        Save
    </button>
</div>
</div>
`
}

function render() {
    addSchedule.innerHTML = items.map(item => {
        return creatList(item)
    }).join('');
    deleteData();
    editSaveList();
}


function deleteData() {
    const taskList = document.querySelectorAll('.task');
    const deleteButtons = document.querySelectorAll('.edit-area .trash');
    const deleteButtonArray = [...deleteButtons];
    if (deleteButtons.length !== 0) {
        // console.log(deleteButtonArray)
        deleteButtonArray.map((deleteButton, deleteButtonIndex) => {
            deleteButton.addEventListener('click', () => {
                // console.log(taskList, deleteButtonIndex)
                console.log(deleteButton)
                taskList[deleteButtonIndex].remove();
                const updateData = items.filter((item, itemIndex) => itemIndex !== deleteButtonIndex);
                localStorage.setItem('items', JSON.stringify(updateData));
            });
        });
    }
}

function editSaveList() {
    const editButtons = document.querySelectorAll('.task .edit-pen');
    const editButtonArray = [...editButtons];
    const saveTittle = document.querySelector('.save input[type="text"]');
    const saveDate = document.querySelector('.save input[type="date"]');
    const saveTime = document.querySelector('.save input[type="time"]');
    const saveComment = document.querySelector('.save .comment-area');
    // console.log(editButtons)
    let isEdit = null;

    const editPage = creatEditList();
    const tasks = document.querySelectorAll('.task');
    const taskArray = [...tasks];
    let creatEditPage = document.createRange().createContextualFragment(editPage);
    editButtonArray.map((editButton, editButtonIndex) => {
        editButton.addEventListener('click', (e) => {

            if (isEdit === null) {
                taskArray[editButtonIndex].appendChild(creatEditPage);
                taskArray[editButtonIndex].classList.add('margin-bottom-80');
                isEdit = true;
            } else if (isEdit) {
                const saveInfo = document.querySelectorAll('.save-info');
                const saveInfoArray = [...saveInfo];
                saveInfoArray[editButtonIndex].classList.add('save-none');
                taskArray[editButtonIndex].classList.remove('margin-bottom-80');
                isEdit = false;
            } else {
                const saveInfo = document.querySelectorAll('.save-info');
                const saveInfoArray = [...saveInfo];
                saveInfoArray[editButtonIndex].classList.remove('save-none');
                isEdit = true;
            }
        })
    })
}

// function saveSaveList() {
// // console.log('save')
// // localStorage.setItem('items', JSON.stringify(items));
// const taskList = document.querySelectorAll('.task');
// const taskListArray = [...taskList]
// const saveTittle = document.querySelector('.save input[type="text"]');
// const saveDate = document.querySelector('.save input[type="date"]');
// const saveTime = document.querySelector('.save input[type="time"]');
// const saveComment = document.querySelector('.save .comment-area');
// console.log(items)
// // console.log(taskListArray)
// // taskListArray.map((taskItem, taskItemIndex) => {
// items[taskItemIndex].date = saveDate.value
// items[taskItemIndex].time = saveTime.value
// items[taskItemIndex].comment = saveComment.value
// items[taskItemIndex].title = saveTittle.value
// // })
// render(items);
// }

// function toggleSaveArea(e) {
//     // console.log(e.target)
//     if (editSaveArea.matches('.save-area-block')) {
//         editSaveArea.classList.remove('save-area-block')
//         return
//     };
//     addTaskArea.classList.remove('event-area-block');
//     editSaveArea.classList.add('save-area-block')
// }

addButton.addEventListener('click', addTaskList);
addTask.addEventListener('click', toggleAddTaskArea);
// saveButton.addEventListener('click', saveSaveList)


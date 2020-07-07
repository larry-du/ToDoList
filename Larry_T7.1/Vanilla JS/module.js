//取得編輯頁面元素
const addTaskArea = document.querySelector('.event');
const editSaveArea = document.querySelector('.save-area');
// console.log(editSaveArea)
//取得增加任務元素
const addTask = document.querySelector('.add-task');
const addButton = document.querySelector('#add');
const addSchedule = document.querySelector('.add-schedule');
const saveButton = document.querySelector('#save-button');
//取得localStorage資料,如無資料會是空陣列
let items = JSON.parse(localStorage.getItem('items')) || [];

render(items);

//開啟與關閉增加任務
function toggleAddTaskArea(e) {
    // console.log(e.target)
    if (addTaskArea.matches('.event-area-block')) {
        addTaskArea.classList.remove('event-area-block');
        return
    };
    editSaveArea.classList.remove('save-area-block')
    addTaskArea.classList.add('event-area-block');
}

function addTaskList(e) {
    //取得編輯頁面標題元素
    const title = document.querySelector('.type-tittle');
    // console.log(title.value)
    //取得日期元素
    const date = document.querySelector('input[type="date"]');
    //取得時間元素
    const time = document.querySelector('input[type="time"]');
    //取得留言內容元素
    const comment = document.querySelector('.comment-area');

    const allMessage = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value,
        id: Date.now()
    }
    items.push(allMessage);
    render(items);
    localStorage.setItem('items', JSON.stringify(items));
    title.value = '';
}

function render(items) {
    // const getData = localStorage.getItem('items');
    // const dataArray = JSON.parse(getData);
    // console.log(items)
    // const task = document.querySelector('.task');
    // const message = JSON.parse(localStorage.getItem('items'))
    // console.log(message)
    // const cardTitle = document.querySelector('.card-title span');
    // const date = document.querySelector('.status .date span');
    addSchedule.innerHTML = items.map(item => {
        return `<div class="to-do-list task container ">
                    <div class="card">
                        <div class="card-title">
                            <div class="check-area">
                                <input type="checkbox" id="task">
                                <label for="task"></label>
                        </div>
                        <span>${item.title}</span>
                    </div>
                    <div class="edit-area">
                        <i class="fas fa-star important"></i>
                        <i class="fal fa-pen"></i>
                        <i class="fal fa-trash-alt"></i>
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
            </div>`
    }).join('');
    deleteData();
    editSaveList();
}

function deleteData() {
    const taskList = document.querySelectorAll('.task');
    const deleteButton = document.querySelectorAll('.edit-area .fa-trash-alt');
    const deleteButtonArray = [...deleteButton];
    if (deleteButton.length !== 0) {
        deleteButtonArray.map((data, dataIndex) => {
            data.addEventListener('click', () => {
                taskList[dataIndex].remove();
                const updateData = items.filter((item, itemIndex) => itemIndex !== dataIndex);
                localStorage.setItem('items', JSON.stringify(updateData));
            });
        });
    }
}

function editSaveList() {
    // const taskList = document.querySelectorAll('.task');
    const editButton = document.querySelectorAll('.task .fa-pen');
    const editButtonArray = [...editButton];
    const saveTittle = document.querySelector('.save input[type="text"]');
    const saveDate = document.querySelector('.save input[type="date"]');
    const saveTime = document.querySelector('.save input[type="time"]');
    const saveComment = document.querySelector('.save .comment-area');
    // toggleMenu()
    editButtonArray.map((data, dataIndex) => {
        data.addEventListener('click', (e) => {
            saveDate.value = items[dataIndex].date;
            saveTime.value = items[dataIndex].time;
            saveComment.value = items[dataIndex].comment;
            saveTittle.value = items[dataIndex].title;
            toggleSaveArea();
        })
    })
}

function saveSaveList() {
    console.log('save')
    // localStorage.setItem('items', JSON.stringify(items));
}

function toggleSaveArea(e) {
    // console.log(e.target)
    if (editSaveArea.matches('.save-area-block')) {
        editSaveArea.classList.remove('save-area-block')
        return
    };
    addTaskArea.classList.remove('event-area-block');
    editSaveArea.classList.add('save-area-block')
}

addButton.addEventListener('click', addTaskList);
addTask.addEventListener('click', toggleAddTaskArea);
saveButton.addEventListener('click', saveSaveList)


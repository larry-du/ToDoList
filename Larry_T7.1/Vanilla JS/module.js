//取得編輯頁面元素
const event = document.querySelector('.event');
//取得增加任務元素
const addTask = document.querySelector('.add-task');
const addButton = document.querySelector('#add');
//取得localStorage資料,如無資料會是空陣列
let items = JSON.parse(localStorage.getItem('items')) || [];



//開啟與關閉增加任務
function toggleMenu(e) {
    if (event.style.display === 'block') {
        event.style.display = 'none';
        return
    };
    event.style.display = 'block';
}

function saveData(e) {
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

    addList(items);

    localStorage.setItem('items', JSON.stringify(items));
    // console.log(test)
    title.value = '';
    // event.style.display = 'none';
}


function addList(items) {
    // const getData = localStorage.getItem('items');
    // const dataArray = JSON.parse(getData);
    // console.log(items)
    const task = document.querySelector('.task');
    // const message = JSON.parse(localStorage.getItem('items'))
    // console.log(message)
    const cardTitle = document.querySelector('.card-title span');
    const date = document.querySelector('.status .date span');

    task.innerHTML = items.map(item => {
        return `<div class="card">
        <div class="card-title">
            <div class="check-area">
                <input type="checkbox"
                    id="task">
                <label for="task"></label>
            </div>
            <span>${item.title}</span>
        </div>
        <div class="edit-area">
            <i class="fas fa-star important"></i>
            <i class="fal fa-pen"></i>
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
    `
    }).join('');

    date.textContent = items.map(item => item.date).join('');

    // date.textContent = `${items[0].date}`;
}


addButton.addEventListener('click', saveData)
addTask.addEventListener('click', toggleMenu);
// date.addEventListener('change', getDate);
// time.addEventListener('change', getTime);
// comment.addEventListener('change', getComment);
// title.addEventListener('change', getTitle)

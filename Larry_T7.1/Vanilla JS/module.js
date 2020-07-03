//取得編輯頁面元素
const event = document.querySelector('.event');
//取得增加任務元素
const addTask = document.querySelector('.add-task');
const addButton = document.querySelector('#add');
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
        comment: comment.value
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
    // const message = JSON.parse(localStorage.getItem('items'))
    // console.log(message)
    const cardTitle = document.querySelector('.card-title span');
    const date = document.querySelector('.status .date span');

    cardTitle.textContent = items.map(item => item.title).join('');
    date.textContent = items.map(item => item.date).join('');
    
    // date.textContent = `${items[0].date}`;
}


addButton.addEventListener('click', saveData)
addTask.addEventListener('click', toggleMenu);
// date.addEventListener('change', getDate);
// time.addEventListener('change', getTime);
// comment.addEventListener('change', getComment);
// title.addEventListener('change', getTitle)

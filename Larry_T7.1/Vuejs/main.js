import newTask from './newTaskTemplate.js'
import toDoList from './taskTemplate.js'

let vm = new Vue({
    el: '#app',
    components: {
        'new-task': newTask,
        'to-do-list': toDoList
    },
    data() {
        return {
            allTaskData: [],
            addNewTask: false,
            currentTask: null
        }
    },
    created() {
        //創建vue實例取得資料
        this.initTaskData();
    },
    methods: {
        initTaskData() {
            this.allTaskData = JSON.parse(localStorage.getItem("toDoData")) || [];
        },
        createNewTask(taskData) {
            this.allTaskData.push(taskData);
            localStorage.setItem("toDoData", JSON.stringify(this.allTaskData));
            this.addNewTask = false;
        },
        cancelNewTask() {
            this.addNewTask = false;
        },
        changeCurrentTask(id) {
            // this.initTaskData();
            this.currentTask === id ? this.currentTask = null : this.currentTask = id;
        },
        deleteTask(id) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === id);
            this.allTaskData.splice(currentIndex, 1);
            localStorage.setItem("toDoData", JSON.stringify(this.allTaskData));
        },
        getStar(id) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === id);

            this.allTaskData[currentIndex].isStar = !this.allTaskData[currentIndex].isStar;
        },
        closeTask(oldData) {
            // const currentIndex = this.allTaskData.findIndex(data => data.dataId === oldData.dataId);

            // this.allTaskData[currentIndex] = oldData;
            // localStorage.setItem("toDoData", JSON.stringify(this.allTaskData));

            this.currentTask === oldData.dataId ? this.currentTask = null : this.currentTask = oldData.dataId;
        },
        saveEditTask(currentData) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === currentData.dataId);

            this.allTaskData[currentIndex] = currentData;

            localStorage.setItem("toDoData", JSON.stringify(this.allTaskData));

            this.currentTask === currentData.DataId ? this.currentTask = null : this.currentTask = currentData.DataId;
        }
    },
    computed: {
        topArea() {
            return this.allTaskData.filter(data => data.isStar && !data.isComplete)
        },
        middleArea() {
            return this.allTaskData.filter(data => !data.isStar && !data.isComplete)
        },
        bottomArea() {
            return this.allTaskData.filter(data => data.isComplete)
        }
    }
})

// let state = 'all';
// let currentTask = null;
// $.map(allTaskData, data => data.isEdit = false)

// render(sortData());

// $('.add-area').on('click', openNewTask);
// function openNewTask() {
// $('.add-area').addClass('add-area-none');
// $('.event-add').addClass('event-area-block');
// }

// //註冊監聽nav點擊事件
// $('.nav').on('click', $('.nav'), taskClassification);
// function taskClassification(e) {
// changeState(e)
// render(taskStateClassification())
// }

// function changeState(e) {
// if (e.target.dataset.state === 'all') {
// state = 'all';
// }
// if (e.target.dataset.state === 'in-progress') {
// state = 'progress';
// }
// if (e.target.dataset.state === 'task-completed') {
// state = 'complete';
// }
// }

// function taskStateClassification() {
// if (state === 'all') {
// return sortData();
// }
// if (state === 'progress') {
// return {
// top: sortData().top,
// middle: sortData().middle,
// bottom: []
// }
// }
// if (state === 'complete') {
// return {
// top: [],
// middle: [],
// bottom: sortData().bottom
// }
// }
// }

// //註冊監聽新增任務事件
// $('.event').on('click', $('.event'), newEventBinding);
// function newEventBinding(e) {
// const isStar = $(e.target).hasClass('top-star');
// const isEdit = $(e.target).hasClass('edit-pen');
// const isCancel = $(e.target).hasClass('cancel-button');
// const isAddNewTask = $(e.target).hasClass('add-button');
// const title = $('.event .type-title')[0];
// const date = $('.event input[type="date"]')[0];
// const time = $('.event input[type="time"]')[0];
// const comment = $('.event .comment-area')[0];
// const check = $('.event input[type="checkbox"]');

// const taskInfo = {
// title: title.value,
// date: date.value,
// time: time.value,
// comment: comment.value,
// isStar: false,
// isComplete: false
// }

// if (isStar) {
// $(this).toggleClass('high-light');
// }
// if (isEdit) {
// $('.add-area').removeClass('add-area-none');
// $('.event-add').removeClass('event-area-block');
// }
// if ($(e.target)[0] === check[0]) {
// $(this).toggleClass('is-complete');
// }
// if (isCancel) {
// clearNewTaskData();
// removeEventClass();
// }

// if (isAddNewTask) {
// if ($(this).hasClass('high-light')) {
// taskInfo.isStar = true;
// }
// if ($(this).hasClass('is-complete')) {
// taskInfo.isComplete = true;
// }
// createTaskToLocalStorage(taskInfo);
// render(sortData());
// clearNewTaskData();
// removeEventClass();
// }
// }

// function clearNewTaskData() {
// const title = $('.event .type-title')[0];
// const date = $('.event input[type="date"]')[0];
// const time = $('.event input[type="time"]')[0];
// const comment = $('.event .comment-area')[0];
// const check = $('input[type="checkbox"]')[0];
// title.value = '';
// date.value = '';
// time.value = '';
// comment.value = '';
// check.checked = false;

// }

// function removeEventClass() {
// $('.event').removeClass('high-light');
// $('.event').removeClass('is-complete');
// $('.add-area').removeClass('add-area-none');
// $('.event-add').removeClass('event-area-block');
// }

// //註冊監聽拖曳事件
// $.map($('.task'), task => {
// task.addEventListener('dragstart', dragTask)
// })

// $.map($('.task'), task => {
// task.addEventListener('drop', dropTask)
// })

// $.map($('.task'), task => {
// task.addEventListener('dragenter', cancelDefault)
// })
// $.map($('.task'), task => {
// task.addEventListener('dragover', cancelDefault)
// })

// function cancelDefault(e) {
// e.preventDefault();
// }

// //拖曳事件
// function dragTask(e) {
// //儲存被拖拉元素的 dataset 數值
// e.dataTransfer.setData('text/plain', this.dataset.number);
// }
// //拖曳後，放入位置
// function dropTask(e) {
// //取得被拖拉元素的 dataset 數值
// const dataNumber = e.dataTransfer.getData('text/plain');
// //利用取得拖拉元素的數值，反查對應的 DOM 元素
// const dragItem = $(`div[data-number="${dataNumber}"]`)[0];
// //如果拖拉元素的父層容器與被放入元素的父層容器不同，就取消放入元素效果
// if (dragItem.parentElement !== this.parentElement) return

// //如果被拖拉元素的下一個元素是當前擺放的位置
// if (dragItem.nextElementSibling === this) {
// //將當前擺放位置的元素，插入被拖拉的元素上方
// this.parentElement.insertBefore(this, dragItem);
// } else {
// //如果不是就將被拖拉元素，插入當前擺放位置的元素上方
// this.parentElement.insertBefore(dragItem, this);
// }
// saveRandomTask()
// }
// //儲存當前頁面排序
// function saveRandomTask() {
// const [...tasks] = document.querySelectorAll('.task');
// //動態新增order並給予數值用於排序
// tasks.filter(taskFinish => taskFinish.classList.contains('is-complete'))
// .map(taskDone => taskDone.dataset.number)
// .forEach((taskDone, index) => {
// const taskDoneIndex = allTaskData.findIndex(data => {
// return data.id === Number(taskDone)
// })
// allTaskData[taskDoneIndex].order = index + 1;
// })

// tasks.filter(taskFinish => !taskFinish.classList.contains('is-complete'))
// .map(taskDone => taskDone.dataset.number)
// .forEach((taskDone, index) => {
// const taskDoneIndex = allTaskData.findIndex(data => {
// return data.id === Number(taskDone)
// })
// const a = allTaskData[taskDoneIndex].order = index + 1;
// })
// localStorage.setItem('taskData', JSON.stringify(allTaskData));
// }

// function sortData() {
// const top = allTaskData.filter(data => data.isStar && !data.isComplete);
// const middle = allTaskData.filter(data => !data.isStar && !data.isComplete);
// const bottom = allTaskData.filter(data => data.isComplete);
// const getOrder = allTaskData.map(data => data.order).some(data => data !== null)
// //如果allTaskData有order且不是null，使用以下排序
// if (getOrder) {
// const starSort = top.sort((a, b) => a.order - b.order);
// const middleSort = middle.sort((a, b) => a.order - b.order)
// const bottomSort = bottom.sort((a, b) => {
// if (a.isStar === b.isStar) {
// return a.order - b.order
// }
// a.isStar && !b.isStar ? -1 : 1;
// })

// return {
// top: [...starSort],
// middle: [...middleSort],
// bottom: [...bottomSort]
// }
// }
// //如果allTaskData，沒有order使用以下排序
// if (!getOrder) {
// const starSort = top.sort((a, b) => b.id - a.id);
// const middleSort = middle.sort((a, b) => b.id - a.id)
// const bottomSort = bottom.sort((a, b) => {
// if (a.isStar === b.isStar) {
// //排序大到小
// return b.id - a.id
// }
// a.isStar && !b.isStar ? -1 : 1;
// })

// return {
// top: [...starSort],
// middle: [...middleSort],
// bottom: [...bottomSort]
// }
// }
// }

// //畫面渲染
// function render({ top, middle, bottom }) {
// const numberOfTask = $(document).find('.task').length;
// $('.star-area').html($.map(top, data => createList(data)).join(''));
// $('.unfinished-area').html($.map(middle, data => createList(data)).join(''));
// $('.complete-area').html($.map(bottom, data => createList(data)).join(''));
// $.map($('.task'), task => $(task).append(createEditList()));
// $('.task').on('click', $('.task'), editEventBinding);
// $('.task-left').text(`${numberOfTask} tasks left`);
// }

// //編輯任務事件綁定
// function editEventBinding(e) {
// const isStar = $(e.target).hasClass('top-star');
// const isEdit = $(e.target).hasClass('edit-pen');
// const isCancel = $(e.target).hasClass('cancel');
// const isSave = $(e.target).hasClass('save');
// const isDelete = $(e.target).hasClass('trash');
// const isCheck = $(this).find('input[type="checkbox"]');
// const taskNumber = this.dataset.number;
// const targetDataIndex = allTaskData.findIndex(data => {
// return data.id === Number(taskNumber)
// });
// const targetTask = allTaskData[targetDataIndex];

// //如果點擊的是置頂按鈕
// if (isStar) {
// pushEditStar.call(this, targetTask);
// }
// //如果點擊的是勾選完成任務按鈕
// if (isCheck[0] === $(e.target)[0]) {
// pushEditCheck.call(this, targetTask);
// }
// //如果點擊的是儲存按鈕
// if (isSave) {
// pushEditSave.call(this, targetTask, targetDataIndex, isCheck);
// }
// //如果點擊的是編輯按鈕
// if (isEdit) {
// pushEditTaskButton.call(this, targetTask);
// }
// //如果點擊的是刪除按鈕
// if (isDelete) {
// pushEditDelete(targetDataIndex);
// }
// //如果點擊的是取消按鈕
// if (isCancel) {
// pushEditCancel.call(this, targetTask)
// }
// }

// function pushEditCancel(targetTask) {
// clearEditTaskData();
// targetTask.isEdit = false;
// $(this).removeClass('isEdit');
// render(sortData());
// }
// function pushEditStar(targetTask) {
// //如果是編輯中，就toggle high-light
// if (targetTask.isEdit) {
// $(this).toggleClass('high-light');
// } else {
// //如果不是編輯中，就儲存置頂狀態並渲染
// targetTask.isStar = !targetTask.isStar;
// localStorage.setItem('taskData', JSON.stringify(allTaskData));
// render(sortData());
// }
// }
// function pushEditCheck(targetTask) {
// //如果不是編輯中
// if (!targetTask.isEdit) {
// //直接儲存已完成狀態，並渲染畫面
// targetTask.isComplete = !targetTask.isComplete;
// localStorage.setItem('taskData', JSON.stringify(allTaskData));
// render(sortData());
// }
// }
// function pushEditSave(targetTask, targetDataIndex, isCheck) {
// const title = $(this).find(`.list-title`);
// const date = $(this).find('input[type="date"]');
// const time = $(this).find('input[type="time"]');
// const comment = $(this).find('.comment-area');
// const taskData = {
// title: title[0].value,
// date: date[0].value,
// time: time[0].value,
// comment: comment[0].value,
// isStar: targetTask.isStar,
// isComplete: targetTask.isComplete,
// id: targetTask.id
// }
// //如果當前元素有 high-light class 更改置頂狀態為 true
// if ($(this).hasClass('high-light')) {
// taskData.isStar = true;
// }
// //如果當前元素有被勾選 更改完成狀態為 true
// if (isCheck[0].checked) {
// taskData.isComplete = true;
// }
// //儲存當筆資料，並渲染畫面
// allTaskData[targetDataIndex] = taskData;
// localStorage.setItem('taskData', JSON.stringify(allTaskData));
// render(sortData());
// }
// function pushEditTaskButton(targetTask) {
// const title = $(this).find(`.list-title`);
// const date = $(this).find('input[type="date"]');
// const time = $(this).find('input[type="time"]');
// const comment = $(this).find('.comment-area');
// //編輯時 tittle可修改
// title.disabled = !title.disabled;
// //修改編輯中狀態
// targetTask.isEdit = !targetTask.isEdit;
// title.val(targetTask.title);
// date.val(targetTask.date);
// time.val(targetTask.time);
// comment.val(targetTask.comment);
// let preTask = currentTask;
// currentTask = targetTask.id;
// $(this).toggleClass('isEdit');

// //如果當前編輯任務，不是自己就關閉 該 edit
// if (preTask && preTask !== currentTask) {
// $(`[data-number="${preTask}"]`).removeClass('isEdit');
// }
// }
// function pushEditDelete(targetDataIndex) {
// //取得被選取的資料，使用splice刪除後，儲存資料並渲染畫面
// allTaskData.splice(targetDataIndex, 1)
// localStorage.setItem('taskData', JSON.stringify(allTaskData));
// render(sortData());
// }

// function clearEditTaskData() {
// const title = $(this).find(`.list-title`);
// const date = $(this).find('input[type="date"]');
// const time = $(this).find('input[type="time"]');
// const comment = $(this).find('.comment-area');

// title.val('')
// date.val('')
// time.val('')
// comment.val('')
// }
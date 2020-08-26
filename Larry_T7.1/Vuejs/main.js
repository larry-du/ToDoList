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
            currentTask: null,
            state: 'all',
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
            this.currentTask === id ? this.currentTask = null : this.currentTask = id;
        },
        deleteEditTask(id) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === id);
            this.allTaskData.splice(currentIndex, 1);
            this.saveToLocalStorage();
        },
        getStar(id) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === id);
            this.allTaskData[currentIndex].isStar = !this.allTaskData[currentIndex].isStar;
            this.saveToLocalStorage();
        },
        cancelEditTask(oldData) {
            this.currentTask === oldData.dataId ? this.currentTask = null : this.currentTask = oldData.dataId;
        },
        saveEditTask(currentData) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === currentData.dataId);
            this.allTaskData[currentIndex] = currentData;
            this.saveToLocalStorage();

            this.currentTask === currentData.DataId ? this.currentTask = null : this.currentTask = currentData.DataId;
        },
        addComplete(currentData) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === currentData.dataId);
            this.allTaskData[currentIndex].isComplete = !this.allTaskData[currentIndex].isComplete;
            this.saveToLocalStorage();
        },
        all() {
            this.state = 'all';
        },
        inProgress() {
            this.state = 'inProgress'
        },
        taskCompleted() {
            this.state = 'completed'
        },
        toDropItem(dragId, taskIndex) {
            const topIndex = this.topArea.findIndex(data => data.dataId === Number(dragId));
            const middleIndex = this.middleArea.findIndex(data => data.dataId === Number(dragId));
            const bottomIndex = this.bottomArea.findIndex(data => data.dataId === Number(dragId));
            if (~topIndex) {
                const topArr = [...this.topArea];
                this.changeDataPosition(topArr, topIndex, taskIndex);
                this.saveCurrentRandomData(topArr, this.middleArea, this.bottomArea);
            }
            if (~middleIndex) {
                const middleArr = [...this.middleArea];
                this.changeDataPosition(middleArr, middleIndex, taskIndex);
                this.saveCurrentRandomData(this.topArea, middleArr, this.bottomArea);
            }
            if (~bottomIndex) {
                const bottomArr = [...this.bottomArea];
                this.changeDataPosition(bottomArr, bottomIndex, taskIndex);
                this.saveCurrentRandomData(this.topArea, this.middleArea, bottomArr);
            }
            this.saveToLocalStorage();
        },
        saveCurrentRandomData(topAreaArray, middleAreaArray, bottomAreaArray) {
            this.allTaskData = [...topAreaArray, ...middleAreaArray, ...bottomAreaArray];
        },
        changeDataPosition(toDoAreaArray, toDoAreaIndex, taskIndex) {
            const dragItem = toDoAreaArray.splice(toDoAreaIndex, 1);
            toDoAreaArray.splice(taskIndex, 0, dragItem[0]);
            toDoAreaArray[toDoAreaIndex].order = taskIndex + 1;
        }
        ,
        saveToLocalStorage() {
            localStorage.setItem("toDoData", JSON.stringify(this.allTaskData));
        }
    },
    computed: {
        topArea() {
            return this.sortData.filter(data => data.isStar && !data.isComplete)
        },
        middleArea() {
            return this.sortData.filter(data => !data.isStar && !data.isComplete)
        },
        bottomArea() {
            return this.sortData.filter(data => data.isComplete)
        },
        sortData() {
            const getOrder = this.allTaskData.map(data => data.order).some(data => data !== null)

            if (getOrder) {
                return this.allTaskData.sort((a, b) => {
                    return a.order - b.order
                })
            } else {
                return this.allTaskData.sort((a, b) => {
                    return b.dataId - a.dataId
                })
            }
        }

    }
})

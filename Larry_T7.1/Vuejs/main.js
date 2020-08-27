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
            taskData: {}

        }
    },
    created() {
        //創建vue實例取得資料
        this.initTaskDataList();
        this.taskData = this.initTaskData;
    },
    methods: {
        initTaskDataList() {
            this.allTaskData = JSON.parse(localStorage.getItem("toDoData")) || [];
        },
        createNewTask(newTaskData) {
            this.allTaskData = [
                ...this.allTaskData,
                newTaskData
            ];
            this.saveToLocalStorage();
            this.taskData = this.initTaskData;
            // this.addNewTask = false;
        },
        // cancelNewTask() {
        //     this.addNewTask = false;
        // },
        toggleEditTask(id) {
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
        addEditFile(event, id) {
            const currentIndex = this.allTaskData.findIndex(data => data.dataId === id);
            this.allTaskData[currentIndex].isFileName = event.target.files[0].name
        },
        all() {
            this.state = 'all';
        },
        inProgress() {
            this.state = 'inProgress';
        },
        taskCompleted() {
            this.state = 'completed';
        },
        getDragParentElement() {
            return event.currentTarget.parentElement
        },
        toDropItem(dragId, taskIndex, event) {
            const topIndex = this.topArea.findIndex(data => data.dataId === Number(dragId));
            const middleIndex = this.middleArea.findIndex(data => data.dataId === Number(dragId));
            const bottomIndex = this.bottomArea.findIndex(data => data.dataId === Number(dragId));
            if (event.currentTarget.parentElement !== this.getDragParentElement()) return
            if (this.checkIndex(topIndex)) {
                const topArr = [...this.topArea];
                this.changeDataPosition(topArr, topIndex, taskIndex);
                this.saveCurrentRandomData(topArr, this.middleArea, this.bottomArea);
            }
            if (this.checkIndex(middleIndex)) {
                const middleArr = [...this.middleArea];
                this.changeDataPosition(middleArr, middleIndex, taskIndex);
                this.saveCurrentRandomData(this.topArea, middleArr, this.bottomArea);
            }
            if (this.checkIndex(bottomIndex)) {
                const bottomArr = [...this.bottomArea];
                this.changeDataPosition(bottomArr, bottomIndex, taskIndex);
                this.saveCurrentRandomData(this.topArea, this.middleArea, bottomArr);
            }
            this.saveToLocalStorage();
        },
        checkIndex(targetIndex) {
            return ~targetIndex;
        },
        saveCurrentRandomData(topAreaArray, middleAreaArray, bottomAreaArray) {
            this.allTaskData = [...topAreaArray, ...middleAreaArray, ...bottomAreaArray];
        },
        changeDataPosition(toDoAreaArray, toDoAreaIndex, taskIndex) {
            const dragItem = toDoAreaArray.splice(toDoAreaIndex, 1);
            toDoAreaArray.splice(taskIndex, 0, dragItem[0]);
            toDoAreaArray[toDoAreaIndex].order = taskIndex + 1;
        },
        saveToLocalStorage() {
            localStorage.setItem("toDoData", JSON.stringify(this.allTaskData));
        }
    },
    computed: {
        initTaskData() {
            return {
                title: '',
                date: '',
                time: '',
                comment: '',
                dataId: '',
                isStar: false,
                isComplete: false,
                isEdit: false,
                isFileName: '',
                order: null
            }
        },
        topArea() {
            return this.sortData.filter(data => data.isStar && !data.isComplete)
        },
        middleArea() {
            return this.sortData.filter(data => !data.isStar && !data.isComplete)
        },
        bottomArea() {
            return this.sortData.filter(data => data.isComplete)
        },
        taskCountLeft() {
            if (this.state === 'all') return this.allTaskData.length;
            if (this.state === 'inProgress') return this.topArea.length + this.middleArea.length;
            if (this.state === 'completed') return this.bottomArea.length;
        },
        sortData() {
            const getOrder = this.allTaskData.map(data => data.order).some(data => data !== null)
            const topArr = this.allTaskData.filter(data => data.isStar && !data.isComplete);
            const middleArr = this.allTaskData.filter(data => !data.isStar && !data.isComplete)
            const bottomArr = this.allTaskData.filter(data => data.isComplete)
            if (getOrder) {
                const topAreaSort = topArr.sort((a, b) => {
                    return a.order - b.order
                })
                const middleAreaSort = middleArr.sort((a, b) => {
                    return a.order - b.order
                })
                const bottomAreaSort = bottomArr.sort((a, b) => {
                    if (a.isStar === b.isStar) {
                        return a.order - b.order
                    }
                    return a.isStar && !b.isStar ? -1 : 1;
                })
                return [...topAreaSort, ...middleAreaSort, ...bottomAreaSort]
            } else {
                const topAreaSort = topArr.sort((a, b) => {
                    return b.dataId - a.dataId
                })
                const middleAreaSort = middleArr.sort((a, b) => {
                    return b.dataId - a.dataId
                })
                const bottomAreaSort = bottomArr.sort((a, b) => {
                    if (a.isStar === b.isStar) {
                        return b.dataId - a.dataId
                    }
                    return a.isStar && !b.isStar ? -1 : 1;
                })
                return [...topAreaSort, ...middleAreaSort, ...bottomAreaSort]
            }
        }

    }
})



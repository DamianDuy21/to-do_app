const taskList = document.getElementById("task-list")
const addBtn = document.getElementById("add-btn")
displayData()
addBtn.addEventListener("click", () => {
    const newTask = document.getElementById("input-box")
    if (newTask.value === "") {
        alert("You have to write down a task!");
    }
    else {
        const tmp = newTask.value
        newTask.value = ""
        addToDo(tmp)
    }
})

function addToDo(content) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-name">${content}
        </span>
        <div class="task-name-form">
            <input type="text" id="task-name-new" value=${content}>
        </div>
        <span class="material-symbols-outlined edit-btn">
            edit
        </span>
        <span class="material-symbols-outlined delete-btn">
            delete
        </span>
        <span class="material-symbols-outlined close-btn">
            close
        </span>
        <span class="material-symbols-outlined done-btn">
            done
        </span>
    `
    li.classList.add("task")
    taskList.appendChild(li)
    saveData()
}
// function editToDo(li) {
//     const event = li.querySelector(".edit-btn")
//     console.log(1)
//     event.addEventListener("click", () => {
//         li.classList.add("editing")
//     })
//     saveData()
// }

// function doneEditToDo(li) {
//     const event = li.querySelector(".done-btn")
//     event.addEventListener("click", () => {
//         const value1 = li.querySelector("#task-name-new")
//         const value2 = li.querySelector(".task-name")
//         // console.log(value1.value)
//         value2.innerHTML = value1.value
//         li.classList.remove("editing")
//     })
//     saveData()
// }
// function deleteToDo(li) {
//     const event = li.querySelector(".delete-btn")
//     event.addEventListener("click", () => {
//         taskList.removeChild(li)
//     })
//     saveData()
// }

// function cancelEditToDo(li) {
//     const event = li.querySelector(".close-btn")
//     event.addEventListener("click", () => {
//         const value1 = li.querySelector("#task-name-new")
//         const value2 = li.querySelector(".task-name")
//         value1.value = value2.innerHTML.trim()
//     })
//     saveData()
// }

taskList.addEventListener("click", (e) => {
    console.log(e.target.className)
    if ((e.target.tagName.includes("LI")) && e.target.className.includes("editing") == false) {
        e.target.classList.toggle("checked")
        saveData()
    }
    if ((e.target.className.includes("task-name")) && e.target.className.includes("editing") == false) {
        e.target.parentElement.classList.toggle("checked")
        saveData()
    }
    if (e.target.innerText == "edit") {
        console.log(1)
        e.target.parentElement.classList.add("editing")
        saveData()
    }
    if (e.target.innerText == "done") {
        let li = e.target.parentElement
        let value1 = li.querySelector(".task-name")
        let value2 = li.querySelector("#task-name-new")
        value1.innerHTML = value2.value.trim()
        e.target.parentElement.classList.remove("editing")
        saveData()
    }
    if (e.target.innerText == "close") {
        let li = e.target.parentElement
        let value1 = li.querySelector(".task-name")
        let value2 = li.querySelector("#task-name-new")
        value2.value = value1.innerHTML.trim()
        saveData()
    }
    if (e.target.innerText == "delete") {
        let li = e.target.parentElement
        li.parentElement.removeChild(li)
        saveData()
    }

})

function saveData() {
    localStorage.setItem("data", taskList.innerHTML)
}

function displayData() {
    let data = localStorage.getItem("data")
    taskList.innerHTML = data
}
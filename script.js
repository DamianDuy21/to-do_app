//text-to-speech
let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select")

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices()
    speech.voice = voices[0]

    voices.forEach((item, index) => (
        voiceSelect.options[index] = new Option(item.name, index)
    ))
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value]
})


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
        <span class="material-symbols-outlined play-btn">
            play_arrow
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


taskList.addEventListener("click", (e) => {

    //linethrough
    if ((e.target.tagName.includes("LI")) && e.target.className.includes("editing") == false) {
        e.target.classList.toggle("checked")
        saveData()
    }
    if ((e.target.className.includes("task-name")) && e.target.className.includes("editing") == false) {
        e.target.parentElement.classList.toggle("checked")
        saveData()
    }

    //edit
    if (e.target.innerText == "edit") {
        let li = e.target.parentElement
        let value1 = li.querySelector(".task-name")
        let value2 = li.querySelector("#task-name-new")
        value2.value = value1.innerHTML.trim()
        e.target.parentElement.classList.add("editing")
        saveData()
    }

    //done
    if (e.target.innerText == "done") {
        let li = e.target.parentElement
        let value1 = li.querySelector(".task-name")
        let value2 = li.querySelector("#task-name-new")
        value1.innerHTML = value2.value.trim()
        e.target.parentElement.classList.remove("editing")
        saveData()
    }

    //close
    if (e.target.innerText == "close") {
        let li = e.target.parentElement
        let value1 = li.querySelector(".task-name")
        let value2 = li.querySelector("#task-name-new")
        value2.value = value1.innerHTML.trim()
        saveData()
    }

    //delete
    if (e.target.innerText == "delete") {
        let li = e.target.parentElement
        li.parentElement.removeChild(li)
        saveData()
    }

    //text-to-speech
    if (e.target.innerText == "play_arrow") {
        console.log(e.target)
        let li = e.target.parentElement
        console.log(li)
        speech.text = li.querySelector(".task-name").innerHTML
        window.speechSynthesis.speak(speech)

    }

})

function saveData() {
    localStorage.setItem("data", taskList.innerHTML)
}

function displayData() {
    let data = localStorage.getItem("data")
    taskList.innerHTML = data
}





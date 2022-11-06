const todoForm = document.getElementById("todo-form")
const toDoInput = todoForm.querySelector("input")
const toDoList = document.getElementById("todo-list")

const TODOS_KEY = "todos"
let toDos = []

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)) // 배열로 저장하기 위해
}

function deleteTodo(event) {
    // console.log(event.target.parentElement) // 클릭된 element의 부모
    const li = event.target.parentElement
    li.remove()
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id))
    saveToDos()
}

function paintToDo(newTodo) {
    const li = document.createElement("li")
    li.id = newTodo['id']
    const span = document.createElement("span")
    span.innerHTML = newTodo['text']
    const button = document.createElement("button")
    button.innerHTML = "✔️"
    button.addEventListener("click", deleteTodo)
    li.appendChild(span)
    li.appendChild(button)
    toDoList.appendChild(li)
}

function handelToDoSubmit(event) {
    event.preventDefault()
    const newTodo = toDoInput.value
    toDoInput.value = ""
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    toDos.push(newTodoObj)
    paintToDo(newTodoObj)
    saveToDos()
}

todoForm.addEventListener("submit", handelToDoSubmit)


const savedToDos = localStorage.getItem(TODOS_KEY)

if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos)
    toDos = parsedToDos
    parsedToDos.forEach(paintToDo)
}
// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções
    //criar uma nova div todo(tarefas)
const saveTodo = (text) =>{
    const todo = document.createElement("div"); //criar div
    todo.classList.add("todo"); //criar uma class="todo"

    const todoTitle = document.createElement("h3"); // criar h3
    todoTitle.innerText = text; // conteudo do texto
    todo.appendChild(todoTitle); //coloca h3 dento da div

    const doneBtn = document.createElement("button"); //cria botao
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; //conteudo do botão
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = ""; // limpa o texto depois que envia
}

const toggleForms = () =>{
    editForm.classList.toggle("hide"); // add ou remove essa class
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })

}

// Eventos
    // submit da tarefa
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue){
        //sava To Do - só salva se tiver algo escrito
        saveTodo(inputValue);
    }
})

    // tarefa feita
document.addEventListener("click", (e) =>{ //evento de click
    const targetE1 = e.target; //constante para o elemento clicado
    const parentE1 = targetE1.closest("div"); //seleciona div di elemento clicado
    let todoTitle;

    if(parentE1 && parentE1.querySelector("h3")){
        todoTitle = parentE1.querySelector("h3").innerText;
    }
    
    if(targetE1.classList.contains("finish-todo")){ // se clicar no botao que tem essa class
        parentE1.classList.toggle("done"); //adiciona class
    }

    if(targetE1.classList.contains("remove-todo")){
        parentE1.remove(); // apaga a div
    }

    if(targetE1.classList.contains("edit-todo")){
        //função para editar
        toggleForms();

        editInput.value = todoTitle; //texto no edit é o texto antigo
        oldInputValue = todoTitle; //salva o texto antigo
    }
})

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue); //envia o novo texto
    }

    toggleForms();
})
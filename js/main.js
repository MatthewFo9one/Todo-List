const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList');

let tasks = [];

form.addEventListener('submit', addTask)
tasksList.addEventListener('click',deleteTask)
tasksList.addEventListener('click',doneTask)

// if (localStorage.getItem('tasksHTML')){
//    tasksList.innerHTML= localStorage.getItem('tasksHTML')
// }


function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
    };

    tasks.push(newTask)
    console.log(tasks);
    const cssClass = newTask.done? "task-title task-title--done" : "task-title"


   //  const findIndex = tasks.findIndex( (task)=> task.id===id);


    const taskHTML = `
    <li id='${newTask.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

     tasksList.insertAdjacentHTML('beforeend', taskHTML);

     taskInput.value='';
     taskInput.focus();

     if (tasksList.children.length >1){
        emptyList.classList.add('none')
     }

     saveHTMLtoLS()
}


function deleteTask (event){


   if(event.target.dataset.action !== 'delete'){
      return
   }
   const parenNode = event.target.closest('.list-group-item');
   parenNode.remove()
   if (tasksList.children.length === 1){
      emptyList.classList.remove('none')
   }

   // if(event.target.dataset.action === 'delete'){
   //    console.log('delete');
   //    const parenNode = event.target.closest('.list-group-item');
   //    parenNode.remove()
   //    if (taskList.children.length === 1){
   //       emptyList.classList.remove('none')
   //    }
   // }

   // saveHTMLtoLS()
}


function doneTask(event) {
   
   if(event.target.dataset.action !== 'done'){
      return
   }
   const parenNode = event.target.closest('.list-group-item');
   const taskTitle = parenNode.querySelector('.task-title');
   taskTitle.classList.toggle('task-title--done')


   // if(event.target.dataset.action === 'done'){
   //    console.log('done');
   //    const parenNode = event.target.closest('.list-group-item');
   //    const taskTitle = parenNode.querySelector('.task-title');
   //    taskTitle.classList.toggle('task-title--done')
   // }

   // saveHTMLtoLS()
}

// function saveHTMLtoLS() {
//    localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }
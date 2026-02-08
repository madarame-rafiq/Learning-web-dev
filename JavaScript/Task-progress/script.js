const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const completed = document.querySelector('#completed');
let dropElem = null

const task = document.querySelectorAll('.task')
task.forEach(task =>
        task.addEventListener('drag',(e)=>{
            console.log(e);
            dropElem = task;
        })
);

const dragHandler = (elem) => {
    elem.addEventListener('dragenter',(e)=>{
        e.preventDefault();
        elem.classList.add('drop-hover')
    })
    elem.addEventListener('dragleave',(e)=>{
        e.preventDefault();
        elem.classList.remove('drop-hover')
    })
    elem.addEventListener('dragover',(e)=>{
        e.preventDefault();
    });
    elem.addEventListener('drop',(e)=>{
        e.preventDefault();
        elem.appendChild(dropElem);
        elem.classList.remove('drop-hover');
    });
}

dragHandler(todo);
dragHandler(progress);
dragHandler(completed);
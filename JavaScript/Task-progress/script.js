let taskData = {};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const completed = document.querySelector('#completed');
let dropElem = null

if(localStorage.getItem('tasks')){
    const data = JSON.parse(localStorage.getItem('tasks'));
    for(const col in data){
        let column = document.querySelector(`#${col}`);

        data[col].forEach(t=>{
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task')
            taskDiv.setAttribute('draggable', 'true');
            taskDiv.innerHTML = `
                <h2>${t.title}</h2>
                <p>${t.desc}</p>
                <button class="del-btn">Delete</button>
            `;
            todo.appendChild(taskDiv);
            taskDiv.addEventListener('drag',()=>{
                dropElem = taskDiv;
            });
        });
    }
}

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


        [todo, progress, completed].forEach(col=>{
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right-heading');

            // ---set in local storage---
            taskData[col.id] = Array.from(tasks).map(t=>{
                return{
                    title: t.querySelector('h2').innerText,
                    desc: t.querySelector('p').innerText
                }
            })

            localStorage.setItem('tasks', JSON.stringify(taskData));

        count.innerText = tasks.length; 
    });


        // ---To handle the Count of tasks---
        [todo, progress, completed].forEach(col=>{
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right-heading');

        count.innerText = tasks.length; 
    });
    });

}

dragHandler(todo);
dragHandler(progress);
dragHandler(completed);

let writeTask = document.querySelector(".write-task");
let writeToggleBtn = document.querySelector('#toggle-write');
let bgBlur = document.querySelector('.bg-blur');
let addTaskBtn = document.querySelector('#add-task');

writeToggleBtn.addEventListener('click', ()=>{
    writeTask.classList.toggle('activeWriteTask')
});

bgBlur.addEventListener('click',()=>{
    writeTask.classList.remove('activeWriteTask');
});

addTaskBtn.addEventListener('click',()=>{
    const title = document.querySelector('#input-heading').value;
    const desc = document.querySelector('#input-desc').value;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task')
    taskDiv.setAttribute('draggable', 'true');
    taskDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="del-btn">Delete</button>
    `;
    todo.appendChild(taskDiv);
    taskDiv.addEventListener('drag',()=>{
        dropElem = taskDiv;
    });

    [todo, progress, completed].forEach(col=>{
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right-heading');

            // ---set in local storage---
            taskData[col.id] = Array.from(tasks).map(t=>{
                return{
                    title: t.querySelector('h2').innerText,
                    desc: t.querySelector('p').innerText
                }
            })

            localStorage.setItem('tasks', JSON.stringify(taskData));

        count.innerText = tasks.length; 
    });

    writeTask.classList.remove('activeWriteTask');
});
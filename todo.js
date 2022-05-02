// creating empty array named tasks (to store the list items).
let tasks = [];
// creating a variable named tasksList which stores Unordered list id
const tasksList = document.getElementById('list');
// creating a variable named  addTaskInput i.e Main input box id 
const addTaskInput = document.getElementById('add');
// creating a variable named  taskscounter initialised to 0
const tasksCounter = document.getElementById('tasks-counter');
// Button
const addButton = document.getElementById('btn');

console.log('Working');
console.log("global tasks array",tasks);

//**************  fetching list of objects from API's using (GET method) as till now we worked locally ****************
// function fetchTodos() {
//     fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             tasks = data.slice(0, 20);
//             console.log(tasks);
//             renderList();
//         })
//         .catch(function (error) {
//             console.log("error",error);
//         })
        
// }

//**************  fetching list of objects from API's using (GET method) as till now we worked locally ****************

// async function fetchTodos() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         const data = await response.json();
//         tasks = data.slice(0, 2);
//         renderList();
//     }
//     catch{
//         console.log("error", error);
//     }
// }


// adding task to list         ************************************************************************************************************(4)
function addTaskToDOM(task) {
    // console.log(task.id);
    var li = document.createElement('li');

    li.innerHTML =
        `
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' :' '} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="https://cdn.pixabay.com/photo/2013/07/12/12/40/abort-146072_960_720.png" class="delete" data-id="${task.id}" />
    `;


    // li.innerHTML = `
    // <input type = 'checkbox' id = "${task.id}"  class='custom-checkbox' >
    // <label for = "${task.id}">${task.text}</label>
    // <img src='bin.png' class='delete' data-id="${task.id}" />`;

    tasksList.append(li);
}



// 1.RenderList funtion() i used to add the list of items under in unordered list      *************************************************************(3)
function renderList() {
    //2. After every addition of task the list the tasksList should not store all the previous lists in that 
    tasksList.innerHTML = "";

    //3 for loop iterated over the tasks array to fetch evey task and print on the web page.
    for (let i = 0; i < tasks.length; i++){
    
        //4. for adding the single - single task to web page we call the function addTask to DOM. 
        addTaskToDOM(tasks[i]);
        console.log("render list task", " ", i ,tasks[i]);
    }

    // 5. Here Adding the counter of list items to tasksCounter span. 
    tasksCounter.innerHTML = tasks.length;
}

// markTaskAsComplete                      *****************************************************************************************************(7)
function markTaskAsComplete(taskId) {
    // we loop over the array and find the task id matching with the 
    // filtered task object id.steps-below
    // and if the done field is true we change it to false
    // else change it to true.(basically check uncheck)
    // creating array named "task" and filtering the original array
    // named tasks eg:tasks.filter(function(task))
    // then matching the taskId with the selected task.id(through filter)
    // if they are matched successfuly then done is set to false
    // else done is set to true
    // const task = tasks.filter(function (task) {
    //     return task.id === Number(taskId) ;
    // });

    const task = tasks.filter((task) => {
        console.log(task.id === Number(taskId));
       return task.id === Number(taskId); 
    });
    // As filter function returns an array of task 
    // so at the 0th index we find the task
    // as the length of array will be 1 so it enters the if condition
    if (task.length > 0) {
        const currentTask = task[0];

        currentTask.completed = !currentTask.completed;
        // renderList();
        showNotification('Task Toggled Succesfully!');
        return;
    }

    showNotification('Could Not Toggle Task');

}

// deleteTask                   **************************************************************************************************************(6)
function deleteTask(taskId) {
    // creating a new array for removing theselected list
    
    var newTasks = tasks.filter(function (task) {
        console.log(task.id !== taskId);
        return task.id !== Number(taskId);
    });
    // console.log(newTasks);
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted Successfully!");
}

// Adding task to an array  ****************************************************************************************************************(2)
// parameter task consist of object with attributes title,id,completed.
console.log("add task tasks array", tasks);

function addTask(task) {
    console.log("under addTask",task);
    // if text is written in input the task is added to array
    if (task) {
        // pushing/adding elements to tasks list
        console.log("before task push", tasks);
        // pushing task to list 
        tasks.push(task);                         
        console.log("after task push", tasks);
        // calling renderList 
        renderList();
        // showNotification("Task added successfully!");
        return;
    }

    // else pop-up shown task cannot be added
    showNotification("Task cannot be added!");
    
}

// an alert msg of text
function showNotification(text) { 
    alert(text);
}



// function to handle key press events on input box *****************************************************************************************(1)
// 1.input provided in input box
function handleInputKeypress(e) {
    // console.log(e.key);

    // for displaying the button while writing the input
    addButton.style.display = 'block';
     
    // 2.check for every charcter/keypress till Enter is pressed
    // so on each keypress function checks whether the "Enter key is pressed or not".
    // 3.if Enter is pressed then if condition satisfies and the input / task is taken in a variable text.
    if (e.key === "Enter") {

        // 4. The text variables fetch the input(tag) data.
        // text variable stores the data of input when we enter simultaneously
        const text = e.target.value;
        console.log(text);

        // 5.if its empty then pop-up will be shown as enter the text.
        // if text is null/empty an alert msg is displayed done by calling a function
        // return keyword is compulsary
        if (!text) {
            showNotification("Input cannot be empty");
            return;
        }

        // 6. creating object named task with attributes title,id,completed
        // creating object task
        const task = {
            title: text,
            id:Date.now(),
            completed: false
        }
        console.log(task);

        // 7. after taking the value in text the input box must be empty for entering another task so, e.target.value="";
        // once when we press "Enter" the input box will get empty
        e.target.value = "";

        // 8. Now this list must be printed as a task below input. so we are calling addTask() function.
        // calling the addTask function.
        addTask(task);
        console.log("Handle Input tasks array",tasks);
    }
}

// handleClickEvent on whole the document where ever we click on webpage it targets the element *******************************************************(5)
function handleClickEvent(e) {
    // fetching the value target value from document element/tag
    const target = e.target;
    console.log(target);

    // For deleting an item
    if (target.className === 'delete') {
        // accessing taskId on clicking the element on webpage/window/document 
        const taskId = target.dataset.id;
        // calling delete task function
        deleteTask(taskId);
        console.log("delete task", taskId);
        return;
    }
    // For checking/Unchecking the box
    else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        // calling mark task function
        markTaskAsComplete(taskId);
        console.log("mark task task", taskId);
        return;
    }
}

// handleInputthroughButton
function handleInputthroughButton(e) {
    const text = addTaskInput.value;
    console.log("under button clicked", text);
    if (!text) {
        showNotification("Input cannot be empty");
        return;
    }
    const task = {
        title: text,
        id:Date.now(),
        completed: false
    }
    console.log(task);
     // 7. after taking the value in text the input box must be empty for entering another task so, e.target.value="";
        // once when we press "Enter" the input box will get empty
       addTaskInput.value = "";

        // 8. Now this list must be printed as a task below input. so we are calling addTask() function.
        // calling the addTask function.
        addTask(task);
        console.log("Handle Input tasks array",tasks);
}



// adding key event when released

function initialize() {
    // fetchTodos();

    // handleInputKeypress function manage input entered by user  
    addTaskInput.addEventListener('keyup', handleInputKeypress);   
    
    addButton.addEventListener('click', handleInputthroughButton);

    document.addEventListener("click", handleClickEvent);
}

initialize();
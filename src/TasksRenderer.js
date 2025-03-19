import Task from "./Task";
import createEditable from "./createEditable";
import removeChildren from "./removeChildren";

import calendarEdit from "./assets/calendar_edit.svg";
import debounce from "lodash.debounce";

const priorities = ["Urgent", "Important", "Normal"];

class TasksRenderer {
   constructor(tasksElement) {
      this.tasksElement = tasksElement;

      this.taskClass = "task";
      this.taskTitleClass = "title";
      this.taskDescriptionClass = "description";

      this.project = null;
      this.addTaskCard = null;
   }

   render(project) {
      removeChildren(this.tasksElement);

      if (!project) {
         return;
      }
      
      if (this.project !== project) {
         this.project = project;
         this.addTaskCard = document.createElement("li");
         
         this.addTaskCard.classList.add("add-task");

         const addTaskButton = document.createElement("button");

         addTaskButton.addEventListener("click", () => {
            project.addTask(new Task("New Task", "Enter description here...", null, priorities.at(-1)));
         });

         this.addTaskCard.appendChild(addTaskButton);

         addTaskButton.innerText = "+\nCreate task";

         this.tasksElement.appendChild(this.addTaskCard);
      }

      this.tasksElement.appendChild(this.addTaskCard);
      
      for (const priority of priorities) {
         for (const task of project.tasks.filter(task => task.priority === priority)) {
            const taskCard = document.createElement("li");
            const taskTitleButton = document.createElement("button");
            const taskTitle = document.createElement("div");
            const taskDescriptionButton = document.createElement("button");
            const taskDescription = document.createElement("div");
            const actions = document.createElement("div");
            const cyclePriorityButton = document.createElement("button");
            const setDateImage = document.createElement("img");
            const setDateButton = document.createElement("button");
            const completeTaskButton = document.createElement("button");
            const dateForm = document.createElement("form");
            const datePicker = document.createElement("input");
            const dateSubmit = document.createElement("button");
            
            taskTitleButton.appendChild(taskTitle);
            taskDescriptionButton.appendChild(taskDescription);
            setDateButton.appendChild(setDateImage);
            actions.appendChild(cyclePriorityButton);
            actions.appendChild(setDateButton);
            actions.appendChild(completeTaskButton);
            dateForm.appendChild(datePicker);
            dateForm.appendChild(dateSubmit);
   
            taskCard.appendChild(taskTitleButton);
            taskCard.appendChild(taskDescriptionButton);
            taskCard.appendChild(actions);
            taskCard.appendChild(dateForm);
   
            taskCard.classList.add(this.taskClass);

            taskCard.setAttribute("data-due", task.dueStatus());
            
            taskTitleButton.classList.add(this.taskTitleClass);
   
            taskTitleButton.addEventListener("click", () => {
               createEditable(taskTitleButton, 1, value => {
                  task.setTitle(value)
                  taskTitle.title = task.title;
               });
            });
            
            taskTitle.innerText = task.title;
            taskTitle.title = task.title;
   
            taskDescriptionButton.classList.add(this.taskDescriptionClass);
   
            taskDescriptionButton.addEventListener("click", () => {
               createEditable(taskDescriptionButton, 0, value => task.setDescription(value));
            });
   
            taskDescription.innerText = task.description;
   
            actions.classList.add("actions");
   
            cyclePriorityButton.innerText = task.priority;
            taskCard.setAttribute("data-priority", task.priority);
            cyclePriorityButton.title = "Cycle priority";
   
            cyclePriorityButton.addEventListener("click", () => {
               task.cyclePriority(priorities);
               cyclePriorityButton.innerText = task.priority;
               taskCard.setAttribute("data-priority", task.priority);
               // this.render(project);
            });

            dateForm.classList.add("due-date");

            datePicker.type = "date";
            datePicker.name = "newDueDate";

            dateSubmit.innerText = "Set";

            setDateImage.src = calendarEdit;

            setDateButton.classList.add("set-date");
            setDateButton.classList.add("circle");
            setDateButton.title = "Set due date";

            setDateButton.addEventListener("click", () => {
               dateForm.classList.add("show");
               
               datePicker.value = task.dueDate;
            
               const handleDateFormSubmit = debounce(() => {            
                  const formData = new FormData(dateForm);
            
                  for (const pair of formData) {
                     const key = pair[0];
                     const value = pair[1];
            
                     if (key === datePicker.name) {
                        task.setDueDate(value);
                     }
                  }
                  
                  taskCard.setAttribute("data-due", task.dueStatus());

                  dateForm.classList.remove("show");
               }, 0);

               dateForm.addEventListener("submit", event => {
                  event.preventDefault();

                  handleDateFormSubmit();
               });
            
               dateForm.addEventListener("focusout", event => {
                  if (event.relatedTarget !== datePicker && event.relatedTarget !== dateSubmit) {
                     handleDateFormSubmit();
                  }
               });

               taskCard.appendChild(dateForm);
            
               datePicker.select();
            });
            
            completeTaskButton.innerText = "✓";
            completeTaskButton.classList.add("complete");
            completeTaskButton.classList.add("circle");
            completeTaskButton.title = "Complete task";
            
            completeTaskButton.addEventListener("click", () => {
               project.removeTask(task);
            });
            
            this.tasksElement.insertBefore(taskCard, this.addTaskCard);
         }
      }
   }
}

export default TasksRenderer;
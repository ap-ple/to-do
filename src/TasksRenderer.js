import Task from "./Task";
import removeChildren from "./removeChildren";

class TasksRenderer {
   constructor(tasksElement) {
      this.tasksElement = tasksElement;
      
      this.taskClass = "task";
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
            project.addTask(new Task("New Task", "Type description here...", "Today", "Low"));
         });

         this.addTaskCard.appendChild(addTaskButton);

         addTaskButton.innerText = "+\nAdd Task";

         this.tasksElement.appendChild(this.addTaskCard);
      }

      this.tasksElement.appendChild(this.addTaskCard);
      
      for (const task of project.tasks) {
         const taskCard = document.createElement("li");
         const taskTitle = document.createElement("h2");
         const taskDescription = document.createElement("div");
         const actions = document.createElement("div");
         const completeTaskButton = document.createElement("button");
         
         taskCard.appendChild(taskTitle);
         taskCard.appendChild(taskDescription);
         taskCard.appendChild(actions);
         actions.appendChild(completeTaskButton);

         taskCard.classList.add(this.taskClass);
         
         taskTitle.innerText = task.title;

         taskDescription.innerText = task.description;
         taskDescription.classList.add(this.taskDescriptionClass);

         actions.classList.add("actions");
         
         completeTaskButton.innerText = "✓";
         completeTaskButton.classList.add("complete");
         completeTaskButton.classList.add("circle");
         
         completeTaskButton.addEventListener("click", () => {
            project.removeTask(task);
         });
         
         this.tasksElement.insertBefore(taskCard, this.addTaskCard);
      }
   }
}

export default TasksRenderer;
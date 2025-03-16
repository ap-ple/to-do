import Task from "./Task";
import removeChildren from "./removeChildren";

class TasksRenderer {
   constructor(tasksElement) {
      this.tasksElement = tasksElement;
      this.taskClass = "task";
      this.addTaskClass = "add-task";
      this.completeTaskClass = "complete";

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
         
         this.addTaskCard.classList.add(this.addTaskClass);

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
         const completeTaskButton = document.createElement("button");
         
         taskCard.appendChild(taskTitle);
         taskCard.appendChild(taskDescription);
         taskCard.appendChild(completeTaskButton);

         taskCard.classList.add(this.taskClass);
         
         taskTitle.innerText = task.title;

         taskDescription.innerText = task.description;
         
         completeTaskButton.innerText = "✓";
         completeTaskButton.classList.add(this.completeTaskClass);
         
         completeTaskButton.addEventListener("click", () => {
            project.removeTask(task);
         });
         
         this.tasksElement.insertBefore(taskCard, this.addTaskCard);
      }
   }
}

export default TasksRenderer;
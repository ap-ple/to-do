
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
      while (this.tasksElement.firstChild !== this.addTaskCard) {
         this.tasksElement.removeChild(this.tasksElement.firstChild);
      }
      
      if (this.project !== project) {
         if (this.addTaskCard) {
            this.tasksElement.removeChild(this.addTaskCard);
         }

         this.project = project;
         this.addTaskCard = document.createElement("li");
         
         this.addTaskCard.classList.add(this.addTaskClass);

         const addTaskButton = document.createElement("button");

         this.addTaskCard.appendChild(addTaskButton);

         addTaskButton.innerText = "+\nAdd Task";

         this.tasksElement.appendChild(this.addTaskCard);
      }
      
      for (const task of project.tasks) {
         const taskCard = document.createElement("li");
         const taskTitle = document.createElement("h2");
         const completeTaskButton = document.createElement("button");
         
         taskCard.appendChild(taskTitle);
         taskCard.appendChild(completeTaskButton);

         taskCard.classList.add(this.taskClass);
         
         taskTitle.innerText = task.title;
         
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
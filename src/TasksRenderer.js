import Task from "./Task";
import removeChildren from "./removeChildren";

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
            project.addTask(new Task("New Task", "Type description here...", "Today", "Low"));
         });

         this.addTaskCard.appendChild(addTaskButton);

         addTaskButton.innerText = "+\nAdd task";

         this.tasksElement.appendChild(this.addTaskCard);
      }

      this.tasksElement.appendChild(this.addTaskCard);
      
      for (const task of project.tasks) {
         const taskCard = document.createElement("li");
         const taskTitleButton = document.createElement("button");
         const taskTitle = document.createElement("div");
         const taskDescriptionButton = document.createElement("button");
         const taskDescription = document.createElement("div");
         const actions = document.createElement("div");
         const completeTaskButton = document.createElement("button");
         
         taskTitleButton.appendChild(taskTitle);
         taskDescriptionButton.appendChild(taskDescription);
         actions.appendChild(completeTaskButton);

         taskCard.appendChild(taskTitleButton);
         taskCard.appendChild(taskDescriptionButton);
         taskCard.appendChild(actions);

         taskCard.classList.add(this.taskClass);
         
         taskTitleButton.classList.add(this.taskTitleClass);
         
         taskTitle.innerText = task.title;

         taskDescriptionButton.classList.add(this.taskDescriptionClass);

         taskDescription.innerText = task.description;

         actions.classList.add("actions");
         
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

export default TasksRenderer;
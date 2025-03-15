import removeChildren from "./removeChildren";

class TasksRenderer {
   constructor(tasksElement) {
      this.tasksElement = tasksElement;
      this.addTaskClass = "add-task";
   }

   render(project) {
      removeChildren(this.tasksElement);

      for (const task of project.tasks) {
         const taskCard = document.createElement("li");
         taskCard.innerText = JSON.stringify(task);

         this.tasksElement.appendChild(taskCard);
      }
   }
}

export default TasksRenderer;
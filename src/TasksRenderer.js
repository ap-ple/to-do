import removeChildren from "./removeChildren";

class TasksRenderer {
   constructor(tasksElement) {
      this.tasksElement = tasksElement;
   }

   render(tasks) {
      removeChildren(this.tasksElement);

      for (const task of tasks) {
         const taskCard = document.createElement("li");
         taskCard.innerText = JSON.stringify(task);

         this.tasksElement.appendChild(taskCard);
      }
   }
}

export default TasksRenderer;
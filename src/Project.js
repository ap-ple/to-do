
class Project {
   constructor(title, tasksRenderer) {
      this.title = title;
      this.tasksRenderer = tasksRenderer;

      this.tasks = new Array();
   }

   rename(newTitle) {
      this.title = newTitle;
   }

   render() {
      this.tasksRenderer.render(this);
   }

   addTask(task) {
      this.tasks.push(task);
      this.render();
   }

   removeTask(task) {
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);
      this.render();
   }
}

export default Project;
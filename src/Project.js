
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
      this.tasksRenderer.render(this.tasks);
   }

   addTask(task) {
      this.tasks.push(task);
      this.render();
   }
}

export default Project;
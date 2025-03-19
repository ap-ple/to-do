
class Project {
   constructor(title) {
      this.title = title;
      this.tasks = new Array();
   }

   rename(newTitle) {
      this.title = newTitle;
   }

   addTask(task) {
      this.tasks.push(task);
   }

   removeTask(task) {
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);
   }
}

export default Project;
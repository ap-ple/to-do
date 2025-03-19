
class Project {
   constructor(title) {
      this.title = title;
      this.tasks = new Array();
   }

   rename(newTitle) {
      this.title = newTitle;
      this.save();
   }

   addTask(task) {
      task.save = () => this.save();
      this.tasks.push(task);
      this.save();
   }

   removeTask(task) {
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);
      this.save();
   }
}

export default Project;
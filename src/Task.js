
class Task {
   constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
   }

   setTitle(newTitle) {
      this.title = newTitle;
   }

   setDescription(newDescription) {
      this.description = newDescription;
   }
}

export default Task;

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

   cyclePriority(priorities) {
      const currentPriorityIndex = priorities.indexOf(this.priority);
      this.priority = priorities.at(currentPriorityIndex - 1);
   }
}

export default Task;
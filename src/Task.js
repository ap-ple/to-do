import { format, formatDistance, isSameDay, parse } from "date-fns";

const dateFormat = "yyyy-MM-dd";

class Task {
   constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.setDueDate(dueDate);
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

   setDueDate(newDueDate) {
      if (newDueDate) {
         this._dueDate = parse(newDueDate, dateFormat, new Date());
      }
      else {
         this._dueDate = null;
      }
   }

   get dueDate() {
      if (this._dueDate) {
         return format(this._dueDate, dateFormat);
      }
      else {
         return null;
      }
   }

   dueStatus() {
      if (this._dueDate) {
         if (isSameDay(this._dueDate, new Date())) {
            return "today";
         }
         else {
            return formatDistance(this._dueDate, new Date(), { addSuffix: true });
         }
      }
      else {
         return "";
      }
   }
}

export default Task;
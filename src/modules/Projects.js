import Project from "./Project";
import Task from "./Task";

const storageKey = "projects";

class Projects {
   constructor() {
      this.projects = new Array();
   }

   first() {
      return this.projects[0];
   }

   push(project) {
      project.save = () => this.save();
      this.projects.push(project);
      this.save();
   }

   delete(project) {
      const projectIndex = this.projects.indexOf(project);
      this.projects.splice(projectIndex, 1);
      this.save();
   }

   save() {
      localStorage.setItem(storageKey, JSON.stringify(this.projects));
   }

   load() {
      const loadedProjects = localStorage.getItem(storageKey);

      if (loadedProjects) {
         this.projects = JSON.parse(loadedProjects);

         const baseProject = new Project();
         const baseTask = new Task();

         for (const project of this.projects) {
            Object.setPrototypeOf(project, baseProject);
            project.save = () => this.save();

            for (const task of project.tasks) {
               Object.setPrototypeOf(task, baseTask);
               task.save = () => this.save();
            }
         }
      }

      return loadedProjects;
   }
}

export default Projects;
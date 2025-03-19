
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
      localStorage.setItem("projects", JSON.stringify(this.projects));
   }

   load() {
      
   }
}

export default Projects;
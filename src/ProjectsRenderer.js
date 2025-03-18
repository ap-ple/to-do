import createEditable from "./createEditable"
import removeChildren from "./removeChildren";
import Project from "./Project";

class ProjectsRenderer {
   constructor(projectsElement, tasksRenderer, addProjectButton) {
      this.projectsElement = projectsElement;
      this.tasksRenderer = tasksRenderer;

      this.projects = new Array();

      this.selectedProject = null;
      this.selectedProjectElement = null;

      addProjectButton.addEventListener("click", () => {
         this.addProject(new Project("Untitled Project", tasksRenderer));
      });

      this.selectedClass = "selected";
      this.projectClass = "project";
   }

   addProject(project) {
      this.projects.push(project);
      this.render();
   }

   selectProject(project) {
      this.selectedProject = project;
      this.selectedProject.render();
   }

   selectProjectElement(projectElement) {
      this.selectedProjectElement = projectElement;
      this.selectedProjectElement.classList.add(this.selectedClass);
   }

   deselectSelectedProjectElement() {
      this.selectedProjectElement?.classList.remove(this.selectedClass);
   }

   render() {
      removeChildren(this.projectsElement);

      if (this.projects.length === 0) {
         this.tasksRenderer.render();
      }
      else if (!this.selectedProject) {
         this.selectProject(this.projects[0]);
      }

      for (const project of this.projects) {
         const projectContainer = document.createElement("li");
         const projectButton = document.createElement("button");
         const projectButtonTitle = document.createElement("div");
         const projectDeleteButton = document.createElement("button");

         projectButton.appendChild(projectButtonTitle);
         projectContainer.appendChild(projectButton);
         projectContainer.appendChild(projectDeleteButton);

         projectButtonTitle.innerText = project.title;

         projectButton.classList.add(this.projectClass);

         projectDeleteButton.innerText = "✕";
         projectDeleteButton.classList.add("delete");
         projectDeleteButton.classList.add("circle");
         projectDeleteButton.title = "Delete project";

         projectDeleteButton.addEventListener("click", () => {
            const projectIndex = this.projects.indexOf(project);
            this.projects.splice(projectIndex, 1);

            if (this.selectedProject === project) {
               this.selectedProject = null;
            }
            
            this.render();
         });

         if (this.selectedProject === project) {
            this.selectProjectElement(projectButton);
         }

         projectButton.addEventListener("click", () => {
            this.deselectSelectedProjectElement();

            if (this.selectedProjectElement === projectButton) {
               const projectEditable = createEditable(projectButton, 1, value => project.rename(value));
               this.selectProjectElement(projectEditable);
            }

            this.selectProject(project);
            this.selectProjectElement(projectButton);
         });

         this.projectsElement.appendChild(projectContainer);
      }
   }
}

export default ProjectsRenderer;
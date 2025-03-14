import removeChildren from "./removeChildren";

class ProjectsRenderer {
   constructor(projectsElement) {
      this.projectsElement = projectsElement;

      this.selectedProject = null;
      this.selectedProjectButton = null;

      this.selectedClass = "selected";
   }

   selectProject(project) {
      this.selectedProject = project;
      this.selectedProject.render();
   }

   selectProjectButton(projectButton) {
      this.selectedProjectButton = projectButton;
      this.selectedProjectButton.classList.add(this.selectedClass);
   }

   render(projects) {
      removeChildren(this.projectsElement);

      if (!this.selectedProject) {
         this.selectProject(projects[0]);
      }

      for (const project of projects) {
         const projectButton = document.createElement("button");
         projectButton.innerText = project.title;

         if (this.selectedProject === project) {
            this.selectProjectButton(projectButton);
         }

         projectButton.addEventListener("click", () => {
            if (this.selectedProjectButton) {
               this.selectedProjectButton.classList.remove(this.selectedClass);
            }

            this.selectProject(project);
            this.selectProjectButton(projectButton);
         });

         this.projectsElement.appendChild(projectButton);
      }
   }
}

export default ProjectsRenderer;
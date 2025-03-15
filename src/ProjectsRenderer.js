import debounce from "lodash.debounce";
import removeChildren from "./removeChildren";

class ProjectsRenderer {
   constructor(projectsElement) {
      this.projectsElement = projectsElement;

      this.selectedProject = null;
      this.selectedProjectElement = null;

      this.selectedClass = "selected";
      this.projectClass = "project";
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

   render(projects) {
      removeChildren(this.projectsElement);

      if (!this.selectedProject) {
         this.selectProject(projects[0]);
      }

      for (const project of projects) {
         const projectButton = document.createElement("button");
         const projectButtonTitle = document.createElement("div");

         projectButton.appendChild(projectButtonTitle);

         projectButtonTitle.innerText = project.title;

         projectButton.classList.add(this.projectClass);

         if (this.selectedProject === project) {
            this.selectProjectElement(projectButton);
         }

         projectButton.addEventListener("click", () => {
            this.deselectSelectedProjectElement();

            if (this.selectedProjectElement === projectButton) {
               const projectRenameForm = document.createElement("form");
               const projectRenameInput = document.createElement("input");

               this.selectProjectElement(projectRenameInput);

               projectRenameInput.addEventListener("focus", () => {
                  this.deselectSelectedProjectElement();

                  this.selectProjectElement(projectRenameInput);
               });

               projectRenameForm.appendChild(projectRenameInput);
               
               projectRenameInput.classList.add(this.projectClass);
               projectRenameInput.value = project.title;
               projectRenameInput.type = "text";
               projectRenameInput.name = "newProjectTitle";
               projectRenameInput.autocomplete = "off";

               const handleProjectRenameFormSubmit = debounce(() => {
                  const formData = new FormData(projectRenameForm);

                  for (const pair of formData) {
                     const key = pair[0];
                     const value = pair[1];

                     if (key == "newProjectTitle") {
                        if (value.length > 0) {
                           project.rename(value);
                           projectButtonTitle.innerText = project.title;
                        }
                     }
                  }
                  if (this.projectsElement.contains(projectRenameForm)) {
                     this.projectsElement.insertBefore(projectButton, projectRenameForm)
                     this.projectsElement.removeChild(projectRenameForm);
                  }
               }, 0);

               projectRenameForm.addEventListener("submit", event => {
                  event.preventDefault();

                  handleProjectRenameFormSubmit();
               });

               projectRenameInput.addEventListener("focusout", handleProjectRenameFormSubmit);

               this.projectsElement.insertBefore(projectRenameForm, projectButton)
               this.projectsElement.removeChild(projectButton);

               projectRenameInput.select();
            }

            this.selectProject(project);
            this.selectProjectElement(projectButton);
         });

         this.projectsElement.appendChild(projectButton);
      }
   }
}

export default ProjectsRenderer;
import debounce from "lodash.debounce";
import removeChildren from "./removeChildren";
import Project from "./Project";

class ProjectsRenderer {
   constructor(projectsElement, tasksRenderer, addProjectButton) {
      this.projectsElement = projectsElement;

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

      if (!this.selectedProject) {
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

         projectDeleteButton.addEventListener("click", () => {
            const projectIndex = this.projects.indexOf(project);
            this.projects.splice(projectIndex, 1);
            this.render();
         });

         if (this.selectedProject === project) {
            this.selectProjectElement(projectButton);
         }

         projectButton.addEventListener("click", () => {
            this.deselectSelectedProjectElement();

            if (this.selectedProjectElement === projectButton) {
               const projectRenameForm = document.createElement("form");
               const projectRenameInput = document.createElement("input");

               projectRenameForm.appendChild(projectRenameInput);

               this.selectProjectElement(projectRenameInput);

               projectRenameInput.addEventListener("focus", () => {
                  this.deselectSelectedProjectElement();

                  this.selectProjectElement(projectRenameInput);
               });

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
                  if (projectContainer.contains(projectRenameForm)) {
                     projectContainer.insertBefore(projectButton, projectRenameForm)
                     projectContainer.removeChild(projectRenameForm);
                  }
               }, 0);

               projectRenameForm.addEventListener("submit", event => {
                  event.preventDefault();

                  handleProjectRenameFormSubmit();
               });

               projectRenameInput.addEventListener("focusout", handleProjectRenameFormSubmit);

               projectContainer.insertBefore(projectRenameForm, projectButton)
               projectContainer.removeChild(projectButton);

               projectRenameInput.select();
            }

            this.selectProject(project);
            this.selectProjectElement(projectButton);
         });

         this.projectsElement.appendChild(projectContainer);
      }
   }
}

export default ProjectsRenderer;
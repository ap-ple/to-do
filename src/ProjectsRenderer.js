import createEditable from "./createEditable"
import removeChildren from "./removeChildren";
import Project from "./Project";
import TasksRenderer from "./TasksRenderer";

class ProjectsRenderer {
   constructor(projectsElement, tasksElement, addProjectButton, projects) {
      this.projectsElement = projectsElement;
      this.tasksRenderer = new TasksRenderer(tasksElement);
      
      addProjectButton.addEventListener("click", () => {
         this.projects.push(new Project("Untitled Project"));
         this.render();
      });
      
      this.selectedProject = null;
      this.selectedProjectElement = null;

      this.selectedClass = "selected";
      this.projectClass = "project";

      this.projects = projects;
   }

   selectProject(project) {
      this.selectedProject = project;
      this.tasksRenderer.render(this.selectedProject);
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
         this.selectProject(this.projects.first());
      }

      for (const project of this.projects.projects) {
         const projectContainer = document.createElement("li");
         const projectButton = document.createElement("button");
         const projectButtonTitle = document.createElement("div");
         const projectDeleteButton = document.createElement("button");

         projectButton.appendChild(projectButtonTitle);
         projectContainer.appendChild(projectButton);
         projectContainer.appendChild(projectDeleteButton);

         projectButtonTitle.innerText = project.title;
         projectButtonTitle.title = project.title;

         projectButton.classList.add(this.projectClass);

         projectDeleteButton.innerText = "✕";
         projectDeleteButton.classList.add("delete");
         projectDeleteButton.classList.add("circle");
         projectDeleteButton.title = "Delete project";

         projectDeleteButton.addEventListener("click", () => {
            this.projects.delete(project);

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
               const projectEditable = createEditable(projectButton, 1, value => {
                  project.rename(value);
                  projectButtonTitle.title = value;
               });
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
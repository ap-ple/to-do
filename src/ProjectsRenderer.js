import removeChildren from "./removeChildren";

class ProjectsRenderer {
   constructor(projectsElement) {
      this.projectsElement = projectsElement;
   }

   render(projects) {
      removeChildren(this.projectsElement);

      for (const project of projects) {
         const projectButton = document.createElement("button");
         projectButton.innerText = project.title;
         projectButton.addEventListener("click", () => project.render());

         this.projectsElement.appendChild(projectButton);
      }
   }
}

export default ProjectsRenderer;
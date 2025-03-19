import "./styles.css";

import Project from "./Project";
import Projects from "./Projects";
import ProjectsRenderer from "./ProjectsRenderer";

const projects = new Projects();

if (!projects.load()) {
   projects.push(new Project("Untitled Project"));
}

const projectsElement = document.querySelector("body > main > nav > ul");
const tasksElement = document.querySelector("body > main > ul.tasks");
const addProjectButton = document.querySelector("body > main > nav > header > button");

const projectsRenderer = new ProjectsRenderer(projectsElement, tasksElement, addProjectButton, projects);

projectsRenderer.render();
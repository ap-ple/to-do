import "./styles.css";

import Project from "./Project";
import ProjectsRenderer from "./ProjectsRenderer";
import TasksRenderer from "./TasksRenderer";

const tasksElement = document.querySelector("body > main > ul.tasks");
const tasksRenderer = new TasksRenderer(tasksElement);

const projectsElement = document.querySelector("body > main > nav > ul");
const addProjectButton = document.querySelector("body > main > nav > header > button");
const projectsRenderer = new ProjectsRenderer(projectsElement, tasksRenderer, addProjectButton);

const defaultProject = new Project("Untitled Project");

projectsRenderer.addProject(defaultProject);
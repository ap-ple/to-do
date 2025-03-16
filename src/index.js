import "./styles.css";

import debounce from "lodash.debounce";

import Project from "./Project";
import ProjectsRenderer from "./ProjectsRenderer";
import TasksRenderer from "./TasksRenderer";

const TASKS_RESIZE_RENDER_DELAY = 50; // delay in milliseconds to render tasks after resizing

const tasksElement = document.querySelector("body > main > ul.tasks");
const tasksRenderer = new TasksRenderer(tasksElement);

const projectsElement = document.querySelector("body > main > nav > ul");
const addProjectButton = document.querySelector("body > main > nav > header > button");
const projectsRenderer = new ProjectsRenderer(projectsElement, tasksRenderer, addProjectButton);

const defaultProject = new Project("Untitled Project", tasksRenderer);

projectsRenderer.addProject(defaultProject);

const renderTasksAfterDelay = debounce(() => {
   tasksElement.classList.remove("hidden");
}, TASKS_RESIZE_RENDER_DELAY);

window.addEventListener("resize", () => {
   tasksElement.classList.add("hidden");
   renderTasksAfterDelay();
});
import "./styles.css";

import debounce from "lodash.debounce";

import Project from "./Project";
import Task from "./Task";
import ProjectsRenderer from "./ProjectsRenderer";
import TasksRenderer from "./TasksRenderer";

const TASKS_RESIZE_RENDER_DELAY = 50; // delay in milliseconds to render tasks after resizing

const projectsElement = document.querySelector("body > main > nav > ul")
const projectsRenderer = new ProjectsRenderer(projectsElement);

const tasksElement = document.querySelector("body > main > ul.tasks")
const tasksRenderer = new TasksRenderer(tasksElement)

const projects = new Array();

const defaultProject = new Project("Default", tasksRenderer);

const defaultTasks = [
   new Task(
      "Default task",
      "Default task description",
      "Tomorrow",
      "High"
   ),
];

for (const task of defaultTasks) {
   defaultProject.addTask(task);
}

projects.push(defaultProject);

projectsRenderer.render(projects);

const renderTasksAfterDelay = debounce(() => {
   tasksElement.classList.remove("hidden");
}, TASKS_RESIZE_RENDER_DELAY);

window.addEventListener("resize", () => {
   tasksElement.classList.add("hidden");
   renderTasksAfterDelay();
});
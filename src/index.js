import "./styles.css";

import Project from "./project";
import Task from "./task";
import ProjectsRenderer from "./ProjectsRenderer";
import TasksRenderer from "./TasksRenderer";

const TASK_RESIZE_RENDER_DELAY = 50; // delay to render tasks after resizing

const projectsElement = document.querySelector("body > main > nav > ul")
const projectsRenderer = new ProjectsRenderer(projectsElement);

const tasksElement = document.querySelector("body > main > ul.tasks")
const tasksRenderer = new TasksRenderer(tasksElement)

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

const projects = new Array();

projects.push(defaultProject);

projectsRenderer.render(projects);

let taskHideTimeout;

window.addEventListener("resize", () => {
   tasksElement.classList.add("hidden");
   
   clearTimeout(taskHideTimeout);

   taskHideTimeout = setTimeout(() => {
      tasksElement.classList.remove("hidden");
   }, TASK_RESIZE_RENDER_DELAY);
});
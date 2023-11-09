import type { Project } from "../types/project";

export const projectsData: Project[] = [
  {
    name: "Flojoy Robotics",
    desc: "Flojoy Studio is the open-source, Python-based alternative to engineering software like LabVIEW, Simulink, and Alteryx.",
    link: "https://flojoy.ai",
    tags: ["TypeScript", "React", "Python", "FastAPI"],
    img_link: "src/content/images/flojoy_robot.png",
  },
  {
    name: "Flojoy Cloud",
    desc: "Engineers use Flojoy Studio to stream measurements from robotics, microcontrollers, single board computers, test stations, and benchtop instruments to Flojoy Cloud.",
    link: "https://cloud.flojoy.ai",
    tags: ["TypeScript", "Next.js", "FaunaDB"],
    img_link: "src/content/images/flojoy_robot.png",
  },
];

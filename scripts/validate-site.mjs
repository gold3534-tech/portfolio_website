import { existsSync, readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, extname } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const requiredRoutes = [
  "index.html",
  "projects/index.html",
  "projects/semoduck/index.html",
  "projects/travelmate/index.html",
  "projects/ax-orchestration/index.html",
  "projects/card-rag/index.html",
  "projects/resume-interview-agent/index.html",
  "projects/portfolio-website/index.html",
  "projects/traffic-accident/index.html",
  "skills/index.html",
  "about/index.html",
  "github/index.html",
];

for (const route of requiredRoutes) {
  if (!existsSync(join(root, route))) {
    throw new Error(`Missing route file: ${route}`);
  }
}

const dataCode = readFileSync(join(root, "data.js"), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${dataCode}; this.PROJECTS = PROJECTS; this.SKILL_GROUPS = SKILL_GROUPS;`, sandbox);

for (const project of sandbox.PROJECTS) {
  if (!project.slug || !project.title || !project.summary) {
    throw new Error(`Project has missing required fields: ${JSON.stringify(project)}`);
  }
  if (project.thumbnail && project.thumbnail.startsWith("/public/")) {
    const imagePath = join(root, project.thumbnail.replace(/^\//, ""));
    if (!existsSync(imagePath)) {
      throw new Error(`Missing project image: ${project.thumbnail}`);
    }
  }
}

async function listHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && ![".git", "node_modules"].includes(entry.name)) {
      files.push(...await listHtml(full));
    } else if (entry.isFile() && extname(entry.name) === ".html") {
      files.push(full);
    }
  }
  return files;
}

for (const file of await listHtml(root)) {
  const html = readFileSync(file, "utf8");
  if (!html.includes('lang="ko"')) throw new Error(`Missing Korean lang attribute: ${file}`);
  if (!html.includes('name="viewport"')) throw new Error(`Missing viewport: ${file}`);
  if (!html.includes("/styles.css")) throw new Error(`Missing stylesheet link: ${file}`);
}

console.log(`Validated ${requiredRoutes.length} routes, ${sandbox.PROJECTS.length} projects, ${sandbox.SKILL_GROUPS.length} skill groups.`);

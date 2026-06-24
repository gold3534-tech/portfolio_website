import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const dataCode = readFileSync(join(root, "data.js"), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${dataCode}\nthis.__DATA__ = { SITE, PROJECTS, SKILL_GROUPS };`, sandbox);

const { PROJECTS } = sandbox.__DATA__;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stackMarkup(items = [], limit = items.length) {
  return items.slice(0, limit).map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function imageMarkup(project, className = "project-image") {
  if (!project.thumbnail) {
    return `<div class="${className}"><div class="image-placeholder" role="img" aria-label="${escapeHtml(project.title)} 프로젝트 이미지 준비 중"><span>KD</span><strong>${escapeHtml(project.title)}</strong></div></div>`;
  }
  return `<div class="${className}"><img src="../../${project.thumbnail.replace(/^\//, "")}" alt="${escapeHtml(project.title)} 대표 화면" loading="lazy" /></div>`;
}

function header(prefix) {
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="${prefix}"><span class="brand-mark">KD</span><span>금동호</span></a><nav class="desktop-nav" aria-label="주요 메뉴"><a data-nav-link href="${prefix}">홈</a><a data-nav-link href="${prefix}projects/">프로젝트</a><a data-nav-link href="${prefix}skills/">기술 스택</a><a data-nav-link href="${prefix}about/">소개</a><a data-nav-link href="${prefix}github/">GitHub</a></nav><div class="header-actions"><a class="icon-button" href="https://github.com/gold3534-tech" target="_blank" rel="noreferrer" aria-label="GitHub 열기">GH</a></div><button class="menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="모바일 메뉴 열기">☰</button></div><nav id="mobile-menu" class="mobile-menu" data-mobile-menu hidden aria-label="모바일 메뉴"><a data-nav-link href="${prefix}">홈</a><a data-nav-link href="${prefix}projects/">프로젝트</a><a data-nav-link href="${prefix}skills/">기술 스택</a><a data-nav-link href="${prefix}about/">소개</a><a data-nav-link href="${prefix}github/">GitHub</a></nav></header>`;
}

function footer(prefix) {
  return `<footer class="footer"><div class="footer-inner"><span>© 2026 금동호</span><a class="text-link" href="${prefix}projects/">프로젝트 목록</a></div></footer>`;
}

function screenshotInfo(item, project) {
  if (typeof item === "string") return { src: item, alt: `${project.title} 화면` };
  return { src: item.src, alt: item.alt || `${project.title} 화면` };
}

function projectDetail(project) {
  const meta = [
    project.period ? ["기간·형태", project.period] : null,
    project.ownership ? ["직접 담당", project.ownership] : null,
    project.deployment ? ["배포·공개", project.deployment] : null,
    project.impact ? ["핵심 성과", project.impact] : null,
    project.role ? ["역할 요약", project.role] : null,
    ["분류", project.category.join(", ")],
  ].filter(Boolean);

  const screenshots = (project.screenshots.length ? project.screenshots : [""]).map((item) => {
    if (!item) return `<div class="image-placeholder" role="img" aria-label="${escapeHtml(project.title)} 프로젝트 이미지 준비 중"><span>KD</span><strong>${escapeHtml(project.title)}</strong></div>`;
    const screenshot = screenshotInfo(item, project);
    return `<img src="../../${screenshot.src.replace(/^\//, "")}" alt="${escapeHtml(screenshot.alt)}" loading="lazy" />`;
  }).join("");

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(project.summary)}" />
    <meta property="og:title" content="${escapeHtml(project.title)} | 금동호" />
    <meta property="og:description" content="${escapeHtml(project.cardNote || project.summary)}" />
    <meta property="og:type" content="article" />
    <title>${escapeHtml(project.title)} | 금동호</title>
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../../styles.css" />
    <script src="../../data.js" defer></script>
    <script src="../../script.js" defer></script>
  </head>
  <body>
    ${header("../../")}
    <main data-project-detail="${project.slug}">
      <section class="detail-hero">
        <div>
          <p class="eyebrow">Project</p>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="lead">${escapeHtml(project.summary)}</p>
          <dl class="detail-meta">
            ${meta.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
          </dl>
          ${project.proof ? `<div class="proof-list proof-list-hero">${stackMarkup(project.proof)}</div>` : ""}
          <div class="tag-list">${stackMarkup(project.techStack)}</div>
          <div class="hero-actions">
            ${project.githubUrl ? `<a class="button" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub 보기</a>` : ""}
            ${project.liveUrl ? `<a class="button button-ghost" href="${project.liveUrl}" target="_blank" rel="noreferrer">${escapeHtml(project.liveLabel || "서비스")} 보기</a>` : ""}
          </div>
        </div>
        ${imageMarkup(project, "detail-cover")}
      </section>
      <section class="section two-column">
        <article><p class="eyebrow">Overview</p><h2>프로젝트 소개</h2><p>${escapeHtml(project.overview)}</p></article>
        <article><p class="eyebrow">Problem</p><h2>기획 배경</h2><p>${escapeHtml(project.background)}</p></article>
      </section>
      <section class="section split-panel">
        <div><p class="eyebrow">Flow</p><h2>시스템 또는 데이터 흐름</h2><p>${escapeHtml(project.flow)}</p></div>
        <div class="feature-list">${stackMarkup(project.features)}</div>
      </section>
      <section class="section">
        <p class="eyebrow">Troubleshooting</p>
        <h2>문제 해결 경험</h2>
        <div class="trouble-grid">
          ${project.troubleshooting.map((item) => `<article class="trouble-card"><h3>문제</h3><p>${escapeHtml(item.problem)}</p><h3>원인</h3><p>${escapeHtml(item.cause)}</p><h3>해결 과정</h3><p>${escapeHtml(item.solution)}</p><h3>배운 점</h3><p>${escapeHtml(item.learned)}</p></article>`).join("")}
        </div>
      </section>
      <section class="section">
        <p class="eyebrow">Screens</p>
        <h2>프로젝트 화면</h2>
        <div class="gallery-grid">${screenshots}</div>
      </section>
      <section class="section contact-band">
        <div><p class="eyebrow">Learning</p><h2>배운 점</h2><p>${escapeHtml(project.learned)}</p></div>
        <a class="button" href="../../projects/">목록으로 돌아가기</a>
      </section>
    </main>
    ${footer("../../")}
  </body>
</html>
`;
}

for (const project of PROJECTS) {
  const file = join(root, "projects", project.slug, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, projectDetail(project), "utf8");
}

console.log(`Generated ${PROJECTS.length} static project pages.`);

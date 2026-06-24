function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function $all(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

const BASE_PATH = window.location.hostname.endsWith("github.io") ? "/portfolio_website" : "";

function withBase(path) {
  if (!path || /^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path.startsWith("/")) return `${BASE_PATH}${path}`;
  return path;
}

function isCurrentPath(href) {
  const path = window.location.pathname
    .replace(BASE_PATH, "")
    .replace(/\/index\.html$/, "/") || "/";
  const normalizedHref = href
    .replace(BASE_PATH, "")
    .replace(/^\.\.\/|\.\//g, "/")
    .replace(/\/index\.html$/, "/");
  if (normalizedHref === "/" || normalizedHref === "") return path === "/";
  return path === normalizedHref || path.startsWith(`${normalizedHref}/`);
}

function initNavigation() {
  $all("[data-nav-link]").forEach((link) => {
    if (isCurrentPath(link.getAttribute("href"))) {
      link.setAttribute("aria-current", "page");
    }
  });

  const toggle = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });
}

function stackMarkup(stack, limit = stack.length) {
  return stack.slice(0, limit).map((item) => `<span>${item}</span>`).join("");
}

function screenshotInfo(item, project) {
  if (typeof item === "string") {
    return { src: item, alt: `${project.title} 화면` };
  }
  return {
    src: item.src,
    alt: item.alt || `${project.title} 화면`,
  };
}

function placeholder(title) {
  return `
    <div class="image-placeholder" role="img" aria-label="${title} 프로젝트 이미지 준비 중">
      <span>KD</span>
      <strong>${title}</strong>
    </div>
  `;
}

function imageMarkup(project, className = "project-image") {
  if (!project.thumbnail) return `<div class="${className}">${placeholder(project.title)}</div>`;
  return `
    <div class="${className}">
      <img src="${withBase(project.thumbnail)}" alt="${project.title} 대표 화면" loading="lazy" />
    </div>
  `;
}

function projectCard(project) {
  const links = [
    project.githubUrl ? `<a class="text-link" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub</a>` : "",
    project.liveUrl ? `<a class="text-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">${project.liveLabel || "서비스"}</a>` : "",
  ].filter(Boolean).join("");
  const proof = project.proof?.slice(0, 4).map((item) => `<span>${item}</span>`).join("") || "";

  return `
    <article class="project-card project-card-${project.priority || "standard"}" data-category="${project.category.join(" ")}">
      ${imageMarkup(project)}
      <div class="project-card-body">
        <div class="project-card-top">
          <div class="project-meta">${project.category.map((item) => `<span>${item}</span>`).join("")}</div>
          <a class="card-arrow" href="${withBase(`/projects/${project.slug}/`)}" aria-label="${project.title} 상세 보기">→</a>
        </div>
        <h3><a href="${withBase(`/projects/${project.slug}/`)}">${project.title}</a></h3>
        <p>${project.cardNote || project.summary}</p>
        ${project.period ? `<div class="project-facts"><span>${project.period}</span><span>${project.deployment}</span></div>` : ""}
        <div class="tag-list">${stackMarkup(project.techStack, 5)}</div>
        ${proof ? `<div class="proof-list">${proof}</div>` : ""}
        <div class="card-actions">
          <a class="button button-small" href="${withBase(`/projects/${project.slug}/`)}">상세 보기</a>
          ${links}
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProjects() {
  const target = $("[data-featured-projects]");
  if (!target) return;
  const featured = ["semoduck", "nadeurism", "ax-orchestration", "jobnawa"]
    .map((slug) => PROJECTS.find((project) => project.slug === slug))
    .filter(Boolean);
  target.innerHTML = featured.map(projectCard).join("");
}

function renderProjectsPage() {
  const target = $("[data-project-list]");
  const filters = $("[data-project-filters]");
  if (!target || !filters) return;

  const categories = ["전체", "풀스택", "프론트엔드", "AI", "모바일", "데이터"];
  let active = "전체";

  function renderFilters() {
    filters.innerHTML = categories.map((category) => `
      <button type="button" class="${category === active ? "is-active" : ""}" data-filter="${category}">
        ${category}
      </button>
    `).join("");

    $all("[data-filter]", filters).forEach((button) => {
      button.addEventListener("click", () => {
        active = button.dataset.filter;
        renderFilters();
        renderList();
      });
    });
  }

  function renderList() {
    const visible = active === "전체" ? PROJECTS : PROJECTS.filter((project) => project.category.includes(active));
    target.innerHTML = visible.map(projectCard).join("");
  }

  renderFilters();
  renderList();
}

function renderProjectDetail() {
  const target = $("[data-project-detail]");
  if (!target) return;

  const slug = target.dataset.projectDetail;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) {
    target.innerHTML = `<section class="section narrow"><h1>프로젝트를 찾을 수 없습니다.</h1><a class="button" href="${withBase("/projects/")}">프로젝트 목록으로</a></section>`;
    return;
  }

  document.title = `${project.title} | 금동호`;
  const detailMeta = [
    project.period ? ["기간·형태", project.period] : null,
    project.ownership ? ["직접 담당", project.ownership] : null,
    project.deployment ? ["배포·공개", project.deployment] : null,
    project.impact ? ["핵심 성과", project.impact] : null,
    project.role ? ["역할 요약", project.role] : null,
    ["분류", project.category.join(", ")],
  ].filter(Boolean);
  target.innerHTML = `
    <section class="detail-hero">
      <div>
        <p class="eyebrow">Project</p>
        <h1>${project.title}</h1>
        <p class="lead">${project.summary}</p>
        <dl class="detail-meta">
          ${detailMeta.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
        </dl>
        ${project.proof ? `<div class="proof-list proof-list-hero">${project.proof.map((item) => `<span>${item}</span>`).join("")}</div>` : ""}
        <div class="tag-list">${stackMarkup(project.techStack)}</div>
        <div class="hero-actions">
          ${project.githubUrl ? `<a class="button" href="${project.githubUrl}" target="_blank" rel="noreferrer">GitHub 보기</a>` : ""}
          ${project.liveUrl ? `<a class="button button-ghost" href="${project.liveUrl}" target="_blank" rel="noreferrer">${project.liveLabel || "서비스"} 보기</a>` : ""}
        </div>
      </div>
      ${imageMarkup(project, "detail-cover")}
    </section>
    <section class="section two-column">
      <article>
        <p class="eyebrow">Overview</p>
        <h2>프로젝트 소개</h2>
        <p>${project.overview}</p>
      </article>
      <article>
        <p class="eyebrow">Problem</p>
        <h2>기획 배경</h2>
        <p>${project.background}</p>
      </article>
    </section>
    <section class="section split-panel">
      <div>
        <p class="eyebrow">Flow</p>
        <h2>시스템 또는 데이터 흐름</h2>
        <p>${project.flow}</p>
      </div>
      <div class="feature-list">
        ${project.features.map((feature) => `<span>${feature}</span>`).join("")}
      </div>
    </section>
    <section class="section">
      <p class="eyebrow">Troubleshooting</p>
      <h2>문제 해결 경험</h2>
      <div class="trouble-grid">
        ${project.troubleshooting.map((item) => `
          <article class="trouble-card">
            <h3>문제</h3><p>${item.problem}</p>
            <h3>원인</h3><p>${item.cause}</p>
            <h3>해결 과정</h3><p>${item.solution}</p>
            <h3>배운 점</h3><p>${item.learned}</p>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="section">
      <p class="eyebrow">Screens</p>
      <h2>프로젝트 화면</h2>
      <div class="gallery-grid">
        ${(project.screenshots.length ? project.screenshots : [""]).map((item) => {
          if (!item) return placeholder(project.title);
          const screenshot = screenshotInfo(item, project);
          return `<img src="${withBase(screenshot.src)}" alt="${screenshot.alt}" loading="lazy" />`;
        }).join("")}
      </div>
    </section>
    <section class="section contact-band">
      <div>
        <p class="eyebrow">Learning</p>
        <h2>배운 점</h2>
        <p>${project.learned}</p>
      </div>
      <a class="button" href="${withBase("/projects/")}">목록으로 돌아가기</a>
    </section>
  `;
}

function renderSkillsPage() {
  const target = $("[data-skills]");
  if (!target) return;
  target.innerHTML = SKILL_GROUPS.map((group) => `
    <section class="skill-group">
      <div>
        <p class="eyebrow">Skill Group</p>
        <h2>${group.title}</h2>
      </div>
      <div class="skill-items">
        ${group.skills.map(([name, text]) => `
          <article class="skill-item">
            <h3><span></span>${name}</h3>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function renderSkillPreview() {
  const target = $("[data-skill-preview]");
  if (!target) return;
  const preview = SKILL_GROUPS.flatMap((group) => group.skills.slice(0, 3).map(([name]) => name));
  target.innerHTML = preview.slice(0, 12).map((skill) => `<span>${skill}</span>`).join("");
}

async function renderGithubPage() {
  const target = $("[data-github]");
  if (!target) return;

  const username = SITE.githubUsername;
  target.innerHTML = `<div class="loading-card">GitHub 공개 정보를 불러오는 중입니다.</div>`;

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) throw new Error("GitHub API request failed");

    const profile = await profileResponse.json();
    const repos = (await reposResponse.json())
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    const featuredNames = ["semoduck", "jobnawa-portfolio", "AX_Orchestration_platform", "ai-card-recommendation-rag", "resume-interview-agent", "portfolio_website"];
    const featured = repos.filter((repo) => featuredNames.includes(repo.name));

    target.innerHTML = `
      <section class="github-profile">
        <img src="${profile.avatar_url}" alt="${profile.login} 프로필 이미지" />
        <div>
          <p class="eyebrow">GitHub</p>
          <h2>${profile.name || profile.login}</h2>
          <p>${profile.bio || "공개 프로필 소개가 아직 없습니다."}</p>
          <div class="github-facts">
            <span>공개 저장소 ${profile.public_repos}</span>
            <span>${profile.location || "위치 정보 없음"}</span>
          </div>
          <a class="button" href="${profile.html_url}" target="_blank" rel="noreferrer">프로필 바로가기</a>
        </div>
      </section>
      <section class="section">
        <div class="section-header">
          <p class="eyebrow">Updated</p>
          <h2>최근 업데이트된 저장소</h2>
        </div>
        <div class="repo-grid">${repos.slice(0, 6).map(repoCard).join("")}</div>
      </section>
      <section class="section">
        <div class="section-header">
          <p class="eyebrow">Featured</p>
          <h2>대표 저장소</h2>
        </div>
        <div class="repo-grid">${featured.map(repoCard).join("")}</div>
      </section>
    `;
  } catch (error) {
    target.innerHTML = `
      <section class="fallback-card">
        <p class="eyebrow">GitHub</p>
        <h2>GitHub 정보를 불러오지 못했습니다.</h2>
        <p>공개 API 요청이 실패해도 포트폴리오 페이지는 계속 사용할 수 있습니다.</p>
        <a class="button" href="${SITE.githubUrl}" target="_blank" rel="noreferrer">GitHub로 이동</a>
      </section>
    `;
  }
}

function repoCard(repo) {
  const updated = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" }).format(new Date(repo.updated_at));
  return `
    <article class="repo-card">
      <div>
        <h3>${repo.name}</h3>
        <p>${repo.description || "저장소 설명이 없습니다."}</p>
      </div>
      <div class="repo-meta">
        ${repo.language ? `<span>${repo.language}</span>` : ""}
        <span>Star ${repo.stargazers_count}</span>
        <span>Fork ${repo.forks_count}</span>
        <span>${updated}</span>
      </div>
      <a class="text-link" href="${repo.html_url}" target="_blank" rel="noreferrer">저장소 보기</a>
    </article>
  `;
}

initNavigation();
renderFeaturedProjects();
renderProjectsPage();
renderProjectDetail();
renderSkillsPage();
renderSkillPreview();
renderGithubPage();

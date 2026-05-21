const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "Animation", level: 5 },
    ],
  },
  {
    title: "Backend & AI",
    skills: [
      { name: "Python", level: 5 },
      { name: "CrewAI", level: 4 },
      { name: "RAG/LLM", level: 4 },
      { name: "Flask/Node.js", level: 4 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 5 },
      { name: "Docker", level: 4 },
      { name: "Figma", level: 4 },
    ],
  },
];

const projects = [
  {
    name: "AX_Orchestration_Platform",
    summary: "CrewAI 기반 멀티 에이전트 워크플로우 시각화 플랫폼",
    description:
      "CrewAI 기반 멀티 에이전트 워크플로우를 시각적으로 설계하고 실행 상태를 확인할 수 있는 플랫폼입니다. 2D 도트 그래픽 애니메이션으로 작업 현황을 실시간처럼 표현해 복잡한 Agent 실행 과정을 사용자에게 이해하기 쉽게 보여주는 데 집중했습니다.",
    stack: ["React", "TypeScript", "Canvas", "CrewAI", "Python"],
    features: ["2D 도트 애니메이션", "실시간 업데이트", "에이전트 업무 흐름 시각화"],
    learned: [
      "복잡한 AI Agent 실행 흐름을 UI 상태로 분리하는 방법",
      "Canvas와 React UI를 함께 구성하는 방식",
      "실시간 상태 표현을 사용자 경험으로 연결하는 설계",
      "AI 플랫폼에서 설명 가능한 화면 구조의 중요성",
    ],
    links: { GitHub: "https://github.com/gold3534-tech/AX_Orchestration_platform" },
  },
  {
    name: "Semoduck",
    summary: "굿즈 거래, 공식샵, 커뮤니티 기능을 갖춘 덕질 플랫폼",
    description:
      "덕질 사용자를 위한 풀스택 서비스입니다. 굿즈 거래, 공식샵, 커뮤니티 기능을 하나의 흐름으로 연결해 실제 운영 가능한 서비스 구조를 목표로 구현했습니다.",
    stack: ["React", "Node.js", "MongoDB", "이커머스"],
    features: ["풀스택", "실제 서비스 운영", "커뮤니티/커머스 연결"],
    learned: [
      "커뮤니티와 커머스 기능을 하나의 UX로 연결하는 방법",
      "상품 데이터와 사용자 행동 흐름을 컴포넌트로 분리하는 방식",
      "실제 운영을 고려한 화면 구조와 관리 기능",
      "풀스택 서비스에서 프론트엔드가 데이터 흐름을 이해해야 하는 이유",
    ],
    links: { GitHub: "https://github.com/gold3534-tech/semoduck" },
  },
  {
    name: "AI Card Recommendation",
    summary: "자연어 입력으로 추천받는 RAG 기반 카드 추천 시스템",
    description:
      "사용자가 자연어로 원하는 조건을 입력하면 RAG 기반 검색을 통해 적합한 카드를 추천하는 시스템입니다. 단순 키워드 검색이 아니라 문맥 기반 추천 흐름을 설계하는 데 초점을 맞췄습니다.",
    stack: ["Python", "LLM", "RAG", "Vector Database"],
    features: ["AI/ML", "자연어 처리", "벡터 검색 기반 추천"],
    learned: [
      "문서 임베딩과 벡터 검색 기반 추천 구조",
      "LLM 응답을 서비스 UX에 맞게 정리하는 방식",
      "추천 근거를 사용자에게 설명하는 화면 구성",
      "AI 기능을 실제 의사결정 보조 도구로 만드는 방법",
    ],
    links: { GitHub: "https://github.com/gold3534-tech/ai-card-recommendation-rag" },
  },
  {
    name: "나들이즘",
    summary: "카테고리 선택부터 최적 경로 추천까지 제공하는 여행 추천 앱",
    description:
      "사용자가 여행 카테고리를 선택하면 추천 여행지를 제시하고, 이동 경로까지 확인할 수 있도록 구성한 여행 추천 서비스입니다. 실제 사용 흐름을 고려한 UX 설계에 집중했습니다.",
    stack: ["React", "지도 API", "추천 알고리즘"],
    features: ["UX", "실제 서비스", "지도 기반 추천"],
    learned: [
      "사용자 조건 입력에서 결과 화면까지 이어지는 흐름 설계",
      "지도 API를 활용한 위치 기반 시각화",
      "추천 결과를 직관적으로 보여주는 UI 구성",
      "모바일 환경에서 사용하기 쉬운 화면 구성",
    ],
    links: {},
  },
  {
    name: "resume-interview-agent",
    summary: "이력서 기반 면접 준비 AI Agent 서비스",
    description:
      "AI가 이력서를 분석하고 면접 질문을 생성해 연습할 수 있도록 돕는 실용적 AI 서비스입니다. 개인화된 질문 생성과 학습 흐름을 서비스 화면으로 연결하는 데 초점을 맞췄습니다.",
    stack: ["React", "AI Agent", "Python"],
    features: ["실용적 AI 서비스", "이력서 분석", "면접 질문 생성"],
    learned: [
      "사용자 문서를 기반으로 개인화된 AI 응답을 만드는 구조",
      "AI Agent 기능을 서비스 흐름으로 연결하는 방식",
      "면접 준비라는 실제 문제를 AI UX로 풀어내는 방법",
      "프론트엔드와 Python 기반 AI 로직의 역할 분리",
    ],
    links: { GitHub: "https://github.com/gold3534-tech/resume-interview-agent" },
  },
];

let currentIndex = 0;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function stars(level) {
  return "★★★★★"
    .split("")
    .map((star, index) => `<span class="${index < level ? "filled" : ""}">${star}</span>`)
    .join("");
}

function renderSkills() {
  const grid = document.querySelector("#skills-grid");
  skillGroups.forEach((group) => {
    const card = createElement("article", "skill-card");
    card.innerHTML = `
      <h3>${group.title}</h3>
      <div class="skill-rows">
        ${group.skills
          .map(
            (skill) => `
              <div class="skill-row">
                <span>${skill.name}</span>
                <strong aria-label="${skill.level}점">${stars(skill.level)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
    grid.append(card);
  });
}

function projectCard(project, index) {
  return `
    <article class="project-card" data-project-index="${index}" tabindex="0" role="button" aria-label="${project.name} 상세보기">
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <div class="project-stack">기술: ${project.stack.join(", ")}</div>
      <button type="button">상세보기 클릭</button>
    </article>
  `;
}

function updateCarousel() {
  const cards = document.querySelectorAll(".project-card");
  const dots = document.querySelectorAll(".carousel-dots button");

  cards.forEach((card, index) => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
    card.classList.toggle("active", index === currentIndex);
    card.classList.toggle("prev-card", index === prevIndex);
    card.classList.toggle("next-card", index === nextIndex);
    card.classList.toggle("hidden-card", index !== currentIndex && index !== prevIndex && index !== nextIndex);
  });

  dots.forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
}

function moveCarousel(direction) {
  currentIndex = (currentIndex + direction + projects.length) % projects.length;
  updateCarousel();
}

function openModal(index) {
  const project = projects[index];
  const modal = document.querySelector("#project-modal");
  const content = document.querySelector("#modal-content");
  const links = Object.entries(project.links)
    .map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");

  content.innerHTML = `
    <h2>${project.name}</h2>
    <div class="modal-image" aria-label="${project.name} 스크린샷 placeholder">
      <span></span><span></span><span></span>
    </div>
    <section>
      <h3>📝 개요</h3>
      <p>${project.description}</p>
    </section>
    <section>
      <h3>🛠 기술 스택</h3>
      <div class="modal-tags">${project.stack.map((item) => `<span>${item}</span>`).join("")}</div>
    </section>
    <section>
      <h3>💡 배운 점</h3>
      <ul>${project.learned.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>🔗 링크</h3>
      <div class="modal-links">${links || "<span>링크 준비 중</span>"}</div>
    </section>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  const modal = document.querySelector("#project-modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function renderProjects() {
  const track = document.querySelector("#project-track");
  const dots = document.querySelector("#project-dots");
  track.innerHTML = projects.map(projectCard).join("");
  dots.innerHTML = projects.map((_, index) => `<button type="button" aria-label="${index + 1}번 프로젝트"></button>`).join("");

  document.querySelector(".carousel-button.prev").addEventListener("click", () => moveCarousel(-1));
  document.querySelector(".carousel-button.next").addEventListener("click", () => moveCarousel(1));

  track.querySelectorAll(".project-card").forEach((card) => {
    const index = Number(card.dataset.projectIndex);
    card.addEventListener("click", () => openModal(index));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(index);
      }
    });
  });

  dots.querySelectorAll("button").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  updateCarousel();
}

function initModal() {
  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") moveCarousel(-1);
    if (event.key === "ArrowRight") moveCarousel(1);
  });
}

renderSkills();
renderProjects();
initModal();

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "AI & Backend",
    skills: ["Python", "FastAPI", "RAG", "LangChain", "AI Agent"],
  },
  {
    title: "Data & Tools",
    skills: ["MySQL", "ChromaDB", "Docker", "GitHub", "Streamlit"],
  },
];

const githubImageBase = "https://raw.githubusercontent.com/gold3534-tech";

const projects = [
  {
    name: "AX Orchestration Platform",
    label: "AI Agent Workflow",
    type: "AI",
    summary: "Agent, Task, Crew, Flow를 시각적으로 구성하고 실행 상태를 확인하는 AI 워크플로우 플랫폼",
    description:
      "AI Agent 실행 과정을 그래프와 2D 시각화로 보여주는 풀스택 플랫폼입니다. 사용자는 Agent와 Task를 만들고 Crew, Flow 단위로 연결한 뒤 실행 결과와 진행 상태를 확인할 수 있습니다.",
    image: `${githubImageBase}/AX_Orchestration_platform/main/docs/media/home-runner.png`,
    stack: ["React", "TypeScript", "React Flow", "PixiJS", "FastAPI", "CrewAI"],
    features: ["그래프 기반 워크플로우 구성", "Flow 실행 상태 시각화", "Agent/Task/Crew/Flow 자산 관리"],
    learned: [
      "복잡한 AI Agent 실행 흐름을 화면 상태와 도메인 모델로 나누는 방법",
      "React Flow와 PixiJS를 함께 사용해 작업 흐름을 시각화하는 방식",
      "실행 이벤트와 결과를 사용자가 이해할 수 있는 UI로 정리하는 경험",
    ],
    links: {
      GitHub: "https://github.com/gold3534-tech/AX_Orchestration_platform",
    },
  },
  {
    name: "Semoduck",
    label: "Community Commerce",
    type: "Frontend",
    summary: "팬덤 게시글, 굿즈 탐색, 중고 거래 흐름을 연결한 덕질 커뮤니티 플랫폼",
    description:
      "세모덕은 관심사별 갤러리, 게시글, 굿즈 목록과 가격 비교, 자체 마켓 게시판을 연결한 팬덤 커뮤니티 서비스입니다. Supabase 로그인과 Next.js App Router 기반 구조로 구현했습니다.",
    image: "https://opengraph.githubassets.com/portfolio-semoduck/gold3534-tech/semoduck",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    features: ["Google OAuth 로그인", "관심사 온보딩", "굿즈 목록/상세", "AI 태그 추천 mock"],
    learned: [
      "커뮤니티와 커머스 기능을 하나의 사용자 흐름으로 묶는 방법",
      "Next.js Route Handler와 Supabase를 사용한 서비스 구조",
      "실제 운영을 고려한 관리자 mock 화면과 데이터 모델 설계",
    ],
    links: {
      GitHub: "https://github.com/gold3534-tech/semoduck",
      Demo: "https://semoduck.vercel.app",
    },
  },
  {
    name: "AI Card Recommendation",
    label: "RAG Recommendation",
    type: "AI",
    summary: "소비 패턴을 자연어로 입력하면 적합한 신용카드를 추천하는 RAG 기반 추천 시스템",
    description:
      "카드 혜택 데이터를 문서 형태로 변환하고 ChromaDB에 저장한 뒤, 사용자 질문과 유사한 카드 후보를 검색합니다. 검색 결과를 LLM context로 전달해 카드명, 주요 혜택, 추천 이유를 생성합니다.",
    image: `${githubImageBase}/ai-card-recommendation-rag/main/screenshots/result_example.png`,
    stack: ["Python", "Streamlit", "OpenAI API", "LangChain", "ChromaDB", "BM25"],
    features: ["카드 혜택 데이터 전처리", "Hybrid Search", "추천 이유 생성", "Streamlit UI"],
    learned: [
      "정형 데이터를 RAG 검색용 문서와 metadata로 변환하는 방법",
      "Vector Search와 BM25를 결합한 Hybrid Search 구현",
      "추천 결과를 사용자가 납득할 수 있는 설명으로 구성하는 방식",
    ],
    links: {
      GitHub: "https://github.com/gold3534-tech/ai-card-recommendation-rag",
    },
  },
  {
    name: "Resume Interview Agent",
    label: "Interview AI",
    type: "Fullstack",
    summary: "이력서 PDF를 분석해 기술 면접 질문과 최종 평가를 생성하는 AI 면접 Agent",
    description:
      "PDF 이력서를 분석해 핵심 키워드를 추출하고, LLM 기반 기술 면접 질문과 후속 질문을 생성합니다. 면접 종료 후 PASS/FAIL, 판단 사유, 강점과 보완점을 구조화해 Slack으로 알림을 보냅니다.",
    image: `${githubImageBase}/resume-interview-agent/main/screenshots/web-interview-start.png`,
    stack: ["Python", "FastAPI", "LangChain", "Anthropic Claude", "Slack API", "JavaScript"],
    features: ["PDF 이력서 분석", "기술 면접 질문 생성", "최종 평가 구조화", "Slack 알림"],
    learned: [
      "문서 분석 결과를 면접 질문 생성 흐름으로 연결하는 방법",
      "LLM 응답을 서비스에서 쓰기 좋은 구조로 정리하는 방식",
      "FastAPI와 클라이언트 UI, 외부 알림 API를 연동하는 경험",
    ],
    links: {
      GitHub: "https://github.com/gold3534-tech/resume-interview-agent",
    },
  },
];

const projectFilters = ["All", "Frontend", "AI", "Fullstack"];

const labDemos = [
  {
    id: "state",
    title: "상태 기반 UI",
    summary: "탭, 선택 상태, 진행률처럼 사용자의 행동에 따라 화면이 즉시 바뀌는 UI를 구현합니다.",
    notes: ["컴포넌트 상태 분리", "선택값에 따른 조건부 렌더링", "시각적 피드백과 진행 상태 표현"],
    preview: `
      <div class="demo-card product-demo">
        <div class="demo-toolbar">
          <button class="demo-chip active" type="button" data-stage="0">요구사항</button>
          <button class="demo-chip" type="button" data-stage="1">UI 설계</button>
          <button class="demo-chip" type="button" data-stage="2">구현</button>
        </div>
        <div class="demo-meter"><span style="width: 34%"></span></div>
        <div class="demo-copy">
          <strong>요구사항 분석</strong>
          <p>사용자 흐름을 먼저 정리하고 필요한 화면 상태를 컴포넌트 단위로 나눕니다.</p>
        </div>
      </div>
    `,
  },
  {
    id: "filter",
    title: "검색/필터 UX",
    summary: "목록을 빠르게 탐색할 수 있도록 검색, 필터, 빈 상태까지 포함한 인터페이스를 구성합니다.",
    notes: ["필터 상태와 목록 렌더링 연결", "빈 결과 메시지 처리", "카드형 데이터 UI 구성"],
    preview: `
      <div class="demo-card filter-demo">
        <label>
          <span>프로젝트 검색</span>
          <input type="search" id="demo-search" placeholder="React, AI, 커머스" />
        </label>
        <div class="demo-list" id="demo-list"></div>
      </div>
    `,
  },
  {
    id: "form",
    title: "폼 피드백",
    summary: "입력값 검증, 에러 메시지, 성공 상태처럼 서비스에서 자주 필요한 폼 경험을 만듭니다.",
    notes: ["실시간 validation", "접근 가능한 메시지 영역", "성공/오류 상태 디자인"],
    preview: `
      <div class="demo-card form-demo">
        <label>
          <span>이메일 입력</span>
          <input type="email" id="demo-email" placeholder="name@example.com" />
        </label>
        <p class="form-message" id="demo-email-message">이메일을 입력하면 상태가 바로 표시됩니다.</p>
        <button type="button" id="demo-submit">확인</button>
      </div>
    `,
  },
];

let activeFilter = "All";
let activeLab = "state";

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderSkills() {
  const grid = document.querySelector("#skills-grid");
  grid.innerHTML = "";

  skillGroups.forEach((group) => {
    const card = createElement("article", "skill-card");
    card.innerHTML = `
      <h3>${group.title}</h3>
      <div class="skill-tags">
        ${group.skills.map((skill) => `<span>${skill}</span>`).join("")}
      </div>
    `;
    grid.append(card);
  });
}

function projectCard(project, index) {
  return `
    <article class="project-card" data-project-index="${index}" tabindex="0" role="button" aria-label="${project.name} 상세보기">
      <div class="project-image">
        <img src="${project.image}" alt="${project.name} 프로젝트 화면" loading="lazy" />
      </div>
      <div class="project-content">
        <span class="project-label">${project.label}</span>
        <h3>${project.name}</h3>
        <p>${project.summary}</p>
        <div class="project-stack">${project.stack.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}</div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const grid = document.querySelector("#project-grid");
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.type === activeFilter);
  grid.innerHTML = visibleProjects.map((project) => projectCard(project, projects.indexOf(project))).join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    const index = Number(card.dataset.projectIndex);
    card.addEventListener("click", () => openModal(index));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(index);
      }
    });
  });
}

function renderProjectFilters() {
  const filterWrap = document.querySelector("#project-filters");
  filterWrap.innerHTML = projectFilters
    .map(
      (filter) => `
        <button class="${filter === activeFilter ? "active" : ""}" type="button" data-filter="${filter}">
          ${filter}
        </button>
      `,
    )
    .join("");

  filterWrap.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderProjectFilters();
      renderProjects();
    });
  });
}

function renderLabTabs() {
  const tabs = document.querySelector("#lab-tabs");
  tabs.innerHTML = labDemos
    .map(
      (demo) => `
        <button class="${demo.id === activeLab ? "active" : ""}" type="button" role="tab" aria-selected="${
          demo.id === activeLab
        }" data-lab="${demo.id}">
          ${demo.title}
        </button>
      `,
    )
    .join("");

  tabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeLab = button.dataset.lab;
      renderLabTabs();
      renderLab();
    });
  });
}

function renderLab() {
  const demo = labDemos.find((item) => item.id === activeLab);
  const preview = document.querySelector("#lab-preview");
  const notes = document.querySelector("#lab-notes");

  preview.innerHTML = `
    <div class="lab-copy">
      <span class="project-label">Interactive Demo</span>
      <h3>${demo.title}</h3>
      <p>${demo.summary}</p>
    </div>
    ${demo.preview}
  `;

  notes.innerHTML = `
    <h3>구현 포인트</h3>
    <ul>${demo.notes.map((note) => `<li>${note}</li>`).join("")}</ul>
  `;

  if (demo.id === "state") initStateDemo();
  if (demo.id === "filter") initFilterDemo();
  if (demo.id === "form") initFormDemo();
}

function initStateDemo() {
  const stages = [
    {
      width: "34%",
      title: "요구사항 분석",
      text: "사용자 흐름을 먼저 정리하고 필요한 화면 상태를 컴포넌트 단위로 나눕니다.",
    },
    {
      width: "68%",
      title: "UI 설계",
      text: "반응형 레이아웃, 버튼 상태, 빈 화면, 에러 화면까지 함께 설계합니다.",
    },
    {
      width: "100%",
      title: "구현 완료",
      text: "상태 변화가 자연스럽게 보이도록 이벤트와 렌더링 흐름을 연결합니다.",
    },
  ];

  const buttons = document.querySelectorAll("[data-stage]");
  const meter = document.querySelector(".demo-meter span");
  const title = document.querySelector(".demo-copy strong");
  const text = document.querySelector(".demo-copy p");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const stage = stages[Number(button.dataset.stage)];
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      meter.style.width = stage.width;
      title.textContent = stage.title;
      text.textContent = stage.text;
    });
  });
}

function initFilterDemo() {
  const data = [
    { title: "Semoduck", tag: "React / 커머스" },
    { title: "AX Platform", tag: "AI Agent / Canvas" },
    { title: "Card RAG", tag: "Python / RAG" },
  ];
  const input = document.querySelector("#demo-search");
  const list = document.querySelector("#demo-list");

  function updateList() {
    const keyword = input.value.trim().toLowerCase();
    const filtered = data.filter((item) => `${item.title} ${item.tag}`.toLowerCase().includes(keyword));
    list.innerHTML = filtered.length
      ? filtered.map((item) => `<div><strong>${item.title}</strong><span>${item.tag}</span></div>`).join("")
      : `<p class="empty-state">검색 결과가 없습니다.</p>`;
  }

  input.addEventListener("input", updateList);
  updateList();
}

function initFormDemo() {
  const input = document.querySelector("#demo-email");
  const message = document.querySelector("#demo-email-message");
  const button = document.querySelector("#demo-submit");

  function validate() {
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!value) {
      message.textContent = "이메일을 입력하면 상태가 바로 표시됩니다.";
      message.className = "form-message";
    } else if (valid) {
      message.textContent = "좋습니다. 제출 가능한 이메일 형식입니다.";
      message.className = "form-message success";
    } else {
      message.textContent = "이메일 형식을 다시 확인해 주세요.";
      message.className = "form-message error";
    }
    return valid;
  }

  input.addEventListener("input", validate);
  button.addEventListener("click", validate);
}

function openModal(index) {
  const project = projects[index];
  const modal = document.querySelector("#project-modal");
  const content = document.querySelector("#modal-content");
  const links = Object.entries(project.links)
    .map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");

  content.innerHTML = `
    <div class="modal-image">
      <img src="${project.image}" alt="${project.name} 프로젝트 화면" />
    </div>
    <div class="modal-header">
      <span class="project-label">${project.label}</span>
      <h2>${project.name}</h2>
      <p>${project.description}</p>
    </div>
    <section>
      <h3>기술 스택</h3>
      <div class="modal-tags">${project.stack.map((item) => `<span>${item}</span>`).join("")}</div>
    </section>
    <section>
      <h3>주요 기능</h3>
      <ul>${project.features.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>배운 점</h3>
      <ul>${project.learned.map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>링크</h3>
      <div class="modal-links">${links}</div>
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

function initModal() {
  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

renderProjectFilters();
renderProjects();
renderSkills();
renderLabTabs();
renderLab();
initModal();

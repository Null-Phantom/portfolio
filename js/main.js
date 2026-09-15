/**
 * Yug Mittal Portfolio — Main JavaScript Controller
 * Implements interactive behaviors, dynamic data binding, modal windows,
 * live IST timekeeping, 3D tilt interactions, and custom cursor.
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveClock();
  initCustomCursor();
  initNavigation();
  initPolaroidTilt();
  renderProjects();
  renderTools();
  renderCurrently();
  renderBeyondCode();
  renderJournal();
  initModals();
  initEmailCopy();
  initContactForm();
  initNightCanvas();
  initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   01. LIVE GWALIOR (IST) TIMEKEEPER
   -------------------------------------------------------------------------- */
function initLiveClock() {
  function updateTime() {
    // Current time in IST (UTC+5:30)
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const timeFormatter = new Intl.DateTimeFormat([], options);
    const timeParts = timeFormatter.format(now);

    const clockEl = document.getElementById("live-gwalior-clock");
    if (clockEl) {
      clockEl.textContent = `${timeParts} IST (GWL)`;
    }

    const windowTimeEl = document.getElementById("window-live-time");
    if (windowTimeEl) {
      const shortFormatter = new Intl.DateTimeFormat([], {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      });
      windowTimeEl.textContent = shortFormatter.format(now);
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   02. CUSTOM SUBTLE MICRO CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.className = "custom-cursor-dot";
  const ring = document.createElement("div");
  ring.className = "custom-cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover state detection
  const interactiveSelector = "a, button, input, textarea, .polaroid, .journal-fragment-card, .tool-tile, .filter-btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove("cursor-hover");
    }
  });
}

/* --------------------------------------------------------------------------
   03. NAVIGATION & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const centerMenu = document.getElementById("nav-center-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  if (menuBtn && centerMenu) {
    menuBtn.addEventListener("click", () => {
      centerMenu.classList.toggle("open");
      menuBtn.textContent = centerMenu.classList.contains("open") ? "CLOSE" : "MENU";
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        centerMenu.classList.remove("open");
        menuBtn.textContent = "MENU";
      });
    });
  }

  // Scrollspy
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  });

  // Ambient sound toggle button bindings (navigation and corner control)
  const ambientBtn = document.getElementById("ambient-sound-toggle");
  if (ambientBtn) {
    ambientBtn.addEventListener("click", () => {
      if (window.ambientSound) {
        window.ambientSound.toggle();
      }
    });
  }

  const cornerBtn = document.getElementById("corner-sound-toggle");
  if (cornerBtn) {
    cornerBtn.addEventListener("click", () => {
      if (window.ambientSound) {
        window.ambientSound.toggle();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   04. POLAROID 3D TILT EFFECT
   -------------------------------------------------------------------------- */
function initPolaroidTilt() {
  const polaroids = document.querySelectorAll(".polaroid");

  polaroids.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      // Revert to initial class defined rotation
      card.style.transform = "";
    });
  });
}

/* --------------------------------------------------------------------------
   05. PROJECT RENDERING & FILTERING
   -------------------------------------------------------------------------- */
function renderProjects(filterCategory = "All") {
  const container = document.getElementById("projects-editorial-container");
  if (!container || !window.PORTFOLIO_DATA) return;

  const projects = window.PORTFOLIO_DATA.projects;
  const filtered = filterCategory === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));

  container.innerHTML = "";

  filtered.forEach((project, index) => {
    const isReverse = index % 2 !== 0 ? "reverse" : "";
    const card = document.createElement("div");
    card.className = `editorial-project-card ${isReverse}`;

    // Custom Mockup content based on project type
    let previewContent = "";
    if (project.id === "axiovital") {
      previewContent = `
        <div class="preview-axiovital">
          <div class="mockup-stat-card">
            <div class="stat-label">ICU OCCUPANCY</div>
            <div class="stat-val">84.2%</div>
          </div>
          <div class="mockup-stat-card">
            <div class="stat-label">DISPATCH LATENCY</div>
            <div class="stat-val">42ms</div>
          </div>
          <div class="telemetry-wave">
            <svg class="telemetry-svg" viewBox="0 0 300 40">
              <path d="M0,20 L60,20 L75,5 L85,35 L95,15 L105,25 L115,20 L180,20 L195,8 L205,32 L215,18 L225,20 L300,20" />
            </svg>
          </div>
        </div>
      `;
    } else if (project.id === "face-attendance") {
      previewContent = `
        <div class="preview-face-attendance">
          <div class="face-mesh-target">
            <div class="scanning-laser-line"></div>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <circle cx="12" cy="10" r="4"/>
              <path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
              <circle cx="10" cy="9" r="0.5" fill="currentColor"/>
              <circle cx="14" cy="9" r="0.5" fill="currentColor"/>
            </svg>
          </div>
        </div>
      `;
    } else if (project.id === "neural-canvas") {
      previewContent = `
        <div style="display:flex; flex-direction:column; gap:0.5rem; width:100%; padding:0.5rem;">
          <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.6rem; color:var(--text-muted);">
            <span>LATENT SAMPLER</span>
            <span style="color:var(--accent-sage);">30 FPS (WebGL)</span>
          </div>
          <div style="height:60px; border-radius:3px; background:radial-gradient(circle at 30% 40%, rgba(163,177,138,0.4), rgba(212,163,115,0.2) 60%, transparent 90%); border:1px solid rgba(255,255,255,0.06);"></div>
        </div>
      `;
    } else {
      previewContent = `
        <div style="display:flex; flex-direction:column; gap:0.5rem; width:100%; padding:0.5rem;">
          <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.6rem; color:var(--text-muted);">
            <span>POLYRHYTHM DSP</span>
            <span style="color:var(--accent-rose);">3:4 RATIO</span>
          </div>
          <div style="height:60px; display:flex; align-items:center; justify-content:space-around; background:#16161c; border-radius:3px;">
            <div style="width:4px; height:35px; background:var(--accent-rose);"></div>
            <div style="width:4px; height:18px; background:var(--accent-amber);"></div>
            <div style="width:4px; height:45px; background:var(--accent-rose);"></div>
            <div style="width:4px; height:24px; background:var(--accent-amber);"></div>
            <div style="width:4px; height:38px; background:var(--accent-rose);"></div>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="project-preview-container">
        <div class="project-mockup-canvas">
          <div class="mockup-window-header">
            <div class="mockup-window-dots">
              <span class="window-dot dot-red"></span>
              <span class="window-dot dot-yellow"></span>
              <span class="window-dot dot-green"></span>
            </div>
            <span class="mockup-window-title">${project.title.toLowerCase()}.config</span>
            <span style="font-family:var(--font-mono); font-size:0.6rem; color:var(--text-muted);">${project.year}</span>
          </div>
          <div class="mockup-window-body">
            ${previewContent}
          </div>
        </div>
      </div>

      <div class="project-info-container">
        <div class="project-meta-row">
          <span class="project-number-tag">${project.number}</span>
          <span class="project-year-badge">${project.category} · ${project.status}</span>
        </div>
        <h3 class="project-heading">${project.title}</h3>
        <div class="project-subtitle-text">${project.subtitle}</div>
        <p class="project-desc-para">${project.description}</p>
        <div class="project-tech-tags">
          ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <div class="project-actions-row">
          <button class="project-view-btn" onclick="openProjectModal('${project.id}')">
            EXPLORE PROJECT ARCHITECTURE <span class="arrow-icon">→</span>
          </button>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-view-btn" style="border-color:var(--border-subtle); color:var(--text-secondary);">
            GITHUB ↗
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Filter click handlers
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter");
      renderProjects(cat);
    });
  });
}

/* --------------------------------------------------------------------------
   06. TOOLS & SKILLS RENDERING
   -------------------------------------------------------------------------- */
function renderTools() {
  const container = document.getElementById("tools-wall-grid");
  if (!container || !window.PORTFOLIO_DATA) return;

  const tools = window.PORTFOLIO_DATA.tools;
  container.innerHTML = "";

  tools.forEach(tool => {
    const tile = document.createElement("div");
    tile.className = "tool-tile";
    tile.setAttribute("title", `${tool.experience}: ${tool.note}`);

    // SVG icon rendering
    const iconSvg = getToolSvgIcon(tool.name);

    tile.innerHTML = `
      <div class="tool-tile-icon">${iconSvg}</div>
      <div>
        <div class="tool-tile-name">${tool.name}</div>
        <div class="tool-tile-category">${tool.category}</div>
      </div>
    `;

    container.appendChild(tile);
  });
}

function getToolSvgIcon(name) {
  const n = name.toLowerCase();
  if (n.includes("python")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2C6.5 2 6 4 6 5.5V8h6v2H4c-2 0-3 1.5-3 4.5S2 19 4 19h2v-2.5c0-1.5 1-2.5 2.5-2.5h6c1.5 0 2.5-1 2.5-2.5V8c0-3-2-6-5-6z"/><circle cx="9" cy="5" r="0.8" fill="currentColor"/></svg>`;
  } else if (n.includes("javascript")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8v8M15 8v8"/></svg>`;
  } else if (n.includes("react")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;
  } else if (n.includes("node")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M12 12l9-5M12 12v10M12 12L3 7"/></svg>`;
  } else if (n.includes("postgres")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`;
  } else if (n.includes("opencv") || n.includes("vision")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/></svg>`;
  } else if (n.includes("docker")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 14h20c0 4-3 7-9 7s-10-2-11-7z"/><rect x="4" y="9" width="3" height="3"/><rect x="8" y="9" width="3" height="3"/><rect x="12" y="9" width="3" height="3"/></svg>`;
  } else if (n.includes("git")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v6M18 15l-6-6"/></svg>`;
  } else if (n.includes("vscode")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M18 2l-7 6-4-3-3 2 4 5-4 5 3 2 4-3 7 6 4-2V4l-4-2z"/></svg>`;
  } else if (n.includes("linux")) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 10l3 3-3 3M15 16h-3"/></svg>`;
  }
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>`;
}

/* --------------------------------------------------------------------------
   07. CURRENTLY STATUS BOARD RENDERING
   -------------------------------------------------------------------------- */
function renderCurrently() {
  const container = document.getElementById("currently-items-container");
  if (!container || !window.PORTFOLIO_DATA) return;

  const items = window.PORTFOLIO_DATA.currently;
  container.innerHTML = "";

  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "currently-item-row";
    row.innerHTML = `
      <div class="currently-item-icon">${item.icon}</div>
      <div>
        <div class="currently-item-text">${item.text}</div>
        <div class="currently-item-detail">${item.detail}</div>
      </div>
    `;
    container.appendChild(row);
  });
}

/* --------------------------------------------------------------------------
   08. BEYOND CODE RENDERING
   -------------------------------------------------------------------------- */
function renderBeyondCode() {
  const container = document.getElementById("beyond-cards-grid");
  if (!container || !window.PORTFOLIO_DATA) return;

  const cards = window.PORTFOLIO_DATA.beyondCode;
  container.innerHTML = "";

  cards.forEach(c => {
    const card = document.createElement("div");
    card.className = "beyond-card";
    card.innerHTML = `
      <div>
        <div class="beyond-tag">${c.tag}</div>
        <h3 class="beyond-title">${c.title}</h3>
        <p class="beyond-note">${c.note}</p>
      </div>
      <div class="beyond-quote">${c.quote}</div>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   09. JOURNAL FRAGMENTS RENDERING
   -------------------------------------------------------------------------- */
function renderJournal() {
  const container = document.getElementById("journal-fragments-grid");
  if (!container || !window.PORTFOLIO_DATA) return;

  const journal = window.PORTFOLIO_DATA.journal;
  container.innerHTML = "";

  journal.forEach(entry => {
    const card = document.createElement("div");
    card.className = "journal-fragment-card";
    card.setAttribute("onclick", `openJournalModal('${entry.id}')`);

    card.innerHTML = `
      <div>
        <div class="journal-card-top">
          <span class="journal-date">${entry.date}</span>
          <span class="journal-tag-badge">${entry.tag}</span>
        </div>
        <h3 class="journal-title">${entry.title}</h3>
        <p class="journal-snippet">${entry.snippet}</p>
      </div>
      <div class="journal-read-link">
        READ FRAGMENT <span>→</span>
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   10. MODAL DIALOGS (PROJECT & JOURNAL)
   -------------------------------------------------------------------------- */
function initModals() {
  const overlay = document.getElementById("global-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");

  if (overlay && closeBtn) {
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }
}

function openProjectModal(id) {
  const project = window.PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!project) return;

  const contentBox = document.getElementById("modal-inner-content");
  const overlay = document.getElementById("global-modal-overlay");

  contentBox.innerHTML = `
    <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-amber); margin-bottom:0.5rem;">
      PROJECT // ${project.number} · ${project.category}
    </div>
    <h2 style="font-family:var(--font-serif); font-size:2.4rem; color:var(--text-primary); line-height:1.1; margin-bottom:0.5rem;">
      ${project.title}
    </h2>
    <div style="font-family:var(--font-sans); color:var(--accent-warm); font-size:1.05rem; margin-bottom:1.5rem;">
      ${project.subtitle}
    </div>
    <div style="color:var(--text-secondary); line-height:1.75; font-size:1rem; margin-bottom:2rem;">
      ${project.longDescription}
    </div>
    <h4 style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-primary); letter-spacing:0.08em; margin-bottom:1rem;">
      ARCHITECTURAL HIGHLIGHTS
    </h4>
    <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem; margin-bottom:2rem;">
      ${project.highlights.map(h => `
        <li style="display:flex; align-items:flex-start; gap:0.75rem; color:var(--text-secondary); font-size:0.95rem;">
          <span style="color:var(--accent-amber); font-family:var(--font-mono);">—</span>
          <span>${h}</span>
        </li>
      `).join("")}
    </ul>
    <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:2.5rem;">
      ${project.tags.map(t => `<span class="tech-tag" style="background:var(--bg-card); border-color:var(--border-medium);">${t}</span>`).join("")}
    </div>
    <div style="display:flex; gap:1.25rem;">
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-editorial-primary">
        SOURCE REPOSITORY ↗
      </a>
      <button onclick="closeModal()" class="btn-editorial-secondary">
        BACK TO WORK
      </button>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function openJournalModal(id) {
  const entry = window.PORTFOLIO_DATA.journal.find(j => j.id === id);
  if (!entry) return;

  const contentBox = document.getElementById("modal-inner-content");
  const overlay = document.getElementById("global-modal-overlay");

  contentBox.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${entry.date}</span>
      <span class="journal-tag-badge">${entry.tag}</span>
    </div>
    <h2 style="font-family:var(--font-serif); font-size:2.3rem; color:var(--text-primary); line-height:1.15; margin-bottom:1.5rem;">
      ${entry.title}
    </h2>
    <div style="font-family:var(--font-serif); font-size:1.2rem; font-style:italic; color:var(--accent-amber); margin-bottom:2rem; border-left:2px solid var(--accent-amber); padding-left:1rem;">
      "${entry.snippet}"
    </div>
    <div style="color:var(--text-secondary); line-height:1.8; font-size:1.05rem; margin-bottom:2.5rem; white-space:pre-line;">
      ${entry.content}
    </div>
    <div style="display:flex; justify-content:flex-end;">
      <button onclick="closeModal()" class="btn-editorial-secondary">
        CLOSE NOTE
      </button>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("global-modal-overlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Make functions globally accessible
window.openProjectModal = openProjectModal;
window.openJournalModal = openJournalModal;
window.closeModal = closeModal;

/* --------------------------------------------------------------------------
   11. EMAIL COPY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyBtn = document.getElementById("copy-email-action-btn");
  if (copyBtn && window.PORTFOLIO_DATA) {
    copyBtn.addEventListener("click", () => {
      const email = window.PORTFOLIO_DATA.personal.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard.`);
      }).catch(() => {
        showToast("Email: " + email);
      });
    });
  }
}

function showToast(message) {
  const toast = document.getElementById("global-toast-notice");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* --------------------------------------------------------------------------
   12. CONTACT FORM SIMULATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-message-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value;
      showToast(`Thank you, ${name}! Message dispatched to Yug.`);
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   13. NIGHT WINDOW AMBIENT PARTICLES CANVAS
   -------------------------------------------------------------------------- */
function initNightCanvas() {
  const canvas = document.getElementById("window-stars-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const stars = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.5,
    alpha: Math.random() * 0.7 + 0.2,
    speed: Math.random() * 0.015 + 0.005
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 0.9 || s.alpha < 0.2) s.speed = -s.speed;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 163, 115, ${Math.max(0, s.alpha)})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });
}

/* --------------------------------------------------------------------------
   14. KEYBOARD SHORTCUTS
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "m" || e.key === "M") {
      if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        if (window.ambientSound) {
          window.ambientSound.toggle();
          showToast(window.ambientSound.isPlaying ? "Ambient Rain: ON" : "Ambient Rain: OFF");
        }
      }
    }
  });
}

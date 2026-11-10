/* Nightfall16 portfolio: renders everything from portfolio.json. No dependencies. */
(() => {
  "use strict";

  const CATEGORIES = {
    editorTools: "Editor Tools",
    gameDevTools: "Game Dev Tools",
    gameProjects: "Game Projects",
  };
  const THUMB_W = 720;
  const SITE_TITLE = document.title;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    youtube: '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>',
    linkedin: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>',
    artstation: '<path d="M0 17.723l2.027 3.51h.001a2.424 2.424 0 002.164 1.333h13.457l-2.79-4.843H0zm24 .023a2.422 2.422 0 00-.288-1.164l-9.522-16.5a2.426 2.426 0 00-2.098-1.215H7.548l13.13 22.748A2.43 2.43 0 0024 17.746zM11.23 12.18l-2.827-4.902-5.59 9.69h11.242l-2.825-4.788z"/>',
    instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>',
    steam: '<path d="M11.98 0C5.67 0 .5 4.86 0 11.04l6.43 2.66a3.4 3.4 0 0 1 2.15-.6l2.86-4.15v-.06a4.53 4.53 0 1 1 4.53 4.53h-.1l-4.08 2.91.01.16a3.4 3.4 0 0 1-6.73.68L.44 15.6A12 12 0 1 0 11.98 0zM7.54 18.21l-1.47-.61a2.55 2.55 0 1 0 1.4-3.5l1.52.63a1.88 1.88 0 1 1-1.45 3.48zm11.42-9.3a3.02 3.02 0 1 0-6.04 0 3.02 3.02 0 0 0 6.04 0zm-5.28 0a2.27 2.27 0 1 1 4.54 0 2.27 2.27 0 0 1-4.54 0z"/>',
    github: '<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>',
    external: '<path d="M14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7zm5 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/>',
    arrowRight: '<path d="M12 4l-1.4 1.4 5.6 5.6H4v2h12.2l-5.6 5.6L12 20l8-8z"/>',
    arrowLeft: '<path d="M12 20l1.4-1.4L7.8 13H20v-2H7.8l5.6-5.6L12 4l-8 8z"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    image: '<path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const plain = (html = "") => html.replace(/<[^>]*>/g, "");

  const state = { data: null, projects: [], homeScroll: null, hashBeforeProject: "" };

  /* ---------- Media helpers ---------- */

  const thumbOf = (src) => src.replace(/\.avif$/, "-720.avif");

  /** Responsive AVIF <img>: 720px thumbnail + full size in srcset, intrinsic size to avoid layout shift. */
  function img(m, { sizes = "100vw", eager = false, alt } = {}) {
    const src = m.src;
    const hasThumb = m.w > THUMB_W;
    const srcset = hasThumb ? ` srcset="${esc(thumbOf(src))} ${THUMB_W}w, ${esc(src)} ${m.w}w" sizes="${sizes}"` : "";
    const size = m.w ? ` width="${m.w}" height="${m.h}"` : "";
    return `<img src="${esc(hasThumb ? thumbOf(src) : src)}"${srcset}${size} alt="${esc(alt ?? m.alt ?? "")}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }

  const ytId = (url) => (url.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/) || [])[1];
  const ytThumb = (id, size = "hqdefault") => `https://i.ytimg.com/vi_webp/${id}/${size}.webp`;

  function allMedia(p) {
    return [...(p.media || []), ...(p.subsections || []).flatMap((s) => s.media || [])];
  }

  /** Card cover: prefer our own AVIF (image or video poster), fall back to the YouTube thumbnail. */
  function coverOf(p) {
    const media = allMedia(p);
    const own = media.find((m) => m.type === "image" || (m.type === "video" && m.poster));
    if (own) {
      const src = own.type === "image" ? own.src : own.poster;
      return img({ src, w: own.w, h: own.h }, { sizes: "(max-width: 760px) 100vw, 400px", alt: "" });
    }
    const yt = media.find((m) => m.type === "youtube");
    if (yt) return `<img src="${ytThumb(ytId(yt.src))}" width="480" height="360" alt="" loading="lazy" decoding="async">`;
    return "";
  }

  function mediaCounts(p) {
    const media = allMedia(p);
    const videos = media.filter((m) => m.type !== "image").length;
    const images = media.length - videos;
    const parts = [];
    if (videos) parts.push(`${icon("play")}${videos} video${videos > 1 ? "s" : ""}`);
    if (images) parts.push(`${icon("image")}${images} image${images > 1 ? "s" : ""}`);
    return parts.join('<span aria-hidden="true">·</span>');
  }

  function tile(m, group, sizes) {
    const caption = m.title || m.alt || "";
    return `<button class="tile" type="button" data-full="${esc(m.src)}" data-caption="${esc(caption)}" data-group="${esc(group)}" aria-label="Enlarge image${caption ? `: ${esc(caption)}` : ""}">${img(m, { sizes })}</button>`;
  }

  function videoFrame(m) {
    if (m.type === "youtube") {
      const id = ytId(m.src);
      return `<figure class="media-item"><div class="frame">
          <button class="yt" type="button" data-yt="${id}" data-title="${esc(m.title || "")}" aria-label="Play video${m.title ? `: ${esc(m.title)}` : ""}">
            <img src="${ytThumb(id, "sddefault")}" data-fallback="${ytThumb(id)}" alt="" loading="lazy" decoding="async" width="640" height="480">
            <span class="yt-play">${icon("play")}</span>
            ${m.title ? `<span class="yt-title">${esc(m.title)}</span>` : ""}
          </button>
        </div></figure>`;
    }
    const auto = m.autoplay !== false && !reducedMotion;
    return `<figure class="media-item"><div class="frame">
        <video controls muted loop playsinline preload="none"${m.poster ? ` poster="${esc(m.poster)}"` : ""}${auto ? " data-autoplay" : ""}>
          ${m.av1 ? `<source src="${esc(m.av1)}" type='video/mp4; codecs="av01.0.09M.08, mp4a.40.2"'>` : ""}
          <source src="${esc(m.src)}" type="video/mp4">
        </video>
      </div>${m.title ? `<figcaption>${esc(m.title)}</figcaption>` : ""}</figure>`;
  }

  function gallery(media, group) {
    const videos = media.filter((m) => m.type !== "image");
    const images = media.filter((m) => m.type === "image");
    let html = "";
    if (videos.length) html += `<div class="media-videos${videos.length > 1 ? " two" : ""}">${videos.map(videoFrame).join("")}</div>`;
    if (images.length) {
      const single = images.length === 1;
      const sizes = single ? "(max-width: 1200px) 100vw, 1140px" : "(max-width: 760px) 100vw, 560px";
      html += `<div class="media-images${single ? " single" : ""}">${images
        .map((m) => `<figure class="media-item">${tile(m, group, sizes)}${m.alt ? `<figcaption>${esc(m.alt)}</figcaption>` : ""}</figure>`)
        .join("")}</div>`;
    }
    return html;
  }

  /* ---------- Home view ---------- */

  function socials(profile) {
    return profile.socials
      .map((s) => `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}" title="${esc(s.name)}">${icon(s.icon)}</a>`)
      .join("");
  }

  function renderProfile({ profile }) {
    $("[data-handle]").textContent = `${profile.handle} · Unreal Engine`;
    $("[data-name]").textContent = profile.name;
    $("[data-role]").textContent = profile.role;
    $("[data-tagline]").textContent = profile.tagline;
    $("[data-name-plain]").textContent = `${profile.name} (${profile.handle})`;
    $("[data-year]").textContent = new Date().getFullYear();
    const avatar = $("[data-avatar]");
    avatar.src = profile.avatar.src;
    $$("[data-socials]").forEach((el) => (el.innerHTML = socials(profile)));
    const yt = profile.socials.find((s) => s.icon === "youtube");
    const ytCta = $("[data-youtube-cta]");
    if (yt) ytCta.href = yt.url;
    else ytCta.remove();
  }

  function renderStats(data) {
    const tools = (data.editorTools?.length || 0) + (data.gameDevTools?.length || 0);
    const games = data.gameProjects?.length || 0;
    const stats = [
      [data.profile.experience, "years building games & tools"],
      [tools, "Unreal tools & plugins"],
      [games, "game projects"],
    ];
    $("[data-stats]").innerHTML = stats.map(([v, l]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join("");
  }

  function renderWork() {
    const counts = { all: state.projects.length };
    state.projects.forEach((p) => (counts[p.cat] = (counts[p.cat] || 0) + 1));
    const filters = [["all", "All"], ...Object.entries(CATEGORIES).filter(([k]) => counts[k])];

    const filterEl = $("[data-filters]");
    filterEl.innerHTML = filters
      .map(([k, label]) => `<button class="chip-btn" type="button" data-filter="${k}" aria-pressed="${k === "all"}">${label}<small>${counts[k]}</small></button>`)
      .join("");

    $("[data-grid]").innerHTML = state.projects
      .map(
        (p) => `<a class="card reveal" id="card-${esc(p.id)}" href="#/project/${encodeURIComponent(p.id)}" data-cat="${p.cat}">
          <div class="card-cover">${coverOf(p)}<span class="card-badge">${mediaCounts(p)}</span></div>
          <div class="card-body">
            <span class="card-tag" data-cat="${p.cat}">${CATEGORIES[p.cat]}</span>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary || plain(p.description?.[0] || ""))}</p>
            <span class="card-more">View project ${icon("arrowRight")}</span>
          </div>
        </a>`
      )
      .join("");

    filterEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      const f = btn.dataset.filter;
      $$("[data-filter]", filterEl).forEach((b) => b.setAttribute("aria-pressed", b === btn));
      $$(".card", $("[data-grid]")).forEach((c) => (c.hidden = f !== "all" && c.dataset.cat !== f));
    });
  }

  function renderArt(groups = []) {
    $("[data-art]").innerHTML = groups
      .map((g, i) => {
        const badges = g.images.every((m) => m.w < 600);
        const cls = badges ? "badges" : g.images.length > 6 ? "masonry" : "masonry compact";
        const sizes = badges ? "200px" : "(max-width: 760px) 100vw, 400px";
        return `<div class="art-group reveal">
            <div class="art-group-head"><h3>${esc(g.title)}</h3>${g.description ? `<p>${g.description}</p>` : ""}</div>
            <div class="${cls}">${g.images.map((m) => tile(m, `art-${i}`, sizes)).join("")}</div>
          </div>`;
      })
      .join("");
  }

  function renderAbout(about = {}) {
    const skills = ["C++", "Unreal Engine", "Editor tools", "Gameplay Ability System", "AI (GOAP)", "Multiplayer", "VR", "wxWidgets", "3D character art"];
    $("[data-about]").innerHTML = `
      <div class="about-intro reveal">
        ${(about.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
        <ul class="skills" aria-label="Skills">${skills.map((s) => `<li>${s}</li>`).join("")}</ul>
      </div>
      <div class="journey">
        ${(about.sections || [])
          .map((s, i) => `<div class="journey-card reveal" data-step="${String(i + 1).padStart(2, "0")}"><h3>${esc(s.heading)}</h3><p>${s.content}</p></div>`)
          .join("")}
      </div>`;
  }

  /* ---------- Project view ---------- */

  function linkButton(l, i) {
    const url = l.url;
    const ic = /steampowered/.test(url) ? "steam" : /github\.com/.test(url) ? "github" : "external";
    const text = /^fab$/i.test(l.text) ? "Get it on Fab" : l.text;
    return `<a class="btn ${i === 0 ? "btn-primary" : "btn-ghost"} btn-sm" href="${esc(url)}" target="_blank" rel="noopener">${icon(ic)}${esc(text)}</a>`;
  }

  function renderProject(p) {
    const idx = state.projects.indexOf(p);
    const prev = state.projects[idx - 1];
    const next = state.projects[idx + 1];
    const group = `proj-${p.id}`;

    let media = "";
    if (p.media?.length) media += `<section class="media-block"><h2>Gallery</h2>${gallery(p.media, group)}</section>`;
    (p.subsections || []).forEach((s) => {
      media += `<section class="media-block"><h3>${esc(s.title)}</h3>${s.description ? `<p>${s.description}</p>` : ""}${gallery(s.media || [], group)}</section>`;
    });

    const view = $("#view-project");
    view.innerHTML = `<div class="container">
        <a class="back-link" href="#work" data-back>${icon("arrowLeft")}All projects</a>
        <header class="project-head">
          <span class="card-tag" data-cat="${p.cat}">${CATEGORIES[p.cat]}</span>
          <h1 tabindex="-1">${esc(p.title)}</h1>
          ${p.summary ? `<p class="project-lead">${esc(p.summary)}</p>` : ""}
          ${p.links?.length ? `<div class="project-links">${p.links.map(linkButton).join("")}</div>` : ""}
        </header>
        ${
          p.description?.length || p.features?.length
            ? `<div class="project-body">
                ${p.description?.length ? `<div class="project-desc">${p.description.map((d) => `<p>${d}</p>`).join("")}</div>` : ""}
                ${p.features?.length ? `<section class="features"><h2>${esc(p.featuresHeading || "Key features")}</h2><ul class="feature-list">${p.features.map((f) => `<li>${f.replace(/:<\/strong>\s*/, "</strong>")}</li>`).join("")}</ul></section>` : ""}
              </div>`
            : ""
        }
        ${media}
        <nav class="pager" aria-label="More projects">
          ${prev ? `<a class="prev" href="#/project/${encodeURIComponent(prev.id)}"><small>← Previous</small><span>${esc(prev.title)}</span></a>` : ""}
          ${next ? `<a class="next" href="#/project/${encodeURIComponent(next.id)}"><small>Next →</small><span>${esc(next.title)}</span></a>` : ""}
        </nav>
      </div>`;

    observeVideos(view);
    document.title = `${p.title} · Nightfall16`;
  }

  /* ---------- Router ---------- */

  const homeView = () => $("#view-home");
  const projectView = () => $("#view-project");

  function route(e) {
    const match = location.hash.match(/^#\/project\/(.+)$/);
    const project = match && state.projects.find((p) => p.id === decodeURIComponent(match[1]));
    if (project) return showProject(project, e);
    showHome(e);
  }

  function showProject(p, e) {
    if (!homeView().hidden) {
      state.homeScroll = scrollY;
      state.hashBeforeProject = e?.oldURL ? new URL(e.oldURL).hash : "";
    }
    renderProject(p);
    homeView().hidden = true;
    projectView().hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    $("h1", projectView()).focus({ preventScroll: true });
  }

  function showHome(e) {
    const fromProject = !projectView().hidden;
    projectView().hidden = true;
    projectView().innerHTML = ""; // stops any playing video / iframe
    homeView().hidden = false;
    document.title = SITE_TITLE;

    const target = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (fromProject && state.homeScroll != null && location.hash === state.hashBeforeProject) {
      window.scrollTo({ top: state.homeScroll, behavior: "instant" }); // back to where the visitor was
    } else if (target && (fromProject || !e)) {
      target.scrollIntoView({ behavior: e ? "smooth" : "instant" });
    } else if (fromProject) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  /* ---------- Lightbox ---------- */

  const lb = { el: null, items: [], i: 0 };

  function openLightbox(tileEl) {
    const group = tileEl.dataset.group;
    lb.items = $$(`.tile[data-group="${CSS.escape(group)}"]`).filter((t) => t.offsetParent !== null);
    lb.i = Math.max(0, lb.items.indexOf(tileEl));
    lb.el.classList.toggle("single", lb.items.length < 2);
    showSlide();
    lb.el.showModal();
  }

  function showSlide() {
    const t = lb.items[lb.i];
    const im = $(".lb-img", lb.el);
    im.src = t.dataset.full;
    im.alt = t.dataset.caption || "";
    $(".lb-text", lb.el).textContent = t.dataset.caption || "";
    $(".lb-count", lb.el).textContent = `${lb.i + 1} / ${lb.items.length}`;
    // Warm the next image so stepping through feels instant.
    const next = lb.items[(lb.i + 1) % lb.items.length];
    if (next) new Image().src = next.dataset.full;
  }

  function step(d) {
    if (lb.items.length < 2) return;
    lb.i = (lb.i + d + lb.items.length) % lb.items.length;
    showSlide();
  }

  function initLightbox() {
    lb.el = $("#lightbox");
    lb.el.addEventListener("click", (e) => {
      const action = e.target.closest("[data-lb]")?.dataset.lb;
      if (action === "close") lb.el.close();
      else if (action === "prev") step(-1);
      else if (action === "next") step(1);
      else if (!e.target.closest(".lb-img")) lb.el.close();
    });
    lb.el.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    let startX = null;
    lb.el.addEventListener("pointerdown", (e) => (startX = e.clientX));
    lb.el.addEventListener("pointerup", (e) => {
      if (startX == null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50 && e.pointerType !== "mouse") step(dx < 0 ? 1 : -1);
    });
    lb.el.addEventListener("close", () => ($(".lb-img", lb.el).src = ""));
  }

  /* ---------- Observers ---------- */

  const videoObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach(({ target: v, isIntersecting }) => {
        if (isIntersecting && "autoplay" in v.dataset) v.play().catch(() => {});
        else if (!isIntersecting && !v.paused) v.pause();
      }),
    { threshold: 0.5 }
  );
  function observeVideos(root) {
    videoObserver.disconnect();
    $$("video", root).forEach((v) => videoObserver.observe(v));
  }

  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revealObserver.unobserve(en.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" }
  );

  function initNav() {
    const nav = $("#nav");
    const toggle = $("#nav-toggle");
    const menu = $("#nav-menu");
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    addEventListener("hashchange", () => setOpen(false));

    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Highlight the nav link of the section in view.
    const links = $$(".nav-menu > a");
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.hash === `#${en.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", "work", "art", "about"].forEach((id) => spy.observe(document.getElementById(id)));
  }

  function initDelegates() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest(".tile");
      if (t) return openLightbox(t);

      const yt = e.target.closest("[data-yt]");
      if (yt) {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${yt.dataset.yt}?autoplay=1&rel=0`;
        iframe.title = yt.dataset.title || "YouTube video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        yt.replaceWith(iframe);
        $$("video").forEach((v) => v.pause());
        return;
      }

      const back = e.target.closest("[data-back]");
      if (back && state.homeScroll != null) {
        e.preventDefault();
        history.back();
      }
    });

    // sddefault YouTube thumbnails don't exist for every video: fall back to hqdefault.
    document.addEventListener(
      "error",
      (e) => {
        const el = e.target;
        if (el.tagName === "IMG" && el.dataset.fallback && el.src !== el.dataset.fallback) el.src = el.dataset.fallback;
      },
      true
    );
  }

  /* ---------- Boot ---------- */

  async function boot() {
    history.scrollRestoration = "manual";
    initNav();
    initLightbox();
    initDelegates();

    try {
      const res = await fetch("portfolio.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.data = await res.json();
    } catch (err) {
      console.error("Could not load portfolio.json", err);
      $("[data-grid]").innerHTML = '<p class="noscript">Projects could not be loaded. Please refresh the page.</p>';
      return;
    }

    const data = state.data;
    state.projects = Object.keys(CATEGORIES).flatMap((cat) => (data[cat] || []).map((p) => ({ ...p, cat })));

    renderProfile(data);
    renderStats(data);
    renderWork();
    renderArt(data.art);
    renderAbout(data.about);

    if (reducedMotion) $$(".reveal").forEach((el) => el.classList.add("in"));
    else $$(".reveal").forEach((el) => revealObserver.observe(el));

    addEventListener("hashchange", route);
    route();
  }

  boot();
})();

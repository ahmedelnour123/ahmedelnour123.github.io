// Renders the page from window.SITE (content.js). No build step, no dependencies.
(() => {
  const site = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // el("a.btn", { href }, child, ...): tiny element builder; text children are escaped.
  function el(spec, attrs = {}, ...children) {
    const [tag, ...classes] = spec.split(".");
    const node = document.createElement(tag);
    if (classes.length) node.className = classes.join(" ");
    for (const [key, value] of Object.entries(attrs)) {
      if (value === false || value == null) continue;
      if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    node.append(...children.flat(Infinity).filter((c) => c != null && c !== false));
    return node;
  }
  const icon = (cls) => el("i", { class: cls, "aria-hidden": "true" });

  // ---------- Media ----------
  const ytThumb = (id, size = "hqdefault") => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

  function resolveMedia(ref, slug) {
    if (ref.startsWith("yt:")) {
      const id = ref.slice(3);
      return { type: "youtube", id, thumb: ytThumb(id, "mqdefault") };
    }
    const src = /^(https?:)?\//.test(ref) ? ref : `images/projects/${slug}/${ref}`;
    const type = /\.(mp4|webm)$/i.test(ref) ? "video" : "image";
    return { type, src, thumb: type === "image" ? src : null };
  }

  function coverOf(project) {
    if (project.cover) return resolveMedia(project.cover, project.slug).src;
    const media = project.media.map((m) => resolveMedia(m, project.slug));
    const image = media.find((m) => m.type === "image");
    return image ? image.src : media.find((m) => m.thumb)?.thumb;
  }

  // ---------- Shared bits ----------
  const cvLink = (cv, cls, withIcon = true) =>
    el(`a.${cls}`, { href: cv.file, download: cv.filename }, withIcon && icon("fa-solid fa-file-arrow-down"), cv.label);

  function renderCVs() {
    $$('[data-slot="cv-buttons"]').forEach((slot) =>
      slot.replaceChildren(...site.cvs.map((cv, i) => cvLink(cv, i === 0 ? "btn.btn-primary" : "btn.btn-ghost"))));
    $$('[data-slot="cv-buttons-alt"]').forEach((slot) =>
      slot.replaceChildren(...site.cvs.map((cv) => cvLink(cv, "btn.btn-ghost"))));
    $$('[data-slot="cv-list"]').forEach((slot) =>
      slot.replaceChildren(...site.cvs.map((cv) => cvLink(cv, "cv-item"))));
  }

  function renderSocials() {
    $$('[data-slot="socials"]').forEach((slot) =>
      slot.replaceChildren(...site.socials.map((s) => {
        const external = !s.url.startsWith("mailto:");
        return el("a", {
          href: s.url, title: s.label, "aria-label": s.label,
          target: external && "_blank", rel: external && "noopener",
        }, icon(s.icon));
      })));
  }

  // The showreel loads YouTube only after a click: faster page, no third-party requests up front.
  // Its poster is site.showreelPoster, or else a mosaic of the first four project covers.
  function renderShowreel() {
    const slot = $('[data-slot="showreel"]');
    if (!slot || !site.showreel) return;
    const id = site.showreel;
    const poster = site.showreelPoster
      ? el("img", { src: site.showreelPoster, alt: "" })
      : el("span.reel-mosaic", {}, site.projects.slice(0, 4).map((p) => el("img", { src: coverOf(p), alt: "" })));
    const button = el("button.reel-play", {
      type: "button", "aria-label": "Play showreel",
      onclick: () => slot.replaceChildren(el("iframe", {
        src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
        title: "Showreel", allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: true,
      })),
    }, poster, el("span.reel-play-icon", {}, icon("fa-solid fa-play")), el("span.reel-label", {}, "Watch the showreel"));
    slot.replaceChildren(button);
  }

  // ---------- Projects ----------
  const trackBadge = (track) =>
    el(`span.track${track === "game" ? ".track-game" : ""}`, {}, site.tracks[track] || track);

  function renderProjects() {
    const slot = $('[data-slot="projects"]');
    slot.replaceChildren(...site.projects.map((project) => {
      const cover = coverOf(project);
      const videos = project.media.filter((m) => m.startsWith("yt:") || /\.(mp4|webm)$/i.test(m)).length;
      const media = el("div.card-media", {},
        el("div.backdrop", { style: `background-image:url("${cover}")` }),
        el("img", { src: cover, alt: "", loading: "lazy" }),
        project.badge && el("span.card-badge", {}, project.badge),
        videos > 0 && el("span.card-video-count", {}, icon("fa-solid fa-play"), `${videos} video${videos > 1 ? "s" : ""}`));
      const img = $("img", media);
      img.addEventListener("load", () => media.classList.toggle("portrait", img.naturalHeight > img.naturalWidth));

      return el("button.card", {
        type: "button", "data-slug": project.slug, "data-tracks": project.tracks.join(" "),
        "aria-label": `${project.title}: open details`,
        onclick: () => openProject(project.slug),
      },
        media,
        el("div.card-body", {},
          el("div.tracks", {}, project.tracks.map(trackBadge)),
          el("h3.card-title", {}, project.title, icon("fa-solid fa-arrow-up-right-from-square")),
          el("p.card-summary", {}, project.summary),
          el("div.tags", {}, project.tags.map((t) => el("span", {}, t)))));
    }));
  }

  function renderFilters() {
    const slot = $('[data-slot="filters"]');
    const options = [["all", "All", site.projects.length]].concat(
      Object.entries(site.tracks).map(([key, label]) =>
        [key, label, site.projects.filter((p) => p.tracks.includes(key)).length]));
    const chips = options.map(([key, label, count]) =>
      el("button.chip", { type: "button", "aria-pressed": key === "all" ? "true" : "false", onclick: () => apply(key) },
        label, el("span.count", {}, String(count))));
    function apply(key) {
      chips.forEach((chip, i) => chip.setAttribute("aria-pressed", String(options[i][0] === key)));
      $$(".card").forEach((card) => { card.hidden = key !== "all" && !card.dataset.tracks.split(" ").includes(key); });
    }
    slot.replaceChildren(...chips);
  }

  // ---------- Experience, skills, education ----------
  function renderExperience() {
    const list = (items) => el("ul.job-items", {}, items.map((t) => el("li", {}, t)));
    $('[data-slot="experience"]').replaceChildren(...site.experience.map((job) =>
      el("li.job", {},
        el("div.job-meta", {},
          el("span.job-dates", {}, job.dates),
          el("span.job-location", {}, job.location)),
        el("div", {},
          el("h3.job-role", {}, job.role),
          el("p.job-company", {}, job.company),
          job.groups
            ? job.groups.map((g) => [el("p.job-group", {}, g.title), list(g.items)])
            : list(job.items)))));
  }

  function renderSkills() {
    $('[data-slot="skills"]').replaceChildren(...site.skills.map((group) =>
      el("div.skill-group", {},
        el("h3.card-label", {}, group.group),
        el("div.pills", {}, group.items.map((s) => el("span", {}, s))))));
    $('[data-slot="education"]').replaceChildren(...site.education.map((e) =>
      el("li", {},
        el("p.edu-title", {}, e.title),
        el("p.edu-place", {}, e.place),
        el("p.edu-date", {}, e.date))));
  }

  // ---------- Project modal ----------
  const modal = $("#project-modal");
  const stage = $("#m-stage");
  const thumbs = $("#m-thumbs");
  let current = null;
  let mediaIndex = 0;

  const linkTypes = {
    play: { label: "Google Play", icon: "fa-brands fa-google-play" },
    download: { label: "Download", icon: "fa-solid fa-download" },
    web: { label: "Live", icon: "fa-solid fa-globe" },
    code: { label: "Code", icon: "fa-brands fa-github" },
  };

  function openProject(slug) {
    const project = site.projects.find((p) => p.slug === slug);
    if (!project) return;
    current = { ...project, media: project.media.map((m) => resolveMedia(m, project.slug)) };

    $("#m-title").textContent = project.title;
    $("#m-tracks").replaceChildren(...project.tracks.map(trackBadge));
    $("#m-links").replaceChildren(...Object.entries(linkTypes)
      .filter(([key]) => project.links?.[key])
      .map(([key, t], i) => el(`a.btn.btn-small.${i === 0 ? "btn-primary" : "btn-ghost"}`,
        { href: project.links[key], target: "_blank", rel: "noopener" }, icon(t.icon), t.label)));

    const section = (title, ...body) => el("div", {}, el("h3", {}, title), ...body);
    $("#m-text").replaceChildren(
      el("p", {}, project.summary),
      project.challenge && section("The challenge", el("p", {}, project.challenge)),
      project.solution && section("What I built", el("p", {}, project.solution)),
      project.highlights?.length && section("Highlights", el("ul", {}, project.highlights.map((h) => el("li", {}, h)))));
    $("#m-tags").replaceChildren(...project.tags.map((t) => el("span", {}, t)));

    thumbs.replaceChildren(...current.media.map((m, i) =>
      el("button.thumb", { type: "button", role: "tab", "aria-label": `Media ${i + 1}`, onclick: () => showMedia(i) },
        m.thumb ? el("img", { src: m.thumb, alt: "", loading: "lazy" }) : null,
        m.type !== "image" && icon("fa-solid fa-play"))));
    thumbs.hidden = current.media.length < 2;

    showMedia(0);
    if (!modal.open) modal.showModal();
    $(".modal-body", modal).scrollTop = 0;
    if (location.hash !== `#work/${slug}`) history.replaceState(null, "", `#work/${slug}`);
  }

  function showMedia(index) {
    if (!current || !current.media.length) return stage.replaceChildren();
    mediaIndex = (index + current.media.length) % current.media.length;
    const m = current.media[mediaIndex];
    let view;
    if (m.type === "youtube") {
      view = el("iframe", {
        src: `https://www.youtube-nocookie.com/embed/${m.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
        title: `${current.title} video`, allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: true,
      });
    } else if (m.type === "video") {
      view = el("video", { src: m.src, controls: true, autoplay: true, loop: true, playsinline: true });
      view.muted = true; // the attribute alone doesn't satisfy autoplay rules on created elements
    } else {
      view = el("img", { src: m.src, alt: `${current.title} screenshot` });
    }
    const multi = current.media.length > 1;
    stage.replaceChildren(view,
      multi && el("button.stage-nav.stage-prev", { type: "button", "aria-label": "Previous", onclick: () => showMedia(mediaIndex - 1) }, icon("fa-solid fa-chevron-left")),
      multi && el("button.stage-nav.stage-next", { type: "button", "aria-label": "Next", onclick: () => showMedia(mediaIndex + 1) }, icon("fa-solid fa-chevron-right")));
    $$(".thumb", thumbs).forEach((t, i) => t.setAttribute("aria-selected", String(i === mediaIndex)));
    // Center the active thumb by scrolling the strip only (scrollIntoView would also scroll the dialog).
    const active = thumbs.children[mediaIndex];
    if (active) thumbs.scrollTo({ left: active.offsetLeft - (thumbs.clientWidth - active.clientWidth) / 2, behavior: "smooth" });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest('[data-action="close"]')) modal.close();
  });
  modal.addEventListener("keydown", (e) => {
    if (e.target.closest("iframe, video")) return;
    if (e.key === "ArrowRight") showMedia(mediaIndex + 1);
    if (e.key === "ArrowLeft") showMedia(mediaIndex - 1);
  });
  modal.addEventListener("close", () => {
    stage.replaceChildren(); // stops any playing video
    current = null;
    if (location.hash.startsWith("#work/")) history.replaceState(null, "", "#work");
  });

  // #work/<slug> opens that project, so a single project can be linked directly.
  function routeFromHash() {
    const match = location.hash.match(/^#work\/([\w-]+)$/);
    if (match) openProject(match[1]);
  }
  window.addEventListener("hashchange", routeFromHash);

  // ---------- Boot ----------
  renderCVs();
  renderSocials();
  renderShowreel();
  renderFilters();
  renderProjects();
  renderExperience();
  renderSkills();
  $$('[data-slot="year"]').forEach((n) => { n.textContent = new Date().getFullYear(); });
  $$(".cv-menu a").forEach((a) => a.addEventListener("click", () => a.closest("details").open = false));
  routeFromHash();
})();

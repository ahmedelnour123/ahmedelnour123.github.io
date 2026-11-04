/*
 * All editable site content lives here. See README.md for how to add a project.
 *
 * Media strings, resolved against images/projects/<slug>/:
 *   "yt:VIDEO_ID"   YouTube video (thumbnail is generated)
 *   "cover.webp"    image in the project's folder
 *   "clip.mp4"      self-hosted video (.mp4 / .webm)
 *   "https://..."   any full URL
 * Links: play, code, download, web. A button only appears when its link is set.
 * Tracks: "interactive" and/or "game"; they drive the filter chips.
 */
window.SITE = {
  showreel: "6PCWcDuQnoQ",

  cvs: [
    {
      label: "Interactive Developer CV",
      file: "cv/interactive-developer.pdf",
      filename: "Ahmed Elnour - Interactive Developer.pdf",
    },
    {
      label: "Game Developer CV",
      file: "cv/game-developer.pdf",
      filename: "Ahmed Elnour - Game Developer.pdf",
    },
  ],

  socials: [
    { label: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://www.linkedin.com/in/ahmedelnour123" },
    { label: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/ahmedelnour123" },
    { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://instagram.com/ahmedelnour123" },
    { label: "Email", icon: "fa-solid fa-envelope", url: "mailto:ahmed.elnour.official@gmail.com" },
  ],

  tracks: {
    interactive: "Interactive & AR",
    game: "Games",
  },

  projects: [
    {
      slug: "ar-cheese-hunt",
      title: "AR Cheese Hunt",
      tracks: ["interactive", "game"],
      summary: "An AR Foundation game that turns your room into the playfield. Cheese spawns on detected planes and a joystick-driven character collects it against the clock.",
      tags: ["Unity", "AR Foundation", "Android", "C#"],
      links: {
        code: "https://github.com/ahmedelnour123/AR-Rat",
        download: "https://github.com/ahmedelnour123/AR-Rat/releases/latest",
      },
      media: ["yt:Lw5FV0r9O6w", "yt:S6sHJH3Co0U", "yt:xmsWTZxuOgQ", "shot-01.webp", "shot-02.webp", "shot-03.webp", "shot-04.webp"],
      challenge: "Build an AR game loop that depends on the player's real space, while keeping it readable on a small screen where the character can easily wander out of frame.",
      solution: "The player anchors the character to a detected plane with a raycast, then drives it with an on-screen joystick to collect cheese that spawns across tracked surfaces.",
      highlights: [
        "Collision-based pickups and a configurable spawn system that keeps cheese topped up as new planes are scanned mid-session.",
        "A timed 60-second scoring loop; restarting re-randomizes every spawn position.",
        "Replaced a world-space arrow with a screen-space pointer after playtesters kept losing the character off-camera.",
      ],
    },
    {
      slug: "ar-first-aid",
      title: "AR First Aid",
      tracks: ["interactive"],
      summary: "An interactive AR training app that anchors step-by-step first aid animations to real floors and tables.",
      tags: ["Unity", "AR Foundation", "Mobile Optimization", "Android Native"],
      links: {},
      media: ["yt:U9nPXQsWejM", "yt:ZKruQw0yraY", "cover.webp"],
      challenge: "Detect flat surfaces and overlay instructional 3D animations accurately on mid-range Android devices.",
      solution: "Used AR Foundation with optimized 3D assets to keep performance steady.",
      highlights: [
        "Plane detection for floor and table anchoring.",
        "A step-by-step interactive tutorial system.",
        "Native bridges to Android-specific camera features.",
      ],
    },
    {
      slug: "sky-hopper",
      title: "Sky Hopper",
      tracks: ["game"],
      badge: "Shipped on Google Play",
      summary: "A 3D puzzle platformer where crumbling tiles and swipe-based movement force fast decisions across 12 hand-crafted levels.",
      tags: ["Unity", "C#", "Mobile", "Puzzle"],
      links: {
        play: "https://play.google.com/store/apps/details?id=com.ahmedelnour.SkyHopper",
        code: "https://github.com/ahmedelnour123/sky-hopper",
      },
      cover: "cover.webp",
      media: ["yt:mPxcl66_o-0", "cover.webp", "shot-01.webp", "shot-02.webp", "shot-03.webp", "shot-04.webp", "shot-05.webp", "shot-06.webp"],
      challenge: "Design a bite-sized 3D platformer with enough tension to keep players hooked: hesitation is punished, but the controls stay approachable.",
      solution: "Designed and shipped the full game in Unity, pairing a swipe-based hop with tiles that crumble moments after contact, so the player always has to keep moving.",
      highlights: [
        "12 hand-crafted levels, from simple paths to intricate sky-bound mazes.",
        "Beat-the-clock scoring that awards up to 3 stars per level.",
        "Spring tiles for shortcuts and collectibles that reward exploration.",
      ],
    },
    {
      slug: "dominoes-online",
      title: "Dominoes Online",
      tracks: ["game"],
      summary: "A real-time 4-player dominoes game. I collaborated on the networking layer: room matchmaking and state sync that copes with network jitter.",
      tags: ["Unity", "Photon PUN2", "Multiplayer", "Networking"],
      links: {
        play: "https://play.google.com/store/apps/details?id=com.YazeedSabilDesigns.Domanah",
      },
      media: ["yt:oJVGqJ_lHQM", "cover.webp"],
      challenge: "Keep the game state in sync between 4 players in real time over unreliable mobile networks.",
      solution: "Built on Photon Unity Networking (PUN2).",
      highlights: [
        "Room matchmaking and lobby systems.",
        "Handled edge cases like players disconnecting and reconnecting.",
        "Compressed network packets to reduce bandwidth.",
      ],
    },
    {
      slug: "lost-es-of-i",
      title: "The Lost E's of I",
      tracks: ["game"],
      summary: "A puzzle adventure built on a decoupled gameplay framework, with room-based traversal and a custom dialogue and event system.",
      tags: ["Unity", "C#", "Event Systems", "Mobile"],
      links: {},
      media: ["yt:UdJWK6QS1J8", "yt:W5nfOv-QT-4", "yt:azOWATde4ok", "cover.webp"],
      challenge: "Create an engaging puzzle adventure whose architecture can manage complex narrative states.",
      solution: "An event-driven system in Unity (C#) that separates gameplay logic from UI and dialogue, so branching narratives need no hard-coded dependencies.",
      highlights: [
        "Room-based traversal, similar to Undertale.",
        "A custom dialogue parser for interaction events.",
        "Optimized asset loading for mobile performance.",
      ],
    },
    {
      slug: "block-building",
      title: "Block Building Prototype",
      tracks: ["game"],
      summary: "A modular grid-based placement system for city-builder mechanics, focused on efficient coordinate mapping and data management.",
      tags: ["Godot", "GDScript", "Grid Logic", "Prototyping"],
      links: {},
      media: ["yt:fGQGi7JlRjQ", "cover.webp"],
      challenge: "Create a performant grid-placement system for a city-builder prototype.",
      solution: "A modular grid system in Godot using GDScript.",
      highlights: [
        "Optimized coordinate mapping for placing buildings.",
        "JSON serialization for saving and loading city layouts.",
        "A flexible UI for choosing building types.",
      ],
    },
  ],

  experience: [
    {
      company: "Rayqube",
      role: "Interactive Developer (Contract)",
      dates: "Sep 2026 – Oct 2026",
      location: "Dubai, UAE",
      groups: [
        {
          title: "Unity development",
          items: [
            "Built a Unity 6 gesture recognition system on Orbbec Femto Bolt depth cameras, turning skeleton data into punches, weaves and ducks.",
            "Measured accuracy against hand-labelled recordings with a record and replay pipeline, cutting false detections by over 70%.",
            "Packaged the camera and gesture systems as reusable Unity packages with setup checks, a diagnostics overlay and camera-free keyboard simulation.",
            "Built touchscreen kiosk applications.",
          ],
        },
        {
          title: "Hardware and operations",
          items: [
            "Controlled Astera LED tubes and other fixtures over DMX and Art-Net.",
            "Designed a calibrated color conversion for RGB LED tubes that brought cue colors to a barely visible difference.",
            "Connected Arduino buttons to Unity, with hardware parameters and LED sequences configured through Scriptable Objects.",
            "Supported on-site installations remotely with AnyDesk and GitHub.",
          ],
        },
      ],
    },
    {
      company: "Sabil Systems Inc.",
      role: "Software Engineer",
      dates: "Dec 2024 – Present",
      location: "Edmonton, Canada",
      items: [
        "Designed extensible game architectures in Unity (C#) and Godot (GDScript).",
        "Built custom Unity tools and reusable game templates that cut designer iteration time.",
        "Worked on the achievements system; settings run on Scriptable Objects and JSON, and store content is delivered remotely as JSON.",
        "Profiled with the Unity Profiler and tracked crashes with Firebase Crashlytics.",
        "Wrote technical roadmaps and code review guidelines.",
      ],
    },
    {
      company: "Capital Digital",
      role: "Game Developer",
      dates: "Mar 2024 – Dec 2024",
      location: "Riyadh, Saudi Arabia",
      items: [
        "Built a state machine AI for player vs computer play.",
        "Developed the core gameplay mechanics and main game loop.",
        "Built a responsive UI framework and an interactive tutorial system.",
      ],
    },
    {
      company: "Interactive Future",
      role: "Game Developer",
      dates: "Aug 2023 – Feb 2024",
      location: "Riyadh, Saudi Arabia",
      items: [
        "Bridged native Android modules with the game engine.",
        "Created libraries, plugins and editor tools that sped up internal development.",
        "Prototyped game mechanics and turned the successful ones into production C# code.",
      ],
    },
    {
      company: "CTRL A Studios",
      role: "Game Developer",
      dates: "Apr 2022 – Jan 2023",
      location: "Khartoum, Sudan",
      items: [
        "Delivered core gameplay and 2D/3D visual systems with artists: animations, VFX and Cinemachine cameras.",
        "Debugging, unit testing and technical documentation for the team.",
      ],
    },
    {
      company: "The Code Effect",
      role: "AR Developer",
      dates: "Dec 2021 – Dec 2022",
      location: "Khartoum, Sudan",
      items: [
        "Built AR Foundation apps with stable spatial tracking, plane and image recognition, and interactive animations.",
        "Connected the AR front end to Flutter apps, backend servers and databases, with a local Node.js backend for testing.",
      ],
    },
  ],

  skills: [
    { group: "Interactive & hardware", items: ["Body tracking", "Gesture recognition", "Touchscreen kiosks", "Orbbec Femto Bolt", "DMX", "Art-Net", "Astera LED", "Arduino", "OpenCV"] },
    { group: "Unity", items: ["Unity 6", "AR Foundation", "Scriptable Objects", "Addressables", "Shaders", "Cinemachine", "Particles", "Editor tools", "WebGL (personal projects)"] },
    { group: "Performance", items: ["Unity Profiler", "Firebase Crashlytics", "Memory optimization", "Debugging", "Unit testing"] },
    { group: "Code", items: ["C#", "GDScript", "Java", "Python", "Bash", "Node.js", "JSON"] },
    { group: "Also", items: ["Godot", "Photon PUN2 multiplayer", "Native Android", "Git & GitHub"] },
  ],

  education: [
    { title: "Bachelor's degree in Electrical and Electronics Engineering", place: "University of Khartoum", date: "2018" },
    { title: "Technical Team Coordinator", place: "IEEE UofK Student Branch", date: "2018" },
  ],
};

/*
  Slide content for index.html. Edit this file, then reload the browser.

  Schema
  ------
  meta:      title, event, subtitle, presenter, short (footer label), theme ("light" | "dark"),
             logos: { jetbrains, jetbrainsDark, bazel }  // optional: override the official logos in logos/
  sections:  [{ title, subtitle, duration, accent ("green" | "purple" | "orange" | "blue" | "pink" | any CSS color),
                divider (default true), slides: [...] }]
  slide:     title, kicker, lead, notes (speaker notes, press N),
             layout: "bullets" (default) | "cards" | "questions"
             bullets:  ["item", ["sub item", "sub item"], "item", ...]   // an array after an item = its children
             cards:    [{ label, tag, text, items }]                     // for layout "cards"; columns: optional
             note:     "text" or ["text", ...]                           // grey callout
             ask:      "text" or ["text", ...]                           // "ask the room" callout
  closing:   { title, subtitle, links: [{ label, url }] }

  Inline formatting: **bold**, *italic*, `code`, [label](url), -> becomes an arrow.
*/
window.DECK = {
  "meta": {
    "title": "Bazel in the IDE",
    "event": "BazelCon 2026 · Birds of a Feather",
    "subtitle": "What's new, agents, and custom rules",
    "presenter": "Justin Kaeser · Klaus Aehlig · JetBrains",
    "short": "Bazel in the IDE · BazelCon 2026",
    "theme": "light",
    "logos": {
      "jetbrains": "logos/jetbrains.svg",
      "jetbrainsDark": "logos/jetbrains-mono-white.svg",
      "bazel": "logos/bazel-icon.svg"
    }
  },

  "sections": [
    {
      "title": "What we've been up to",
      "subtitle": "Last year we promised stabilization, performance, incremental sync. Here's what we delivered.",
      "duration": "10–15 min",
      "accent": "green",
      "slides": [
        {
          "kicker": "Stability & performance",
          "title": "Bug fixes and performance improvements",
          "bullets": [
            "**Thaw the freezes**: no known freezes caused by the Bazel plugin",
            ["~10 freezes fixed: symlinks, target storage, file events, settings tracking", "seeing one? please report it"],
            "**Sync**: memory and performance, in both aspect and plugin",
            ["target storage, JVM importer, memory on 100k+ target projects", "no more unsolicited `bazel query` on file changes"],
            "**Editor**: typing in BUILD files, highlighting, usage search"
          ],
          "note": "Cold sync is now mostly Bazel itself",
          "ask": "What would help here? Remote-cached aspect outputs?",
          "notes": "Freezes: BAZEL-2877, 3009, 3059, 3186, 2889, 3494. Storage: BAZEL-2058 (monorepo import was 120 MB of XML). Memory BAZEL-3203: fix was still in review, don't claim shipped. Cold sync: BAZEL-2675 / 2412 closed as 'Bazel legitimately takes the time'."
        },
        {
          "kicker": "Sync",
          "title": "Incremental / partial sync",
          "lead": "Delivered what we said was coming last year.",
          "bullets": [
            "**Partial sync** on unsynced files: query targets for a file, sync just those",
            "Unsynced files are marked, resync offered",
            "**Plain sync** only fetches what's needed",
            ["“Generate sources and resync” for the rest"]
          ],
          "ask": "How do you scope your projects today? `.bazelproject` views, shard sync, everything?",
          "notes": "Meta BAZEL-938 done 2026-10-08. BAZEL-3564 query + partial sync, BAZEL-3557 widgets, BAZEL-3137 mark unsynced files, BAZEL-3136 removed auto query, BAZEL-3370 / 3568 plain sync."
        },
        {
          "kicker": "Sync",
          "title": "Standalone aspect",
          "lead": "The aspect is now a Bazel module.",
          "bullets": [
            "No more templated files dropped into your repo",
            "Proto aligned with the CLion Bazel plugin",
            ["shared foundation across plugins"]
          ],
          "note": "Hold that thought: this comes back in part 3.",
          "notes": "BAZEL-2858 done 2026-06-16. BAZEL-2969 proto alignment. Perf follow-up BAZEL-3284 still in progress (hot sync and build got slower)."
        },
        {
          "kicker": "Project model",
          "title": "Faithful project model",
          "bullets": [
            "**Shared sources**: one file in several targets, switch resolve context in the editor",
            "**Transitions**: targets identified by label + configuration throughout the plugin",
            "Closes the biggest “doesn't fit IntelliJ's model” gap"
          ],
          "notes": "BAZEL-64 / 2769 done 2026-08-04, built on platform multi-context resolve. Transitions BAZEL-1667."
        },
        {
          "kicker": "Ecosystems",
          "title": "Languages",
          "layout": "cards",
          "cards": [
            { "label": "C++ in IDEA", "tag": "WIP", "text": "`rules_cc` detection; aspect shared between the CLion plugin and the new plugin" },
            { "label": "Go", "text": "New sync pipeline; Thrift, cff, Stringer codegen; debug and strict deps fixes" },
            { "label": "Python", "text": "Run/debug via Bazel, namespace packages, `imports` attribute, test results and navigation" },
            { "label": "Scala", "text": "Compiler plugins, proto deps. Known open list." },
            { "label": "Starlark", "text": "~25 new inspections, target quickdoc, find usages, completion, BCR version suggestions" }
          ],
          "notes": "C++ M1 BAZEL-1571 done 2026-10-07; CLion support BAZEL-6 still open. Go BAZEL-2718, Python BAZEL-2719, Scala BAZEL-2717, Starlark BAZEL-3097."
        },
        {
          "kicker": "Run & test",
          "title": "Testing and running",
          "bullets": [
            "Navigate from test runner to source: JUnit 4/5, Python",
            "Rerun a single test, run tests in parallel",
            "**Coverage** via Java agent instead of `bazel coverage`",
            ["no more `--instrumentation_filter` tuning"],
            "Run gutters for test suites, macros, non-imported targets",
            "Profiler, coroutine debugging"
          ],
          "notes": "BAZEL-2087 rerun, BAZEL-2604 parallel, BAZEL-3130 coverage agent, BAZEL-2964 / 3020 gutters, BAZEL-2465 profiler, BAZEL-3110 coroutines."
        },
        {
          "kicker": "Tell us if it matters to you",
          "title": "Still open",
          "bullets": [
            "Windows / WSL",
            "Remote Development",
            "Rust: considering, no work yet",
            "Roadmap visibility (you asked last year)",
            ["YouTrack meta issues and blog posts"]
          ],
          "ask": "Which of these would change things for you?"
        },
        {
          "kicker": "Android",
          "title": "Android Studio",
          "bullets": [
            "Not covered by the JetBrains plugin",
            ["most Android shops are on ASwB or forks of it", "industry “Android Bazel gaps” doc signed by many large Android shops"],
            "**Offer**: JetBrains Professional Services can port the plugin to Android Studio for your codebase",
            ["PoC exists; the work should end up OSS / GA"]
          ],
          "ask": "Who's on ASwB today? What hurts most?"
        }
      ]
    },

    {
      "title": "Agents",
      "subtitle": "What do Bazel users need from the IDE when agents write the code?",
      "duration": "~20 min",
      "accent": "purple",
      "slides": [
        {
          "kicker": "Yes, JetBrains has an AI offering",
          "title": "Air",
          "lead": "An agentic development environment: built around working with agents, not around writing code.",
          "bullets": [
            "Agent-agnostic: Claude Agent, Codex, Gemini CLI, Junie",
            "Worktrees and Docker for parallel agents",
            "Inline agentic code review"
          ],
          "note": "Not a sales pitch: we want to hear about your workflows.",
          "notes": "1–2 min, quick live show."
        },
        {
          "kicker": "Discussion",
          "title": "Agents and Bazel",
          "layout": "questions",
          "bullets": [
            "Where does Bazel trip up agents today?",
            "Where can tools help agents?",
            ["IDE as tool provider (MCP): target for file, add dep, run test, BUILD inspections", "or should this live in Bazel / CLI tools?"],
            "Parallel agents in worktrees: output bases, disk, cache. How do you handle it?"
          ],
          "notes": "Known Junie gaps (BAZEL-1983): doesn't know to resync after BUILD edits; test runs get stuck."
        },
        {
          "kicker": "Discussion",
          "title": "The IDE's role",
          "layout": "questions",
          "bullets": [
            "What's the IDE for, if you use agents heavily?",
            ["review, navigation, understanding vs. editing"],
            "Does sync matter less or more?",
            ["partial sync on demand vs. full model"],
            "Who uses the IDE less than a year ago? What replaced it?"
          ]
        }
      ]
    },

    {
      "title": "Custom rules",
      "subtitle": "Not everyone uses plain BCR. How should IDEs understand your rules?",
      "duration": "~20 min",
      "accent": "orange",
      "slides": [
        {
          "kicker": "Status quo",
          "title": "We guess a lot",
          "bullets": [
            "Not everyone uses plain BCR",
            ["custom forks of BCR rules", "completely custom rules"],
            "We guess based on what happens to be offered in rules",
            ["every supported ruleset = special-casing in the aspect (Go Thrift/cff, Scala compiler plugins, `rules_cc`)", "doesn't scale to in-house rules: a common blocker"]
          ]
        },
        {
          "kicker": "Status quo",
          "title": "Interop through providers",
          "layout": "cards",
          "columns": 2,
          "cards": [
            { "label": "Providers", "tag": "output", "text": "Tell how to *use* the target" },
            { "label": "IDEs", "tag": "input", "text": "Care about the *source files*" }
          ],
          "note": "Bazel's interop model answers a different question than the one IDEs ask."
        },
        {
          "kicker": "How to handle?",
          "title": "Options",
          "layout": "cards",
          "cards": [
            { "label": "Conventional attribute names", "text": "Cheap, but implicit and fragile" },
            { "label": "IDE provider", "text": "Rules (also BCR ones) provide IDE-relevant info directly. Standalone aspect + shared proto = natural place to define it." },
            { "label": "Plugin extension points", "text": "Already opened some APIs: target data, BEP handling, hotswap. JetBrains IDEs only." },
            { "label": "IDE target in the project", "text": "Standard semantics, BCR rule for easy setup, custom possible" }
          ]
        },
        {
          "kicker": "Discussion",
          "title": "Questions for the room",
          "layout": "questions",
          "bullets": [
            "Expectations? Who writes custom rules, who forks BCR rules?",
            "Interest in some kind of standard?",
            ["who else would adopt it: Google plugin, VS Code / LSPs?"],
            "Who'd help define and contribute?"
          ]
        }
      ]
    }
  ],

  "closing": {
    "title": "Other contributions?",
    "subtitle": "Thank you!",
    "links": [
      { "label": "jastice.github.io/bazelcon-2026-bof (these slides)", "url": "https://jastice.github.io/bazelcon-2026-bof/" },
      { "label": "youtrack.jetbrains.com/issues/BAZEL", "url": "https://youtrack.jetbrains.com/issues/BAZEL" },
      { "label": "github.com/JetBrains/hirschgarten", "url": "https://github.com/JetBrains/hirschgarten" }
    ]
  }
};

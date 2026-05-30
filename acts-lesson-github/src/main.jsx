import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const h = React.createElement;

const STORAGE_KEYS = {
  opened: "actsLesson.opened",
  points: "actsLesson.points",
  steps: "actsLesson.steps",
  reflections: "actsLesson.reflections",
};

const lesson = {
  module: "Module 1 — Lesson 2",
  title: "Acts Part 1",
  focus: "Salvation & the Gospel of Christ",
  theme: "The Apostolic Gospel — Death, Burial, Resurrection",
  call: "Obey the Gospel of Jesus Christ",
};

const whyPoints = [
  {
    id: "mission",
    title: "The mission of Jesus Christ",
    text: "Acts shows the continuing work of Jesus through His apostles by the power of the Holy Spirit.",
  },
  {
    id: "message",
    title: "The message of salvation preached by the apostles",
    text: "The apostolic message centered on Jesus Christ, His resurrection, and the response of faith.",
  },
  {
    id: "lifestyle",
    title: "The lifestyle of Spirit-filled believers",
    text: "The early church lived with prayer, bold witness, fellowship, obedience, and spiritual power.",
  },
];

const coreScriptures = [
  {
    id: "core-acts-2",
    reference: "Acts 2:23-24",
    tag: "Peter preaches the crucified and risen Christ.",
    summary:
      "Peter declared that Jesus was delivered up, crucified, and raised by God because death could not hold Him.",
    notice: "The resurrection is God's answer to the cross.",
  },
  {
    id: "core-acts-3",
    reference: "Acts 3:14-15",
    tag: "They killed the Prince of Life, but God raised Him.",
    summary:
      "The apostles identified Jesus as the Holy One and the Prince of Life, then testified that God raised Him from the dead.",
    notice: "The message names both human rejection and divine resurrection.",
  },
  {
    id: "core-acts-4",
    reference: "Acts 4:10-12",
    tag: "Salvation is only in the name of Jesus.",
    summary:
      "Peter preached that Jesus was crucified, raised, and made the only saving name given among men.",
    notice: "The apostolic gospel leads directly to the authority of Jesus' name.",
  },
  {
    id: "core-acts-13",
    reference: "Acts 13:28-30",
    tag: "They condemned Jesus, but God raised Him.",
    summary:
      "Paul preached that Jesus was condemned and laid in a tomb, but God raised Him from the dead.",
    notice: "Death, burial, and resurrection are preached together.",
  },
];

const responseScriptures = [
  {
    id: "response-acts-2",
    reference: "Acts 2:37-38",
    tag: "What shall we do?",
    summary:
      "The hearers were convicted and asked what to do. Peter commanded repentance, baptism in Jesus' name, and receiving the Holy Spirit.",
    notice: "The preached gospel produced a clear command to respond.",
    progress: ["gospel", "responded", "repentance", "baptism", "spirit"],
  },
  {
    id: "response-acts-3",
    reference: "Acts 3:19",
    tag: "Repent therefore and be converted.",
    summary:
      "The apostles called people to repent and be converted so their sins would be blotted out.",
    notice: "Repentance is not treated as optional or secondary.",
    progress: ["gospel", "responded", "repentance"],
  },
  {
    id: "response-acts-8",
    reference: "Acts 8:12-17",
    tag: "They believed, were baptized, and received the Holy Spirit.",
    summary:
      "The people in Samaria believed the preaching, were baptized, and later received the Holy Spirit as the apostles prayed for them.",
    notice: "Belief moved into baptism and Spirit-filled experience.",
    progress: ["gospel", "responded", "baptism", "spirit"],
  },
  {
    id: "response-acts-16",
    reference: "Acts 16:31-33",
    tag: "They believed and were baptized the same night.",
    summary:
      "The jailer heard the word of the Lord, believed with his household, and was baptized immediately.",
    notice: "Baptism followed faith without delay.",
    progress: ["gospel", "responded", "baptism"],
  },
  {
    id: "response-acts-22",
    reference: "Acts 22:16",
    tag: "Arise and be baptized, washing away your sins.",
    summary:
      "Ananias called Saul to arise, be baptized, and call on the name of the Lord.",
    notice: "Baptism is connected with calling on Jesus' name and the washing away of sins.",
    progress: ["responded", "baptism"],
  },
];

const responseSteps = [
  { id: "gospel", label: "Gospel preached" },
  { id: "responded", label: "People responded" },
  { id: "repentance", label: "Repentance" },
  { id: "baptism", label: "Baptism" },
  { id: "spirit", label: "Holy Spirit" },
];

const gospelSteps = [
  {
    id: "death",
    badge: "Death",
    completeLabel: "Repentance",
    title: "Faith in Jesus' Death: Repentance",
    summary:
      "Jesus died to forgive our sins. When we repent, we join Him in death by turning from sin and surrendering to God.",
    scriptures: ["Acts 2:38", "Acts 3:19", "Luke 13:3", "Romans 6:6"],
    calloutLabel: "Key Thought",
    callout:
      "Repentance is more than confession. It is a turning, a dying out to sin. By God's grace, when we repent, we are forgiven.",
    momentLabel: "Prayer Moment",
    moment:
      "Lord Jesus, I turn from sin and surrender myself to You. Forgive me, change me, and lead me in obedience to Your gospel.",
  },
  {
    id: "burial",
    badge: "Burial",
    completeLabel: "Baptism in Jesus' Name",
    title: "Faith in Jesus' Burial: Baptism in Jesus' Name",
    summary:
      "We are buried with Jesus in water baptism. Baptism joins us to His burial and applies His name.",
    scriptures: [
      "Acts 2:38",
      "Acts 8:16",
      "Acts 10:48",
      "Acts 19:5",
      "Romans 6:3-4",
      "1 Peter 3:21",
      "Mark 16:16",
    ],
    calloutLabel: "Notice the Pattern",
    callout:
      "Every baptism in Acts was in Jesus' name. Baptism is not optional; it is how we are buried with Christ and washed from sin.",
    momentLabel: "Discussion Prompt",
    moment:
      "Have you been baptized in the name of Jesus Christ according to the pattern in Acts?",
  },
  {
    id: "resurrection",
    badge: "Resurrection",
    completeLabel: "Receiving the Holy Spirit",
    title: "Faith in Jesus' Resurrection: Receiving the Holy Spirit",
    summary:
      "John prophesied that Jesus would baptize people with the Holy Spirit. This promise came after Jesus' resurrection and glorification.",
    scriptures: [
      "Matthew 3:11",
      "Luke 3:16",
      "John 7:38-39",
      "John 14:16-17",
      "John 16:7",
      "Luke 24:49",
      "Acts 1:4-5",
      "Acts 2:1-4",
      "Acts 11:15-17",
    ],
    calloutLabel: "Teaching Point",
    callout:
      "Jesus' earthly ministry prepared us for His heavenly ministry of baptizing believers with the Holy Spirit.",
    momentLabel: "Key Thought",
    moment:
      "The risen Christ pours out the promise of the Father so believers can live in Spirit-filled power.",
  },
];

const tongueScriptures = [
  {
    id: "tongues-acts-2",
    reference: "Acts 2:1-4",
    tag: "They were filled with the Holy Spirit and spoke in tongues.",
    summary:
      "On Pentecost, the Holy Spirit filled the believers, and they began to speak with other tongues as the Spirit gave the utterance.",
    notice: "The first outpouring included a visible, audible sign.",
  },
  {
    id: "tongues-acts-10",
    reference: "Acts 10:44-46",
    tag: "The Spirit fell, and they spoke in tongues.",
    summary:
      "Cornelius' household received the Holy Spirit while Peter preached, and the believers knew it because they heard them speak with tongues and magnify God.",
    notice: "The sign confirmed that the promise was for Gentiles too.",
  },
  {
    id: "tongues-acts-19",
    reference: "Acts 19:5-6",
    tag: "The Holy Spirit came, and they spoke in tongues.",
    summary:
      "The disciples at Ephesus were baptized in Jesus' name, Paul laid hands on them, and they spoke with tongues and prophesied.",
    notice: "The Acts pattern continues beyond the day of Pentecost.",
  },
  {
    id: "tongues-1cor-14-2",
    reference: "1 Corinthians 14:2",
    tag: "Speaking in tongues is speaking to God.",
    summary:
      "Paul taught that one who speaks in an unknown tongue speaks to God by the Spirit.",
    notice: "Tongues are connected with prayer and spiritual communion.",
  },
  {
    id: "tongues-1cor-14-22",
    reference: "1 Corinthians 14:22",
    tag: "Tongues are a sign.",
    summary:
      "Paul described tongues as a sign, showing that this spiritual expression carried witness and meaning.",
    notice: "The sign is meant to point beyond itself to God's work.",
  },
];

const reflectionQuestions = [
  {
    id: "reflection-1",
    question: "What stands out to you about the book of Acts being the model for the church?",
  },
  {
    id: "reflection-2",
    question: "Why do you think the apostles always called people to respond to the gospel?",
  },
  {
    id: "reflection-3",
    question:
      "Which part of the gospel response do you want to understand more clearly: repentance, baptism, or receiving the Holy Spirit?",
  },
  {
    id: "reflection-4",
    question: "What is one step of obedience you believe God is calling you to take?",
  },
];

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing modes may block storage; the app still works for the session.
  }
}

function unique(list) {
  return Array.from(new Set(list));
}

function Section({ number, title, lead, children }) {
  return h(
    "section",
    { className: "section", id: `section-${number}` },
    h(
      "div",
      { className: "section-head" },
      h("span", { className: "section-label" }, number),
      h("h2", null, title),
      lead ? h("p", { className: "section-lead" }, lead) : null
    ),
    children,
    h("div", { className: "divider" })
  );
}

function TeachingCallout({ label, children }) {
  return h(
    "aside",
    { className: "teaching-callout" },
    h("span", { className: "callout-label" }, label),
    h("p", null, children)
  );
}

function ProgressTracker({ percent, completed, total, onPrint, onReset }) {
  return h(
    "div",
    { className: "progress-shell" },
    h(
      "div",
      { className: "progress-inner" },
      h(
        "div",
        null,
        h(
          "div",
          { className: "progress-topline" },
          h("span", { className: "progress-kicker" }, "Lesson Progress"),
          h("span", null, `${percent}% · ${completed}/${total}`)
        ),
        h("div", { className: "progress-track", "aria-hidden": "true" }, h("div", { className: "progress-fill", style: { width: `${percent}%` } }))
      ),
      h(
        "div",
        { className: "progress-actions" },
        h("button", { className: "button small", type: "button", onClick: onPrint }, "Print"),
        h("button", { className: "button small ghost", type: "button", onClick: onReset }, "Reset")
      )
    )
  );
}

function Hero({ onPrint }) {
  return h(
    "header",
    { className: "hero" },
    h(
      "div",
      { className: "hero-inner" },
      h("p", { className: "eyebrow" }, lesson.module),
      h("h1", null, lesson.title, h("br"), lesson.focus),
      h("p", { className: "hero-subtitle" }, lesson.theme),
      h(
        "p",
        { className: "hero-summary" },
        "The book of Acts shows what Jesus continued to do through His apostles by the power of the Holy Spirit. This lesson walks through the apostolic message of salvation and how the early church responded to the gospel."
      ),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { className: "button primary", href: "#section-01" }, lesson.call),
        h("button", { className: "button", type: "button", onClick: onPrint }, "Print Lesson Summary")
      )
    )
  );
}

function IntroSection({ opened, onOpen }) {
  const isOpen = opened.includes("intro");
  return h(
    Section,
    {
      number: "01",
      title: "Acts: The Apostolic Account of Salvation",
      lead: "Luke recorded what Jesus began to do and teach until His ascension. Acts continues the story by showing what Jesus continued to do through His apostles by the power of the Holy Spirit.",
    },
    h("button", { className: "button", type: "button", onClick: () => onOpen("intro") }, isOpen ? "Close Section" : "Open Section"),
    h(
      "div",
      { className: `collapsible ${isOpen ? "open" : ""}` },
      h(
        "div",
        null,
        h(
          "p",
          { className: "body-copy", style: { marginTop: "20px" } },
          "Acts is the sequel to Luke's Gospel. Luke shows the earthly ministry of Jesus; Acts shows the risen and ascended Lord working through apostles, preaching, prayer, miracles, obedience, and the Spirit-filled church."
        ),
        h(
          TeachingCallout,
          { label: "Teaching Point" },
          "Acts shows us the original mission, message, and methods of the church before religious traditions got in the way."
        )
      )
    )
  );
}

function WhySection({ readPoints, onTogglePoint }) {
  return h(
    Section,
    {
      number: "02",
      title: "Why Study Acts?",
      lead: "Acts gives the church a living witness of apostolic faith and practice.",
    },
    h(
      "div",
      { className: "point-grid" },
      whyPoints.map((point) => {
        const read = readPoints.includes(point.id);
        return h(
          "button",
          {
            key: point.id,
            className: `point-card ${read ? "read" : ""}`,
            type: "button",
            "aria-pressed": read,
            onClick: () => onTogglePoint(point.id),
          },
          h("span", { className: "check", "aria-hidden": "true" }, "✓"),
          h("span", null, h("span", { className: "point-title" }, point.title), h("span", { className: "point-text" }, point.text))
        );
      })
    ),
    h(
      TeachingCallout,
      { label: "Teaching Point" },
      "Acts is our model for the church. We see firsthand how the apostles lived out the teachings of Jesus."
    ),
    h(ReflectionBox, { id: "reflection-1" })
  );
}

function ScriptureCard({ item, isOpen, onOpen }) {
  return h(
    "article",
    { className: `scripture-card ${isOpen ? "open read" : ""}` },
    h(
      "button",
      { className: "scripture-trigger", type: "button", onClick: () => onOpen(item.id), "aria-expanded": isOpen },
      h("span", { className: "scripture-title" }, h("span", { className: "scripture-reference" }, item.reference), h("span", { className: "scripture-tag" }, item.tag)),
      h("span", { className: "chevron", "aria-hidden": "true" }, "⌄")
    ),
    h(
      "div",
      { className: `collapsible ${isOpen ? "open" : ""}` },
      h(
        "div",
        { className: "scripture-body" },
        h("p", null, item.summary),
        h("p", { className: "notice" }, h("strong", null, "What to notice: "), item.notice)
      )
    )
  );
}

function ScriptureList({ items, opened, onOpen }) {
  return h(
    "div",
    { className: "scripture-list" },
    items.map((item) => h(ScriptureCard, { key: item.id, item, isOpen: opened.includes(item.id), onOpen }))
  );
}

function CoreMessageSection({ opened, onOpen }) {
  return h(
    Section,
    {
      number: "03",
      title: "The Core Message: The Gospel of Jesus Christ",
      lead: "The early church preached one central message: Jesus died, was buried, and rose again.",
    },
    h(TeachingCallout, { label: "Key Thought" }, "The cross and resurrection were not side notes. They were the message."),
    h(ScriptureList, { items: coreScriptures, opened, onOpen }),
    h(TeachingCallout, { label: "Notice the Pattern" }, "This is the gospel: the death, burial, and resurrection of Jesus Christ.")
  );
}

function GospelPathTracker({ activeIds }) {
  return h(
    "div",
    { className: "response-tracker", "aria-label": "Gospel response progress" },
    responseSteps.map((step) =>
      h(
        "div",
        { key: step.id, className: `response-step ${activeIds.includes(step.id) ? "active" : ""}` },
        h("span", { className: "response-dot", "aria-hidden": "true" }),
        h("span", null, step.label)
      )
    )
  );
}

function ResponseSection({ opened, onOpen }) {
  const activeResponseIds = unique(
    responseScriptures
      .filter((item) => opened.includes(item.id))
      .flatMap((item) => item.progress)
  );

  return h(
    Section,
    {
      number: "04",
      title: "The Gospel Demands a Response",
      lead: "Every time the apostles preached, they called people to respond.",
    },
    h(GospelPathTracker, { activeIds: activeResponseIds }),
    h(ScriptureList, { items: responseScriptures, opened, onOpen }),
    h(TeachingCallout, { label: "Key Thought" }, "The gospel is not just a message to hear. It is a command to obey."),
    h(ReflectionBox, { id: "reflection-2" })
  );
}

function StepTabs({ activeStep, completedSteps, onSelectStep }) {
  const step = gospelSteps.find((item) => item.id === activeStep) || gospelSteps[0];

  return h(
    "div",
    null,
    h(
      "div",
      { className: "tabs", role: "tablist", "aria-label": "Three-step gospel response" },
      gospelSteps.map((item) =>
        h(
          "button",
          {
            key: item.id,
            className: `tab ${activeStep === item.id ? "active" : ""}`,
            type: "button",
            role: "tab",
            "aria-selected": activeStep === item.id,
            onClick: () => onSelectStep(item.id),
          },
          item.badge
        )
      )
    ),
    h(
      "article",
      { className: "step-panel" },
      h("span", { className: "mini-label", style: { color: "var(--gold)" } }, step.badge),
      h("h3", null, step.title),
      h("p", { className: "body-copy" }, step.summary),
      h(
        "div",
        { className: "scripture-pills" },
        step.scriptures.map((scripture) => h("span", { className: "pill", key: scripture }, scripture))
      ),
      h(TeachingCallout, { label: step.calloutLabel }, step.callout),
      h(TeachingCallout, { label: step.momentLabel }, step.moment)
    ),
    h(
      "div",
      { className: "completion-row" },
      gospelSteps.map((item) =>
        h(
          "div",
          { key: item.id, className: `completion-item ${completedSteps.includes(item.id) ? "done" : ""}` },
          item.completeLabel
        )
      )
    )
  );
}

function ThreeStepSection({ activeStep, completedSteps, onSelectStep }) {
  return h(
    Section,
    {
      number: "05",
      title: "Three-Step Gospel Response",
      lead: "The apostolic response to the gospel joins faith to the death, burial, and resurrection of Jesus Christ.",
    },
    h(StepTabs, { activeStep, completedSteps, onSelectStep }),
    h(ReflectionBox, { id: "reflection-3" })
  );
}

function TonguesSection({ opened, onOpen }) {
  return h(
    Section,
    {
      number: "06",
      title: "The Sign of Receiving the Holy Spirit",
      lead: "Acts shows a repeated pattern when people received the Holy Spirit.",
    },
    h(ScriptureList, { items: tongueScriptures, opened, onOpen }),
    h(
      TeachingCallout,
      { label: "Notice the Pattern" },
      "The pattern is clear in Acts: when people received the Holy Spirit, they spoke with tongues."
    ),
    h(
      TeachingCallout,
      { label: "Prayer Moment" },
      "Pray boldly and respond to the Spirit. Those who have received the Spirit can pray in the Spirit, and those who have not received the Spirit can seek the promise of the Father."
    )
  );
}

function ReflectionBox({ id }) {
  const question = reflectionQuestions.find((item) => item.id === id);
  const [value, setValue] = useReflection(id);

  if (!question) return null;

  return h(
    "div",
    { className: "reflection-box" },
    h(
      "label",
      null,
      h("p", { className: "reflection-question" }, question.question),
      h("textarea", {
        value,
        placeholder: "Write your reflection here...",
        onChange: (event) => setValue(event.target.value),
      })
    )
  );
}

let reflectionStateAccess = {
  get: () => ({}),
  set: () => {},
};

function useReflection(id) {
  const reflections = reflectionStateAccess.get();
  const setReflections = reflectionStateAccess.set;
  const value = reflections[id] || "";
  const setValue = (next) => setReflections({ ...reflectionStateAccess.get(), [id]: next });
  return [value, setValue];
}

function FinalSummary() {
  return h(
    Section,
    {
      number: "07",
      title: "What We Learned",
      lead: "Acts gives us the original pattern of the Spirit-filled church.",
    },
    h(ReflectionBox, { id: "reflection-4" }),
    h(
      "div",
      { className: "final-panel", style: { marginTop: "28px" } },
      h(
        "ul",
        { className: "summary-list" },
        [
          "The gospel is the death, burial, and resurrection of Jesus Christ.",
          "The apostles preached this message throughout Acts.",
          "The gospel demanded a response.",
          "That response included repentance, baptism in Jesus' name, and receiving the Holy Spirit.",
          "Acts gives us the original pattern of the Spirit-filled church.",
        ].map((item) => h("li", { key: item }, item))
      ),
      h(
        "div",
        { className: "closing-scripture" },
        h("strong", null, "Acts 2:38"),
        h(
          "p",
          null,
          "“Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.”"
        )
      )
    )
  );
}

function PrintSummary() {
  const keyScriptures = [
    "Acts 2:23-24",
    "Acts 3:14-15",
    "Acts 4:10-12",
    "Acts 13:28-30",
    "Acts 2:37-38",
    "Acts 3:19",
    "Acts 8:12-17",
    "Acts 16:31-33",
    "Acts 22:16",
    "Acts 2:1-4",
    "Acts 10:44-46",
    "Acts 19:5-6",
  ];

  return h(
    "article",
    { className: "print-summary" },
    h("h1", null, `${lesson.module}: ${lesson.title} — ${lesson.focus}`),
    h("p", null, h("strong", null, "Theme: "), lesson.theme),
    h("p", null, h("strong", null, "Call to Action: "), lesson.call),
    h("h2", null, "Main Gospel Summary"),
    h(
      "p",
      null,
      "The apostolic gospel is the death, burial, and resurrection of Jesus Christ. The apostles preached this message throughout Acts, and every gospel sermon called people to obey."
    ),
    h("h2", null, "Three-Step Gospel Response"),
    h(
      "ul",
      null,
      h("li", null, "Repentance: faith in Jesus' death, turning from sin and surrendering to God."),
      h("li", null, "Baptism in Jesus' name: faith in Jesus' burial, being buried with Christ and washed from sin."),
      h("li", null, "Receiving the Holy Spirit: faith in Jesus' resurrection, receiving the promise of the Father.")
    ),
    h("h2", null, "Key Scriptures"),
    h("p", null, keyScriptures.join(" · ")),
    h("div", { className: "print-cta" }, "Acts 2:38 — “Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.”")
  );
}

function App() {
  const [opened, setOpened] = useState(() => readStorage(STORAGE_KEYS.opened, []));
  const [readPoints, setReadPoints] = useState(() => readStorage(STORAGE_KEYS.points, []));
  const [activeStep, setActiveStep] = useState("death");
  const [completedSteps, setCompletedSteps] = useState(() => readStorage(STORAGE_KEYS.steps, []));
  const [reflections, setReflections] = useState(() => readStorage(STORAGE_KEYS.reflections, {}));

  reflectionStateAccess = {
    get: () => reflections,
    set: setReflections,
  };

  useEffect(() => writeStorage(STORAGE_KEYS.opened, opened), [opened]);
  useEffect(() => writeStorage(STORAGE_KEYS.points, readPoints), [readPoints]);
  useEffect(() => writeStorage(STORAGE_KEYS.steps, completedSteps), [completedSteps]);
  useEffect(() => writeStorage(STORAGE_KEYS.reflections, reflections), [reflections]);

  const openItem = (id) => {
    setOpened((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const togglePoint = (id) => {
    setReadPoints((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const selectStep = (id) => {
    setActiveStep(id);
    setCompletedSteps((current) => (current.includes(id) ? current : [...current, id]));
  };

  const progress = useMemo(() => {
    const total =
      1 +
      whyPoints.length +
      coreScriptures.length +
      responseScriptures.length +
      gospelSteps.length +
      tongueScriptures.length +
      reflectionQuestions.length;
    const completed =
      (opened.includes("intro") ? 1 : 0) +
      readPoints.length +
      coreScriptures.filter((item) => opened.includes(item.id)).length +
      responseScriptures.filter((item) => opened.includes(item.id)).length +
      completedSteps.length +
      tongueScriptures.filter((item) => opened.includes(item.id)).length +
      reflectionQuestions.filter((item) => (reflections[item.id] || "").trim().length > 0).length;
    return { total, completed, percent: Math.round((completed / total) * 100) };
  }, [opened, readPoints, completedSteps, reflections]);

  const reset = () => {
    const confirmed = window.confirm("Reset lesson progress and reflection responses on this device?");
    if (!confirmed) return;
    Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
    setOpened([]);
    setReadPoints([]);
    setActiveStep("death");
    setCompletedSteps([]);
    setReflections({});
  };

  const print = () => window.print();

  return h(
    React.Fragment,
    null,
    h(
      "div",
      { className: "screen-app" },
      h(Hero, { onPrint: print }),
      h(ProgressTracker, { percent: progress.percent, completed: progress.completed, total: progress.total, onPrint: print, onReset: reset }),
      h(
        "main",
        { className: "main" },
        h(IntroSection, { opened, onOpen: openItem }),
        h(WhySection, { readPoints, onTogglePoint: togglePoint }),
        h(CoreMessageSection, { opened, onOpen: openItem }),
        h(ResponseSection, { opened, onOpen: openItem }),
        h(ThreeStepSection, { activeStep, completedSteps, onSelectStep: selectStep }),
        h(TonguesSection, { opened, onOpen: openItem }),
        h(FinalSummary, null)
      )
    ),
    h(PrintSummary, null)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));

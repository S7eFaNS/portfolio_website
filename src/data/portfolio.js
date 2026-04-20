export const profile = {
  name: "Stefan-Nikola Stanev",
  email: "stefannikola298@gmail.com",
  age: 22,
  location: "Sofia, Bulgaria",
  tagline: "Junior Software Engineer",
  bio: [
    "I'm a software engineer finishing my Bachelor's in ICT at Fontys University of Applied Sciences, with a focus on backend development and cybersecurity. I've worked across the full stack, from C# webshops in my early semesters to microservice platforms on GCP, but my real interest lives at the intersection of building reliable systems and making sure they stay secure.",

    "My internship experience spans both sides of that: at TNO I contributed to a self-healing cybersecurity platform that autonomously detects and responds to threats in cloud environments, and at UniCredit Bulbank I'm building a phishing analysis tool directly embedded into the SOC workflow. I care about systems that don't just work, but that hold up when they're under pressure.",

    "If I'm not coding, I'm usually spending time with friends, playing games, going to the gym and other activities, currently based in Sofia, Bulgaria, and open to opportunities in backend engineering, fullstack engineering, and cybersecurity."
  ],
  social: {
    github: "https://github.com/S7eFaNS",
    linkedin: "https://www.linkedin.com/in/stefan-nikola-stanev-4861932b9/",
  },
  resumeUrl: "/resume.pdf",
};

export const roles = [
  "Backend Developer",
  "Cybersecurity Engineer",
  "Fullstack Developer",
];

export const stats = [
  { label: "Years coding", value: "4+" },
  { label: "Projects created", value: "10+" },
  { label: "Technologies", value: "25+" },
  { label: "Terminal used", value: "A lot" },
];

export const techStack = [
  // Backend
  { name: "Go", icon: "SiGo" },
  { name: "Java", icon: "SiJava" },
  { name: "C#", icon: "SiCsharp" },
  { name: "C++", icon: "SiCplusplus" },
  { name: "Python", icon: "SiPython" },
  // Frontend
  { name: "React", icon: "SiReact" },
  { name: "JavaScript", icon: "SiJavascript" },
  { name: "TypeScript", icon: "SiTypescript" },
  // Databases
  { name: "MySQL", icon: "SiMysql" },
  { name: "MSSQL", icon: "SiMicrosoftsqlserver" },
  { name: "PostgreSQL", icon: "SiPostgresql" },
  { name: "MongoDB", icon: "SiMongodb" },
  { name: "Neo4j", icon: "SiNeo4j" },
  // Cloud & DevOps
  { name: "Docker", icon: "SiDocker" },
  { name: "Kubernetes", icon: "SiKubernetes" },
  { name: "Azure", icon: "SiMicrosoftazure" },
  { name: "GCP", icon: "SiGooglecloud" },
  { name: "Kong", icon: "SiKong" },
  { name: "Nginx", icon: "SiNginx" },
  { name: "ArgoCD", icon: "SiArgo" },
  { name: "GitHub Actions", icon: "SiGithubactions" },
];

export const skills = [
  {
    title: "Backend Development",
    icon: "server",
    description:
      "Building robust, scalable server-side systems and APIs. Focused on clean architecture, performance, and reliability across distributed environments.",
    items: [
      "REST, API Design",
      "Go, Java, C#, Python",
      "PostgreSQL, MongoDB, Neo4j",
      "Microservices & Event-driven systems",
      "Docker & Kubernetes",
    ],
  },
  {
    title: "Cybersecurity",
    icon: "shield",
    description:
      "Applying security-first thinking to software design. Experienced in identifying vulnerabilities, hardening infrastructure, and building systems.",
    items: [
      "Secure coding practices",
      "Vulnerability assessment",
      "Network security fundamentals",
      "API gateway hardening (Kong, Nginx)",
      "Penetration testing basics",
    ],
  },
  {
    title: "Fullstack Development",
    icon: "layout",
    description:
      "Bridging backend logic with functional, clean frontends. Comfortable owning a feature end-to-end — from the database schema to what the user sees.",
    items: [
      "React, TypeScript, JavaScript",
      "REST API integration",
      "CI/CD with GitHub Actions & ArgoCD",
      "Cloud deployments on Azure & GCP",
      "Database design & optimization",
    ],
  },
];
export const experience = [
{
  company: "TNO",
  role: "Cyber Security Engineer",
  start: "Sep 2024",
  end: "Feb 2025",
  type: "Internship",
  location: "Eindhoven, Netherlands",
  bullets: [
    "Contributed to version 3 of Self-Healing For Cyber Security (SH4CS), software that monitors applications in real-time, detects indicators of compromise, and autonomously regenerates containers in cloud environments.",
    "Integrated STIX for structured threat intelligence to enable efficient handling of security data across the system.",
    "Implemented CACAO Security Playbooks to automate threat response workflows and reduce manual intervention.",
    "Worked with SOARCA, TNO's open-source SOAR solution, to orchestrate automated security response using CACAO playbooks.",
    "Delivered a fully autonomous pipeline: data collection → threat detection → mitigation, reinforcing a self-healing security architecture.",
  ],
  tech: ["Go", "Docker", "Kubernetes", "STIX", "CACAO", "SOARCA", "Yaml"],
},
{
  company: "UniCredit Bulbank",
  role: "Cyber Security Engineer",
  start: "Feb 2026",
  end: "Aug 2026",
  type: "Internship",
  location: "Sofia, Bulgaria",
  bullets: [
    "Designed and developed an Outlook Add-in proof-of-concept for UniCredit Bulbank's Security Operations Center (SOC), enabling SOC analysts to detect, analyze, and respond to phishing emails directly inside Microsoft Outlook.",
    "Built an automated phishing analysis pipeline that extracts email headers, URLs, and attachments, scores each component against threat indicators via VirusTotal, and persists structured results to an internal PostgreSQL database.",
    "Implemented SPF, DKIM, and DMARC header validation with automated relay owner notification, if authentication checks fail, the system dispatches mitigation emails to responsible parties without manual intervention.",
    "Integrated with the organization's Remedy ticketing system, auto-generating structured incident tickets populated with extracted email metadata upon Add-in activation.",
    "Architected the backend as a modular monolith using Java Spring Boot, routed through Nginx, with a layered service design ensuring each module, initialization, analysis, dashboard — operates independently behind interface contracts.",
    "Delivered a React-based SOC dashboard providing analysts and team leads visibility into historical phishing submissions, threat trends, repeated indicators, and ticket audit logs.",
  ],
  tech: ["Java", "React", "PostgreSQL", "Office.js", "RedHat Openshift"],
},
];

export const projects = [
  {
    title: "CloudCord",
    description:
      "A Discord-inspired real-time chat platform built with a full microservice architecture. Features multi-database strategy, cloud-hosted message brokering, full observability stack, and GitOps-based deployments — all running on GCP.",
    image: "/projects/test.PNG",
    tech: ["Go", "React", "RabbitMQ", "MongoDB", "PostgreSQL", "Neo4j", "Kubernetes", "ArgoCD", "GitHub Actions", "GCP", "Prometheus", "Grafana", "Loki", "SonarQube"],
    github: "https://github.com/S7eFaNS/CloudCord",
    demo: "",
  },
  {
    title: "SH4CS v3",
    description:
      "Self-Healing For Cyber Security, a real-time application monitoring system that detects indicators of compromise and autonomously regenerates containers in cloud environments. Integrates STIX, CACAO playbooks, and SOARCA for fully automated threat response orchestration.",
    image: "/projects/test.PNG",
    tech: ["Go", "Docker", "Kubernetes", "STIX", "CACAO", "SOARCA", "YAML"],
    github: "",
    demo: "",
  },
  {
    title: "Cheat Engine",
    description:
      "A Cheat Engine clone that manipulates process memory at runtime to read and rewrite values in single-player games. Tested against Minecraft. Built from scratch in C++ with direct memory access and scanning logic.",
    image: "/projects/test.PNG",
    tech: ["C++"],
    github: "https://github.com/S7eFaNS/Cheat-Engine",
    demo: "",
  },
  {
    title: "Royal Casino",
    description:
      "A fullstack CSGO skin marketplace where users play blackjack with virtual currency to win skins, then trade, sell, or withdraw them. Features real-time all-chat via WebSockets and a complete skin economy simulation.",
    image: "/projects/test.PNG",
    tech: ["Java", "React", "TypeScript", "MySQL", "WebSockets"],
    github: "https://github.com/S7eFaNS/Royal-Casino",
    demo: "",
  },
  {
    title: "Fitness Webshop",
    description:
      "A fullstack fitness supplement and workout program store built with Razor Pages. Includes a recommendation algorithm that surfaces products based on purchasing patterns across all users, think a lightweight collaborative filter.",
    image: "/projects/test.PNG",
    tech: ["C#", "ASP.NET", "Razor Pages"],
    github: "https://github.com/S7eFaNS/Fitness-webshop",
    demo: "",
  },
];

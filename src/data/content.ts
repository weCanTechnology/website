// src/data/content.ts
import type {
  NavLink,
  WorkItem,
  BlogPost,
  Service,
  Client,
  Stat,
  Tech,
  JobPosition,
} from "../types";

// --- HEADER ---
export const navLinks: NavLink[] = [
  {
    href: import.meta.env.BASE_URL + "/#services",
    text: "Our Services",
  },
  {
    href: import.meta.env.BASE_URL + "/#aboutUs",
    text: "About Us",
  },
  // {
  //   href: "/work",
  //   text: "Our Work",
  // },
  {
    href: import.meta.env.BASE_URL + "/#blog",
    text: "Blog",
  },
  {
    href: import.meta.env.BASE_URL + "/#career",
    text: "Career",
  },
];

// --- HERO ---
export const heroContent = {
  text: "We develop <br /> opportunity into solution.",
  // desc: "We tackle the complex. \n We deliver the impossible.\n We make it happen.",
};

export const typeWriterTexts = [
  "tackle the complex.",
  "deliver the impossible.",
  "make it happen.",
];

// --- ABOUT US ---
export const aboutUsContent = {
  title: "Value proposition",
  desc: "We bring world-class software development, system integration, and IT consultancy to clients who demand excellence – and aren't afraid of ambitious goals.",
  content: [
    "We take responsibility\nEvery challenge is ours to solve. We own the problem from discovery to deployment, ensuring your success is our success.",
    "We move fast, think smart\nModern tech stack. Thoughtful AI integration. Zero bureaucracy. We adapt quickly and deliver results that matter.",
    "We make it happen\nNo excuses, no endless meetings. We're hands-on problem-solvers who turn your toughest opportunities into production-ready solutions.",
  ],
  final:
    "We bring world-class software development, system integration, and IT consultancy to clients who demand excellence – and aren't afraid of ambitious goals.",
};

export const globalCoverageContent = {
  header: "GLOBAL COVERAGE",
  text: "Headquartered in Budapest, we're active in more than a dozen countries worldwide – delivering excellence 24/7 across diverse cultures and time zones to serve our global clientele.",
};

export const stats: Stat[] = [
  {
    number: "50+",
    text: "client trustful partnerships",
  },
  {
    number: "20+",
    text: "technologies and frameworks we master",
  },
  {
    number: "500+",
    text: "years of combined engineering experience",
  },
];

// --- SERVICES ---
export const servicesData = {
  title: "What we do",
  subtitle:
    "Your engineering SWAT team for any challenge. We solve your toughest technical challenges.",
  items: [
    {
      id: 1,
      title: "Building from scratch?",
      description:
        "Custom software development for web, mobile, and complex backend systems.",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-1.svg",
      link: "",
    },
    {
      id: 2,
      title: "Are you going mobile?",
      description:
        "Native and cross-platform mobile apps that users love and enjoy using every day.",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-2.svg",
      link: "",
    },
    {
      id: 3,
      title: "Want to scale up?  ",
      description:
        "Cloud migration, DevOps automation, and infrastructure optimization that support growth and reliability.",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-3.svg",
      link: "",
    },
    {
      id: 4,
      title: "Want AI that works? ",
      description:
        "LLM integration, RAG systems, recommendation engines, computer vision, generative AI solutions – from proof-of-concept to production. ",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-4.svg",
      link: "/services/ui-ux",
    },
    {
      id: 5,
      title: "Drowning in data?",
      description:
        "Data engineering, analytics pipelines, and scalable infrastructure to turn data into insights.",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-5.svg",
      link: "",
    },
    {
      id: 6,
      title: "Tech debt crushing you? ",
      description:
        "Legacy system modernization and digital transformation that help you scale, innovate, and move forward with confidence. ",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-6.svg",
    },
    {
      id: 7,
      title: "Want peace of mind? ",
      description:
        "DevOps automation, CI/CD pipelines, and infrastructure monitoring that keeps your systems stable and secure.",
      icon: import.meta.env.BASE_URL + "/icons/services-icon-7.svg",
      link: "",
    },
  ],
};

// --- CONTACT SECTION ---
export const contactSectionContent = {
  projectForm: {
    title: "Do you have a project in mind?",
    submitBtn: "SEND INQUIRY",
    fields: {
      name: "Your name*",
      email: "Your email*",
      details: "Your message",
    },
  },
};

export const workPageTags = [
  "Custom software development",
  "Digitization, Cloud enablement",
  "DevOps engineering",
  "Data engineering & AI",
  "System integration",
  "Technical migration",
  "Point of Sales system development",
  "Selfcare app development",
  "24/7 operation",
  "Deployment automation",
  "Big Data Engineering and Ops",
  "Test automation",
  "Gateway/Integration layer solution",
  "Dynamic Customer Experience Builder",
];

// --- OUR WORK ---
export const allWorkItems: WorkItem[] = [
  {
    client: "OSN, MIDDLE-EAST",
    tags: [
      "Gateway/Integration layer solution",
      "System integration",
      "24/7 operation",
    ],
    title: "New Integrated Ecosystem for a Streaming Service Provider",
    description:
      "The gateway component enables the company to manage the streaming service and bundles in a user-friendly and easily scalable framework. We delivered the solution within the deadline with the full satisfaction of the customer, and we are maintaining it as of today.",
    slug: "new-integrated-ecosystem",
    link: "/work/new-integrated-ecosystem",
    heroImage: import.meta.env.BASE_URL + "/images/projects/osn.png",
    galleryImages: [
      import.meta.env.BASE_URL + "/images/Kép6 1.png",
      import.meta.env.BASE_URL + "/icons/Rectangle 41987.png",
      import.meta.env.BASE_URL + "/icons/Rectangle 419878.png",
    ],
  },
  {
    client: "ZAIN IRAQ, MIDDLE-EAST",
    tags: [
      "Selfcare app development",
      "Custom software development",
      "System integration",
    ],
    title: "Mobile Selfcare App Development",
    description:
      "We are developing a mobile self-care application for Zain Iraq. Our primary goal is to deliver a high-performing, modern, and user-friendly platform that offers a comprehensive range of services to meet customer needs effectively.",
    slug: "mobile-selfcare-app",
    link: "/work/mobile-selfcare-app",
    heroImage: import.meta.env.BASE_URL + "/images/projects/zain.png",
    galleryImages: [
      import.meta.env.BASE_URL + "/icons/Rectangle 50.png",
      import.meta.env.BASE_URL + "/icons/Rectangle 41987.png",
    ],
  },
  {
    client: "CLIENT NAME, REGION",
    tags: ["Custom software development", "Deployment automation"],
    title: "E-book Reader and Audiobook Streaming App",
    description:
      "We developed a custom e-book reader and audiobook streaming application for our client. The app allows users to purchase, download, and consume digital content seamlessly.",
    slug: "ebook-reader-app",
    link: "/work/ebook-reader-app",
    heroImage: import.meta.env.BASE_URL + "/images/projects/libri.png",
  },
  {
    client: "FINTECH COMPANY, EUROPE",
    tags: [
      "Digitization, Cloud enablement",
      "DevOps engineering",
      "Technical migration",
    ],
    title: "Cloud Infrastructure Migration for a Fintech Company",
    description:
      "Migrated the entire on-premise infrastructure to a scalable and secure cloud environment, ensuring business continuity and improved performance.",
    // image: import.meta.env.BASE_URL +"/icons/Rectangle 50.png",
    slug: "fintech-app",
    link: "/work/fintech-appp",
    heroImage: import.meta.env.BASE_URL + "/icons/Rectangle 41987.png", // Fő kép
    galleryImages: [], // Itt egyáltalán nincs galéria kép
  },
];

// Ez a szűkített lista a főoldalra
export const featuredWorkItems = allWorkItems.slice(0, 3);

export const clients: Client[] = [
  {
    name: "zain",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/zain.png",
  },
  {
    name: "tewa",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/tewa.png",
  },
  {
    name: "awt",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/awt.png",
  },
  {
    name: "kpmg",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/kpmg.png",
  },
  {
    name: "lufthansa",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/lufthansa.png",
  },
  // {
  //   name: "Nordvik",
  //   logo: import.meta.env.BASE_URL +"/icons/companies/blue/nordvik.png",
  // },
  {
    name: "mckinsey",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/mckinsey.png",
  },
  // {
  //   name: "Dxc",
  //   logo: import.meta.env.BASE_URL +"/icons/companies/blue/dxc.png",
  // },
  {
    name: "libri",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/libri.png",
  },
  {
    name: "oodi",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/oodi.png",
  },
  {
    name: "osn",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/osn.png",
  },
  {
    name: "swapp",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/swapp.png",
  },
  {
    name: "brightcove",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/brightcove.png",
  },
  {
    name: "innovationcity",
    logo: import.meta.env.BASE_URL + "/icons/companies/blue/innovationcity.png",
  },
];

// --- BLOG ---
export const allBlogPosts: BlogPost[] = [
  {
    date: "OCTOBER 21, 2025",
    title: "Our autumn team-building retreat in the Mátra",
    image: import.meta.env.BASE_URL + "/images/blog/blog_14.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_our-autumn-team-building-retreat-in-the-m%C3%A1tra-activity-7386324890204672002-P3zp?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
  {
    date: "OCTOBER 16, 2025",
    title: "We had an incredible experience at GITEX 2025",
    image: import.meta.env.BASE_URL + "/images/blog/blog_13.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_we-had-an-incredible-experience-at-gitex-activity-7384483276914077696-LcuB?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
  {
    date: "OCTOBER 09, 2025",
    title: "At WeCan, adaptability is at the heart of everything we do",
    image: import.meta.env.BASE_URL + "/images/blog/blog_12.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_at-wecan-adaptability-is-at-the-heart-of-activity-7381950311818768384-tDLN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
  {
    date: "OCTOBER 07, 2025",
    title: "Octber is a great time to embrace growth",
    image: import.meta.env.BASE_URL + "/images/blog/blog_11.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_october-is-a-great-time-to-embrace-growth-activity-7379416267142873088-61Je?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
  {
    date: "SEPTEMBER 30, 2025",
    title: "We traded screens for bikes and hit the road",
    image: import.meta.env.BASE_URL + "/images/blog/blog_10.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_we-traded-screens-for-bikes-and-hit-the-activity-7376876869297745920-D-jM?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
  {
    date: "SEPTEMBER 23, 2025",
    title: "Last week in Amsterdam, the halls of IBC activity",
    image: import.meta.env.BASE_URL + "/images/blog/blog_09.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_last-week-in-amsterdam-the-halls-of-ibc-activity-7374805714273333248-mxL5?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
  {
    date: "SEPTEMBER 10, 2025",
    title: "WeCan participated at the Thessaloniki International Fair 2025",
    image: import.meta.env.BASE_URL + "/images/blog/blog_08.jpg",
    link: "https://www.linkedin.com/posts/wecan-technology_wecan-participated-at-the-thessaloniki-international-activity-7374444523588046848-Bd2-?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB5ttA8B3ClgPbLvv0Pk8d-2iUvUcSrhDWs",
  },
];

export const featuredBlogPosts = allBlogPosts.slice(0, 3);

// --- FOOTER ---
export const footerLinks = [
  {
    href: "/",
    text: "About Us",
  },
  {
    href: "/services",
    text: "Services",
  },
  // {
  //   href: "/work",
  //   text: "Works",
  // },
  {
    href: "/career",
    text: "Career",
  },
  { href: "/blog", text: "Blog" },
];

export const footerServices = [
  {
    href: "/services",
    text: "Custom Software Development",
  },
  {
    href: "/services",
    text: "Digitization, Cloud Engineering",
  },
  {
    href: "/services",
    text: "DevOps Engineering",
  },
  {
    href: "/services",
    text: "Data Engineering & AI",
  },
];

export const techStack: Tech[] = [
  {
    name: "Angular",
    logo: import.meta.env.BASE_URL + "/icons/tech/angular-3-logo.svg",
  },
  {
    name: "C++",
    logo: import.meta.env.BASE_URL + "/icons/tech/c++-logo.svg",
  },
  {
    name: "Docker",
    logo: import.meta.env.BASE_URL + "/icons/tech/docker-logo.svg",
  },
  {
    name: "Flutter",
    logo: import.meta.env.BASE_URL + "/icons/tech/flutter-logo.svg",
  },
  {
    name: "Hadoop",
    logo: import.meta.env.BASE_URL + "/icons/tech/hadoop-logo.svg",
  },
  {
    name: "Kotlin",
    logo: import.meta.env.BASE_URL + "/icons/tech/kotlin-logo.svg",
  },
  {
    name: "Microsoft Azure",
    logo: import.meta.env.BASE_URL + "/icons/tech/microsoft-azure-logo.svg",
  },
  {
    name: "NestJS",
    logo: import.meta.env.BASE_URL + "/icons/tech/nestJS-logo.svg",
  },
  {
    name: ".NET",
    logo: import.meta.env.BASE_URL + "/icons/tech/net-core-logo.svg",
  },
  {
    name: "Next.js",
    logo: import.meta.env.BASE_URL + "/icons/tech/nextjs-logo.svg",
  },
  {
    name: "Node.js",
    logo: import.meta.env.BASE_URL + "/icons/tech/node-js-logo.svg",
  },
  {
    name: "React",
    logo: import.meta.env.BASE_URL + "/icons/tech/react-logo.svg",
  },
  {
    name: "Spring Boot",
    logo: import.meta.env.BASE_URL + "/icons/tech/spring-boot-logo.svg",
  },
  {
    name: "Typescript",
    logo: import.meta.env.BASE_URL + "/icons/tech/typescript-logo.svg",
  },
  {
    name: "WordPress",
    logo: import.meta.env.BASE_URL + "/icons/tech/wordpress-logo.svg",
  },
];

export const jobPositions: JobPosition[] = [
  // {
  //   title: "Solution Architect",
  //   description:
  //     "We are looking for Solution Architect to join our team having the unmistakable WeCan attitude.",
  //   tags: ["100% remote", "full-time"],
  //   applyLink: "#",
  // },
  {
    title: "DevOps Engineer",
    description:
      "Our main expectation is eagerness and perseverance with learning DevOps.",
    tags: ["100% remote", "full-time"],
    applyLink: "#",
  },
  // {
  //   title: "Front-end (React/Angular) developer",
  //   description:
  //     "We would like to expand our Front-end team with at least two senior colleagues.",
  //   tags: ["100% remote", "full-time"],
  //   applyLink: "#",
  // },
];

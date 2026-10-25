// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update all portfolio text, links & images.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Mohammed Rayan Basha",
  firstName: "Mohammed Rayan",
  lastName: "Basha",
  headline: "Mechanical Engineering Student | Aspiring Entrepreneur | Creative Problem Solver",
  intro:
    "I am a B.Tech Mechanical Engineering student at B.S. Abdur Rahman Crescent Institute of Science and Technology, Chennai. I am interested in entrepreneurship, technology, innovation, business, and leadership. I enjoy exploring ideas, solving practical problems, coordinating events, and combining creativity with technology to develop meaningful solutions.",
  about:
    "I am an engineering student with interests that extend beyond academics into entrepreneurship, business, technology, creative work, and leadership. I enjoy developing project concepts, exploring innovative solutions, and participating in college club activities. My goal is to build practical skills, gain experience, and turn ideas into meaningful projects.",
  details: [
    { label: "Name", value: "Mohammed Rayan Basha" },
    { label: "Profession", value: "Mechanical Engineering Student" },
    { label: "Institution", value: "B.S. Abdur Rahman Crescent Institute of Science and Technology, Chennai" },
    { label: "Degree", value: "B.Tech Mechanical Engineering" },
    { label: "Academic Period", value: "2025–2029" },
    { label: "Location", value: "Chennai, Tamil Nadu, India" },
  ],
  // Replace with your own portrait: e.g. "/images/portrait.jpg"
  portrait: "" as string,
};

export const education = [
  {
    institution: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    degree: "B.Tech Mechanical Engineering",
    duration: "2025–2029",
    location: "Chennai, Tamil Nadu, India",
    status: "In Progress",
  },
];

export type Project = {
  id: string;
  code: string;
  title: string;
  short: string;
  category: string[];
  overview: string;
  problem: string;
  solution: string;
  featuresLabel: string;
  features: string[];
  objective?: string;
  status: string;
  image: string; // leave empty for placeholder
  links: { label: string; href: string }[]; // leave href empty to show as pending
};

export const projects: Project[] = [
  {
    id: "slqms",
    code: "01",
    title: "Smart Lift Status & Queue Management System",
    short: "SLQMS",
    category: ["Smart Systems", "Design Thinking", "Urban Mobility"],
    overview:
      "A design-thinking project focused on reducing elevator waiting time and improving passenger flow through accessible lift-status information and more efficient queue management.",
    problem:
      "Crowded buildings often experience long elevator queues, congestion, and uncertainty about lift availability.",
    solution:
      "Explore a smart-system approach that communicates lift status and improves passenger queue organization.",
    featuresLabel: "Key Objectives",
    features: [
      "Reduce unnecessary waiting time.",
      "Improve passenger flow and queue organization.",
      "Make lift-status information easier to access.",
      "Explore practical solutions to everyday infrastructure problems.",
    ],
    status: "Concept · Design Thinking Phase",
    image: "",
    links: [
      { label: "Case Study", href: "" },
      { label: "Repository", href: "" },
    ],
  },
  {
    id: "planner",
    code: "02",
    title: "Student Planner & Academic Management App",
    short: "Student Planner",
    category: ["Productivity", "EdTech", "Application Design"],
    overview:
      "An all-in-one student productivity application concept designed to combine academic planning and personal organization in a single interface.",
    problem:
      "Students often manage attendance, schedules, assignments, projects, tasks, and expenses across multiple platforms.",
    solution:
      "A single, centralized application that brings academic planning and personal organization together in one coherent interface.",
    featuresLabel: "Proposed Features",
    features: [
      "Smart scheduling for classes and study sessions.",
      "Attendance tracking.",
      "Assignment and project management.",
      "Daily task lists and priorities.",
      "Student budget and expense tracking.",
      "Centralized productivity dashboard.",
    ],
    objective:
      "Help students organize their academic responsibilities, manage time effectively, and maintain a clearer overview of their daily activities.",
    status: "Concept · Application Design",
    image: "",
    links: [
      { label: "Prototype", href: "" },
      { label: "Repository", href: "" },
    ],
  },
  {
    id: "album",
    code: "03",
    title: "Intelligent Photo Album Organizer",
    short: "Photo Organizer",
    category: ["Artificial Intelligence", "Machine Learning", "Digital Organization"],
    overview:
      "An AI-based application concept exploring how visually similar photographs can be grouped into organized albums.",
    problem:
      "Large photo collections can become difficult to navigate because similar images and photographs from different occasions remain mixed together.",
    solution:
      "Use image-similarity analysis to automatically cluster related photographs into organized albums, reducing manual sorting.",
    featuresLabel: "Proposed Features",
    features: [
      "Automatic grouping of visually similar photographs.",
      "Organized digital albums.",
      "Reduced manual photo sorting.",
      "Easier discovery of related images.",
      "Exploration of image-similarity analysis and machine-learning concepts.",
    ],
    objective:
      "Make digital photo organization more convenient through intelligent image categorization.",
    status: "Concept · AI / ML Exploration",
    image: "",
    links: [
      { label: "Overview", href: "" },
      { label: "Repository", href: "" },
    ],
  },
];

export const experience = [
  {
    code: "OP-01",
    org: "Crescent Club for Cobotics",
    role: "Executive Member",
    points: ["Interest in engineering, cobotics, and technology-related activities."],
  },
  {
    code: "OP-02",
    org: "Crescent Readers Club",
    role: "Executive Member / Marketing",
    points: ["Interest in student engagement, recruitment, marketing, and event coordination."],
  },
];

export const activities = [
  "Event planning and coordination.",
  "Student engagement and marketing.",
  "Creative event concepts.",
  "Team collaboration and communication.",
];

export const skills = {
  professional: [
    "Leadership",
    "Teamwork",
    "Communication",
    "Problem Solving",
    "Creative Thinking",
    "Project Planning",
    "Event Coordination",
  ],
  technical: [
    "Mechanical Engineering",
    "CAD Fundamentals",
    "AI and Machine Learning Concepts",
    "Smart Systems",
    "Digital Product Design",
  ],
  interests: [
    "Entrepreneurship and Startups",
    "Business and Management",
    "Technology and Innovation",
    "Product Development",
    "Creative Media",
  ],
};

export type CreativeItem = {
  title: string;
  type: string;
  image: string; // leave empty for placeholder
  href?: string;
  span?: "wide" | "tall" | "normal";
};

export const creative: CreativeItem[] = [
  { title: "College Event Poster", type: "Poster Design", image: "", span: "tall" },
  { title: "Promotional Design", type: "Promotional", image: "", span: "normal" },
  { title: "Instagram Reel", type: "Video Edit", image: "", span: "normal" },
  { title: "Event Branding", type: "Branding", image: "", span: "wide" },
  { title: "Creative Experiment", type: "Experimental", image: "", span: "normal" },
  { title: "Video Edit", type: "Motion", image: "", span: "normal" },
];

export const contact = {
  email: "rayanrocker899@gmail.com",
  phone: "8610452188",
  phoneDisplay: "+91 86104 52188",
  location: "Chennai, Tamil Nadu, India",
  socials: [
    { label: "LinkedIn", href: "" }, // e.g. "https://linkedin.com/in/your-handle"
    { label: "GitHub", href: "" }, // e.g. "https://github.com/your-handle"
    { label: "Instagram", href: "" }, // e.g. "https://instagram.com/your-handle"
  ],
};

export const sections = [
  { id: "intro", label: "Intro", code: "00" },
  { id: "about", label: "Personnel File", code: "01" },
  { id: "education", label: "Academic Record", code: "02" },
  { id: "projects", label: "Project Archive", code: "03" },
  { id: "experience", label: "Field Operations", code: "04" },
  { id: "skills", label: "Capabilities", code: "05" },
  { id: "creative", label: "Creative Archive", code: "06" },
  { id: "contact", label: "Secure Connection", code: "07" },
];

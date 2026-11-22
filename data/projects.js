/**
 * ============================================================================
 * Projects Data Configuration - Vedant Birajdar Portfolio
 * ============================================================================
 * 
 * HOW TO MANUALLY ADD A NEW PROJECT:
 * 1. (Optional) Place your project screenshot or thumbnail inside the public folder:
 *    public/projects/your-screenshot.png
 * 
 * 2. Copy the template below and add it to the `projects` array.
 * 
 * 3. Fill in the project details:
 *    - `title`: Name of the project (e.g., "Smart Home Dashboard")
 *    - `description`: A clear, professional summary of the application
 *    - `technologies`: Array of technologies used (e.g., ["Python", "GUI Development"])
 *    - `screenshot`: Path to screenshot, e.g., "/projects/your-screenshot.png" (or "" for auto mockup)
 *    - `githubUrl`: Verified GitHub repository URL (leave "" if private/not yet available)
 *    - `liveDemoUrl`: Optional live demo URL (leave "" if not hosted)
 * 
 * 4. Save this file. The website will automatically render the new project card.
 * 
 * --- TEMPLATE ---
 * {
 *   id: "my-new-project",
 *   title: "Project Title",
 *   description: "Description of what the project does and its key features.",
 *   technologies: ["Python", "GUI Development"],
 *   screenshot: "/projects/my-screenshot.png", // or ""
 *   githubUrl: "https://github.com/birajdarvedant25-ship-it/repo-name", // or ""
 *   liveDemoUrl: "https://my-demo-link.com" // or ""
 * },
 * -----------------
 */

export const projects = [
  {
    id: "finadvisor-ai",
    title: "FinAdvisor AI – Personal Finance Advisor Bot",
    description: "An AI-powered personal finance application that helps users manage income, track expenses, create budgets and monitor savings. Provides automated insights and advisory calculations to promote financial discipline.",
    technologies: ["Python", "GUI Development", "AI Integration"],
    screenshot: "", // Place actual screenshot in public/projects/finadvisor.png when available
    theme: "finance",
    githubUrl: "https://github.com/birajdarvedant25-ship-it/finadvisor-ai",
    liveDemoUrl: "" // Live demo button only appears when a valid link is provided
  },
  {
    id: "krishimitra-ai",
    title: "KrishiMitra AI",
    description: "An AI-powered agriculture assistance project designed to help users with agricultural information and support. Assisting farmers with crop health queries, weather advisories, and farming decisions.",
    technologies: ["Python", "AI Assistance"],
    screenshot: "", // Place actual screenshot in public/projects/krishimitra.png when available
    theme: "agri",
    githubUrl: "https://github.com/birajdarvedant25-ship-it/KrishiMitra",
    liveDemoUrl: "https://krishimitra-mocha-two.vercel.app"
  }
];

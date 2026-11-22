# Vedant Birajdar - Personal Portfolio

A modern, responsive personal portfolio website for **Vedant Birajdar**, B.Tech student at Dr. D. Y. Patil College of Engineering and Innovation specializing in Python, C, C++, and GUI Development.

This is a clean, public portfolio. Visitors can view your information, projects, and certifications. There are no admin panels or editing controls visible to the public.

---

## How to Update Your Content Manually

All portfolio content is maintained cleanly through simple JavaScript data files located in `data/`, with static assets placed in `public/`.

---

### 1. Profile Photograph

Your actual photograph is located at:
```text
assets/profile/pfp.jpeg
```
The homepage profile frame loads `./assets/profile/pfp.jpeg` with `object-fit: cover` and centered cropping inside the glowing blue-purple gradient frame. If the image cannot load, a graceful SVG silhouette renders automatically.

---

### 2. How to Add a New Project

1. **(Optional) Add a screenshot:** Place your project screenshot inside `public/projects/`:
   ```text
   public/projects/my-new-project.png
   ```
2. **Add details to `data/projects.js`:** Open [data/projects.js](file:///c:/Users/Vedant/Downloads/Portfolio/data/projects.js) and add a new object to the `projects` array:
   ```javascript
   {
     id: "my-new-project",
     title: "Project Title",
     description: "A clear description of what the project does and the problem it solves.",
     technologies: ["Python", "GUI Development"],
     screenshot: "/projects/my-new-project.png", // Or "" to display the themed mockup graphic
     githubUrl: "https://github.com/birajdarvedant25-ship-it/repo-name", // Or "" if not yet public
     liveDemoUrl: "https://my-demo-link.com" // Or "" if no live demo exists
   },
   ```
3. **Save the file.** The website will automatically render the new project card.
   - The **GitHub** button only displays when a valid `githubUrl` is supplied.
   - The **Live Demo** button only displays when a valid `liveDemoUrl` is supplied.

---

### 3. How to Edit or Delete a Project

- **To edit a project:** Open [data/projects.js](file:///c:/Users/Vedant/Downloads/Portfolio/data/projects.js), find the project by its `id`, and update the title, description, technologies, or links.
- **To delete a project:** Remove the project's object from the `projects` array in [data/projects.js](file:///c:/Users/Vedant/Downloads/Portfolio/data/projects.js).

---

### 4. Certifications Gallery

The Certifications section uses a clean, minimal gallery layout:
- **Desktop:** 2 large certificates per row.
- **Mobile:** 1 certificate per row.
- **Card Focus:** High-resolution document preview, Certificate Name, and Issuing Organization.
- **Interactive Lightbox:** Clicking anywhere on a certificate preview opens the complete, full-resolution PDF or image document in a responsive modal with zoom/scrolling and an "Open Full File" button.

#### How to Add a New Certificate:
1. Place your certificate file (PDF, PNG, JPG) in `assets/certificates/`:
   ```text
   assets/certificates/my-certificate.pdf
   ```
2. Add an entry to [data/certificates.js](file:///c:/Users/Vedant/Downloads/Portfolio/data/certificates.js):
   ```javascript
   {
     id: "my-cert-id",
     title: "Certificate Name",
     issuer: "Issuing Organization",
     file: "./assets/certificates/my-certificate.pdf",
     thumbnail: "./assets/certificates/thumbnails/my-certificate.jpg" // Or leave same as file if an image
   },
   ```
3. Save the file. The new certificate preview will appear in the gallery.

---

### 5. How to Edit or Delete a Certificate

- **To edit a certificate:** Open [data/certificates.js](file:///c:/Users/Vedant/Downloads/Portfolio/data/certificates.js) and update its title, issuer, date, or file path.
- **To delete a certificate:** Remove the certificate's object from the `certificates` array.

---

### 6. Contact Information

- **Email:** `birajdarvedant25@gmail.com`
- **Email Me Button:** Opens default mail client pre-addressed to `birajdarvedant25@gmail.com`.
- **GitHub:** `https://github.com/birajdarvedant25-ship-it`
- **LinkedIn:** `https://www.linkedin.com/in/vedant-birajdar-b53603384/`

---

## Development & Build Commands

### Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view your live portfolio with instant hot reloading.

### Build for Production
```bash
npm run build
```
Creates an optimized static production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```text
Portfolio/
├── index.html              # Main HTML document
├── styles.css              # Dark theme styling, animations & responsive layouts
├── script.js               # Dynamic rendering for projects, certs, navigation & scrollspy
├── vite.config.js          # Vite build configuration
├── data/
│   ├── projects.js         # Projects list (FinAdvisor AI, KrishiMitra AI, etc.)
│   └── certificates.js     # Certifications list (empty until certificates are added)
├── public/
│   ├── certificates/       # Static certificate PDFs & image files
│   └── projects/           # Static project screenshots
├── assets/
│   ├── profile/
│   │   └── pfp.jpeg        # Your profile photograph
│   └── certificates/       # Source certificate PDFs
└── package.json
```

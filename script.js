/**
 * Portfolio JavaScript - Vedant Birajdar
 * Dynamic Projects & Certifications Rendering, Navigation, Modal Viewer, and Interactions
 */

import { projects } from './data/projects.js';
import { certificates } from './data/certificates.js';

// Helper to escape HTML characters safely
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Normalize asset paths so both "./assets/...", "public/...", and "/assets/..." work cleanly
function normalizeAssetPath(path) {
  if (!path) return '';
  const trimmed = path.trim();
  if (trimmed.startsWith('./')) {
    return '/' + trimmed.slice(2);
  }
  if (trimmed.startsWith('public/')) {
    return '/' + trimmed.slice(7);
  }
  if (!trimmed.startsWith('/') && !trimmed.startsWith('http')) {
    return '/' + trimmed;
  }
  return trimmed;
}

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Header Elements
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Containers for Dynamic Content
  const projectsContainer = document.getElementById('projects-container');
  const certificationsContainer = document.getElementById('certifications-container');

  // Certificate Modal Elements
  const certModal = document.getElementById('cert-viewer-modal');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalExtLink = document.getElementById('cert-modal-ext-link');
  const certModalBody = document.getElementById('cert-modal-body');
  const certModalCloseBtn = document.getElementById('cert-modal-close-btn');

  // Profile Image and Graceful Fallback
  const profileImg = document.getElementById('profile-user-image');
  const profileFallback = document.getElementById('profile-photo-fallback');

  if (profileImg && profileFallback) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      profileFallback.style.display = 'flex';
    });

    profileImg.addEventListener('load', () => {
      if (profileImg.naturalWidth > 0) {
        profileImg.style.display = 'block';
        profileFallback.style.display = 'none';
      }
    });

    if (profileImg.complete) {
      if (profileImg.naturalWidth === 0) {
        profileImg.style.display = 'none';
        profileFallback.style.display = 'flex';
      } else {
        profileImg.style.display = 'block';
        profileFallback.style.display = 'none';
      }
    }
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  // =========================================================================
  // 1. Render Projects Dynamically
  // =========================================================================
  function renderProjects() {
    if (!projectsContainer) return;

    if (!projects || projects.length === 0) {
      projectsContainer.innerHTML = `
        <div class="cert-empty-state">
          <p class="cert-empty-desc">Featured projects will be showcased here soon.</p>
        </div>
      `;
      return;
    }

    const cardsHtml = projects.map(project => {
      let mediaMarkup = '';
      const screenshotUrl = normalizeAssetPath(project.screenshot);

      if (screenshotUrl && screenshotUrl !== '') {
        mediaMarkup = `
          <div class="project-media-wrapper">
            <div class="project-image-box">
              <img src="${escapeHtml(screenshotUrl)}" alt="${escapeHtml(project.title)} Screenshot" class="project-screenshot-img" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'project-screenshot-placeholder general-theme\\'><div class=\\'mockup-window-bar\\'><span class=\\'mock-title\\'>${escapeHtml(project.title)}</span></div></div>';">
            </div>
          </div>
        `;
      } else if (project.theme === 'finance') {
        mediaMarkup = `
          <div class="project-media-wrapper">
            <div class="project-screenshot-placeholder finance-theme">
              <div class="mockup-window-bar">
                <span class="mock-dot dot-red"></span>
                <span class="mock-dot dot-yellow"></span>
                <span class="mock-dot dot-green"></span>
                <span class="mock-title">finadvisor-ai ~ dashboard</span>
              </div>
              <div class="mockup-screen-content">
                <div class="mock-stat-row">
                  <div class="mock-card-mini">
                    <span class="mock-label">Total Balance</span>
                    <span class="mock-value">₹84,250</span>
                  </div>
                  <div class="mock-card-mini">
                    <span class="mock-label">Savings Target</span>
                    <span class="mock-value green">82% Achieved</span>
                  </div>
                </div>
                <div class="mock-chart-box">
                  <div class="mock-chart-bar" style="height: 45%;"></div>
                  <div class="mock-chart-bar" style="height: 70%;"></div>
                  <div class="mock-chart-bar active" style="height: 85%;"></div>
                  <div class="mock-chart-bar" style="height: 60%;"></div>
                  <div class="mock-chart-bar" style="height: 90%;"></div>
                </div>
                <div class="mock-ai-advisor">
                  <span class="ai-badge">AI Advisor Active</span>
                  <span class="ai-tip">"Budget allocation optimized: ₹3,200 saved this week."</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (project.theme === 'agri') {
        mediaMarkup = `
          <div class="project-media-wrapper">
            <div class="project-screenshot-placeholder agri-theme">
              <div class="mockup-window-bar">
                <span class="mock-dot dot-red"></span>
                <span class="mock-dot dot-yellow"></span>
                <span class="mock-dot dot-green"></span>
                <span class="mock-title">krishimitra-ai ~ portal</span>
              </div>
              <div class="mockup-screen-content">
                <div class="mock-stat-row">
                  <div class="mock-card-mini">
                    <span class="mock-label">Crop Advisory</span>
                    <span class="mock-value green">Optimal Season</span>
                  </div>
                  <div class="mock-card-mini">
                    <span class="mock-label">Soil Moisture</span>
                    <span class="mock-value">68% - Normal</span>
                  </div>
                </div>
                <div class="mock-chart-box agri-boxes">
                  <div class="agri-sensor-card">Weather: 28°C Sunny</div>
                  <div class="agri-sensor-card">Fertilizer Guide: Ready</div>
                </div>
                <div class="mock-ai-advisor">
                  <span class="ai-badge agri">AI Diagnostic Ready</span>
                  <span class="ai-tip">"Pest risk minimal. Recommendations updated for kharif crops."</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        mediaMarkup = `
          <div class="project-media-wrapper">
            <div class="project-screenshot-placeholder general-theme">
              <div class="mockup-window-bar">
                <span class="mock-dot dot-red"></span>
                <span class="mock-dot dot-yellow"></span>
                <span class="mock-dot dot-green"></span>
                <span class="mock-title">${escapeHtml(project.id || 'software-project')}</span>
              </div>
              <div class="mockup-screen-content">
                <div class="mock-stat-row">
                  <div class="mock-card-mini">
                    <span class="mock-label">Status</span>
                    <span class="mock-value green">Active Build</span>
                  </div>
                  <div class="mock-card-mini">
                    <span class="mock-label">Stack</span>
                    <span class="mock-value">${escapeHtml(project.technologies ? project.technologies[0] : 'Python')}</span>
                  </div>
                </div>
                <div class="mock-chart-box">
                  <div class="mock-chart-bar active" style="height: 65%;"></div>
                  <div class="mock-chart-bar" style="height: 80%;"></div>
                  <div class="mock-chart-bar active" style="height: 75%;"></div>
                  <div class="mock-chart-bar" style="height: 90%;"></div>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      const techBadges = (project.technologies || []).map(t => 
        `<span class="tech-tag">${escapeHtml(t)}</span>`
      ).join('');

      let buttonsMarkup = '';

      if (project.githubUrl && project.githubUrl.trim() !== '') {
        buttonsMarkup += `
          <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
            <svg class="icon-tiny" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>GitHub Repository</span>
          </a>
        `;
      }

      if (project.liveDemoUrl && project.liveDemoUrl.trim() !== '') {
        buttonsMarkup += `
          <a href="${escapeHtml(project.liveDemoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
            <svg class="icon-tiny" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>Live Demo</span>
          </a>
        `;
      }

      return `
        <article class="project-card">
          ${mediaMarkup}
          <div class="project-content">
            <div class="project-tech-badges">
              ${techBadges}
            </div>
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-desc">${escapeHtml(project.description)}</p>
            <div class="project-buttons">
              ${buttonsMarkup}
            </div>
          </div>
        </article>
      `;
    }).join('');

    projectsContainer.innerHTML = cardsHtml;
  }

  // =========================================================================
  // 2. Render Certifications Gallery & Modal Lightbox
  // =========================================================================
  function renderCertifications() {
    if (!certificationsContainer) return;

    if (!certificates || certificates.length === 0) {
      certificationsContainer.innerHTML = `
        <div class="cert-empty-state">
          <div class="cert-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="8" r="7"/>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
            </svg>
          </div>
          <h3 class="cert-empty-title">Certifications in Progress</h3>
          <p class="cert-empty-desc">
            Currently completing B.Tech coursework and preparing for technical certifications in Python, C, C++, and software development. Verified certificates will be showcased here once completed.
          </p>
        </div>
      `;
      return;
    }

    const certCardsHtml = certificates.map(cert => {
      const fileUrl = normalizeAssetPath(cert.file);
      const thumbUrl = normalizeAssetPath(cert.thumbnail || cert.file);

      return `
        <article class="cert-gallery-card" data-cert-id="${escapeHtml(cert.id)}" tabindex="0" role="button" aria-label="View full resolution: ${escapeHtml(cert.title)}">
          <div class="cert-preview-frame">
            <img 
              src="${escapeHtml(thumbUrl)}" 
              alt="${escapeHtml(cert.title)} Preview" 
              class="cert-preview-img" 
              loading="lazy"
              onerror="this.onerror=null; this.src='${escapeHtml(fileUrl)}';"
            >
            <div class="cert-preview-overlay">
              <span class="cert-zoom-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <span>View Full Resolution</span>
              </span>
            </div>
          </div>
          <div class="cert-meta-info">
            <h3 class="cert-name">${escapeHtml(cert.title)}</h3>
            <p class="cert-org">${escapeHtml(cert.issuer)}</p>
          </div>
        </article>
      `;
    }).join('');

    certificationsContainer.innerHTML = `<div class="cert-gallery-grid">${certCardsHtml}</div>`;

    // Attach click and keyboard handlers to open the viewer modal
    const cards = certificationsContainer.querySelectorAll('.cert-gallery-card');
    cards.forEach(card => {
      const certId = card.getAttribute('data-cert-id');
      const certObj = certificates.find(c => c.id === certId);
      if (!certObj) return;

      // Click card anywhere
      card.addEventListener('click', () => {
        openCertificateModal(certObj);
      });

      // Keyboard accessibility (Enter or Space)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCertificateModal(certObj);
        }
      });
    });
  }

  // Certificate Modal Controller
  function openCertificateModal(cert) {
    if (!certModal) return;

    const cleanUrl = normalizeAssetPath(cert.file);
    const isPdf = cleanUrl.toLowerCase().endsWith('.pdf');

    certModalTitle.textContent = cert.title;
    certModalIssuer.textContent = cert.issuer;
    certModalExtLink.setAttribute('href', cleanUrl);

    if (isPdf) {
      certModalBody.innerHTML = `
        <iframe 
          src="${escapeHtml(cleanUrl)}#toolbar=1&navpanes=0&view=Fit" 
          class="cert-modal-iframe" 
          title="${escapeHtml(cert.title)}"
        ></iframe>
      `;
    } else {
      certModalBody.innerHTML = `
        <div class="cert-modal-image-wrapper">
          <img src="${escapeHtml(cleanUrl)}" alt="${escapeHtml(cert.title)}" class="cert-modal-image">
        </div>
      `;
    }

    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertificateModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!certModal.classList.contains('active')) {
        certModalBody.innerHTML = '';
      }
    }, 250);
  }

  if (certModalCloseBtn) {
    certModalCloseBtn.addEventListener('click', closeCertificateModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertificateModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeCertificateModal();
      }
    });
  }

  // Initial dynamic renders
  renderProjects();
  renderCertifications();

  // =========================================================================
  // 3. Mobile Navigation Drawer Toggle
  // =========================================================================
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 4. Header Shadow on Scroll
  // =========================================================================
  const handleScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // =========================================================================
  // 5. Scrollspy (Active Link Highlighting)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // =========================================================================
  // 6. Contact Form Simulation (with client-side validation)
  // =========================================================================
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback';
        formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.style.color = '#f87171';
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
      }

      formFeedback.style.display = 'block';
      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = `Thank you, ${name}! Your message has been prepared. (Click "Email Me" or email birajdarvedant25@gmail.com for direct contact).`;
      
      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 6000);
    });
  }

  // =========================================================================
  // 7. Subtle Scroll Reveal Animations
  // =========================================================================
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedSelectors = [
      '.about-card',
      '.skill-card',
      '.project-card',
      '.cert-gallery-card',
      '.cert-empty-state',
      '.contact-info-card',
      '.contact-form-card'
    ];

    document.querySelectorAll(animatedSelectors.join(',')).forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      revealObserver.observe(card);
    });

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(styleEl);
  }
});

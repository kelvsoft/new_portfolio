import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Globe, Download, Briefcase, User, MessageSquare, Brain, Smartphone, X, Menu } from "lucide-react";

/**
 * Enhanced Portfolio Component
 * Features:
 * - Smooth animations with Framer Motion
 * - Responsive design with mobile-first approach
 * - Dark/light theme toggle
 * - Single-page navigation
 * - Project showcase with case studies
 * - Contact form and testimonials
 */

export default function PortfolioTest() {
  // State management
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle with localStorage persistence
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Navigation items with icons
  const navItems = [
    { label: "Home", section: "home", icon: User },
    { label: "Work", section: "projects", icon: Briefcase },
    { label: "About", section: "about", icon: Brain },
    { label: "Contact", section: "contact", icon: Smartphone },
  ];

  // Close mobile menu
  const closeMenu = () => setActive(active === "menu" ? "home" : active);

  /**
   * Project Card Component
   * Displays project information with animations and responsive layout
   */
  const ProjectCard = ({ title, subtitle, bullets = [], img, tags = [], actions = [], featured = false }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-300 ${
        featured ? "ring-2 ring-amber-500/20" : ""
      }`}
    >
      {/* Project header with image and basic info */}
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="flex items-center justify-center flex-shrink-0 w-full h-32 overflow-hidden sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
          {img ? (
            <img 
              src={img} 
              alt={title} 
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="p-4 text-sm text-slate-400">Project Image</div>
          )}
        </div>
        
        {/* Project details */}
        <div className="flex-1 w-full">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>
            </div>
            {featured && (
              <span className="flex-shrink-0 px-3 py-1 ml-2 text-xs font-medium text-white rounded-full bg-amber-500">
                Featured
              </span>
            )}
          </div>

          {/* Project features list */}
          <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="mt-1 mr-2 text-amber-500">•</span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-xs border rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        {actions.map((action, i) => (
          <a
            key={i}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 bg-transparent border rounded-lg border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {action.icon && <action.icon className="w-4 h-4" />}
            {action.label}
          </a>
        ))}
      </div>
    </motion.article>
  );

  // Sample project data - replace with real projects
  const projects = [
    {
      title: "Somi Store — Full eCommerce Platform",
      subtitle: "End-to-end eCommerce solution with admin dashboard, payment processing, and AI-powered insights",
      bullets: [
        "Built complete product management system with image upload and categorization",
        "Implemented real-time admin dashboard with order tracking and analytics",
        "Developed custom chat support system with message persistence",
        "Integrated AI insights for merchant decision-making and customer recommendations"
      ],
      tags: ["React", "Laravel", "MySQL", "AI Integration", "Payment Processing"],
      img: "https://placehold.co/1200x800/22c55e/ffffff?text=E-Commerce+Demo",
      actions: [
        { label: "Live Demo", href: "#" },
        { label: "Case Study", href: "#" },
      ],
      featured: true
    },
    {
      title: "SamsanHub — AI Insight Platform",
      subtitle: "AI-driven business intelligence platform with automated content generation",
      bullets: [
        "Built reusable AI components with server-side API integrations",
        "Implemented role-based access control and secure authentication",
        "Created responsive UI with real-time data visualization",
        "Optimized performance with lazy loading and caching strategies"
      ],
      tags: ["AI/ML", "React", "Node.js", "Data Visualization", "REST APIs"],
      img: "https://placehold.co/1200x800/eab308/ffffff?text=AI+Insights+Demo",
      actions: [
        { label: "View Project", href: "#" },
      ],
      featured: false
    },
    {
      title: "Real-time Chat System",
      subtitle: "Scalable messaging platform with admin interface and email fallback",
      bullets: [
        "Developed real-time chat with WebSocket connections",
        "Built admin message interface with customer response management",
        "Implemented message persistence and email notifications",
        "Ensured accessibility and mobile-responsive design"
      ],
      tags: ["WebSockets", "React", "UX Design", "Real-time", "Mobile First"],
      img: "https://placehold.co/1200x800/0ea5e9/ffffff?text=Chat+System+Demo",
      actions: [
        { label: "Read More", href: "#" },
      ],
      featured: false
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Kelvin delivered a complex eCommerce platform ahead of schedule. His clean code and attention to detail made the entire process smooth and professional.",
      author: "Client — Somi Store",
      role: "Project Manager"
    },
    {
      quote: "The AI insights feature Kelvin implemented transformed how we analyze customer data. His technical expertise and problem-solving skills are exceptional.",
      author: "Partner — SamsanHub",
      role: "Product Lead"
    },
  ];

  /**
   * Mobile Menu Component
   * Full-screen navigation for mobile devices with smooth animations
   */
  const MobileMenu = () => (
    <AnimatePresence>
      {active === "menu" && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 p-6 overflow-y-auto bg-white dark:bg-slate-900 md:hidden"
        >
          {/* Menu header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
              Menu
            </div>
            <button 
              onClick={closeMenu}
              className="p-2 transition-colors duration-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex flex-col gap-3 mt-6">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => {
                  setActive(item.section);
                  closeMenu();
                }}
                className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium text-left transition-all duration-200 ${
                  active === item.section
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme toggle and actions */}
          <div className="pt-6 mt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Preferences & Actions</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between p-4 transition-colors duration-200 border rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span className="font-medium">Theme</span>
                <span className="font-semibold text-amber-500">
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </span>
              </button>
              <a
                href="#contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 p-4 font-semibold text-center text-white transition-all duration-200 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Start a Project
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={theme}>
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        
        {/* Mobile Menu */}
        <MobileMenu />

        {/* Header with scroll effects */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`max-w-7xl mx-auto p-4 sm:p-6 flex items-center justify-between sticky top-0 z-40 transition-all duration-300 ${
            isScrolled 
              ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm" 
              : "bg-transparent"
          }`}
        >
          {/* Logo and brand */}
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white shadow-lg rounded-xl bg-gradient-to-br from-amber-500 to-orange-500"
            >
              KW
            </motion.div>
            <div>
              <div className="text-lg font-bold text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                Kelvin Williams
              </div>
              <div className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                Full‑Stack Developer • React / Laravel Specialist • AI & eCommerce
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => setActive(item.section)}
                className={`relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                  active === item.section 
                    ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
                {active === item.section && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-lg bg-amber-500/10 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 transition-colors duration-200 border rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </nav>

          {/* Mobile menu button and CTA */}
          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="items-center hidden gap-2 px-4 py-2 font-semibold text-white transition-all duration-200 rounded-lg md:inline-flex bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              Hire Me
            </a>
            <button 
              onClick={() => setActive("menu")}
              className="p-2 transition-colors duration-200 border rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="p-4 mx-auto max-w-7xl sm:p-6">
          
          {/* Hero Section */}
          {active === "home" && (
            <section className="grid items-center gap-12 mt-8 lg:mt-12 lg:grid-cols-2">
              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2 lg:order-1"
              >
                <p className="text-sm font-semibold tracking-wider uppercase text-amber-500">
                  Full‑Stack Developer • Remote Available
                </p>
                <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Building Digital Experiences That{" "}
                  <span className="text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                    Scale & Convert
                  </span>
                </h1>
                <p className="max-w-2xl mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  I specialize in creating robust web applications using modern technologies. 
                  From eCommerce platforms to AI-powered dashboards, I deliver solutions 
                  that are performant, maintainable, and user-focused.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive("projects")}
                    className="inline-flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg"
                  >
                    <Briefcase className="w-5 h-5" />
                    View My Work
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActive("contact")}
                    className="inline-flex items-center gap-3 px-6 py-3 font-semibold transition-all duration-200 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-white dark:hover:bg-slate-800"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Let's Talk
                  </motion.button>
                </div>

                {/* Stats */}
                <div className="grid max-w-md grid-cols-3 gap-6 mt-12">
                  {[
                    { label: "Years Experience", value: "3+" },
                    { label: "Projects Completed", value: "10+" },
                    { label: "Client Satisfaction", value: "100%" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="p-4 text-center bg-white border shadow-sm rounded-xl dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    >
                      <div className="text-2xl font-bold text-amber-500">{stat.value}</div>
                      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex justify-center order-1 lg:order-2 lg:justify-end"
              >
                <div className="relative">
                  <div className="w-full max-w-md overflow-hidden border-4 border-white shadow-2xl rounded-2xl dark:border-slate-800">
                    <img 
                      src="https://placehold.co/600x400/0ea5e9/ffffff?text=Portfolio+Showcase" 
                      alt="Kelvin Williams - Full Stack Developer" 
                      className="object-cover w-full h-auto"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute px-4 py-2 font-semibold text-white rounded-lg shadow-lg -top-4 -right-4 bg-amber-500"
                  >
                    Available for Hire
                  </motion.div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Projects Section */}
          {active === "projects" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 lg:mt-12"
            >
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold">Featured Projects</h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                  A selection of projects showcasing my expertise in full-stack development, 
                  UI/UX design, and problem-solving capabilities.
                </p>
              </div>

              {/* Projects grid */}
              <div className="grid gap-8 lg:grid-cols-2">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>

              {/* Featured case study */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 mt-16 text-white bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl"
              >
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  <div>
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full bg-amber-500">
                      Featured Case Study
                    </span>
                    <h3 className="mb-4 text-3xl font-bold">Somi Store eCommerce Platform</h3>
                    <p className="mb-6 leading-relaxed text-slate-300">
                      A complete eCommerce solution built from scratch, handling everything from 
                      product management to order processing and customer support.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold text-amber-300">Challenge</h4>
                        <p className="text-sm text-slate-300">
                          Create a scalable eCommerce platform with real-time inventory management, 
                          secure payments, and an intuitive admin interface.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="mb-2 font-semibold text-amber-300">Solution</h4>
                        <p className="text-sm text-slate-300">
                          Built with React frontend, Laravel backend, and MySQL database. 
                          Implemented real-time features, AI-powered recommendations, and 
                          comprehensive admin tools.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <button className="px-6 py-3 font-semibold transition-colors duration-200 rounded-lg bg-amber-500 hover:bg-amber-600">
                        View Case Study
                      </button>
                      <button className="px-6 py-3 font-semibold transition-colors duration-200 border rounded-lg border-slate-600 hover:bg-slate-800">
                        Live Demo
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img 
                      src="https://placehold.co/600x400/1e293b/ffffff?text=Somi+Store+Dashboard" 
                      alt="Somi Store Dashboard" 
                      className="shadow-2xl rounded-2xl"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.section>
          )}

          {/* About Section */}
          {active === "about" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 mt-8 lg:mt-12 lg:grid-cols-3"
            >
              {/* Main content */}
              <div className="space-y-8 lg:col-span-2">
                <div className="p-8 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <h2 className="mb-6 text-4xl font-bold">About Me</h2>
                  <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    I'm a passionate full-stack developer with over 3 years of experience 
                    creating digital solutions that solve real-world problems. My expertise 
                    spans the entire development lifecycle, from concept to deployment.
                  </p>
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    I specialize in building scalable applications using modern technologies 
                    like React, Laravel, and Node.js. My focus is on writing clean, 
                    maintainable code and creating intuitive user experiences.
                  </p>
                </div>

                {/* Skills grid */}
                <div className="p-8 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <h3 className="mb-6 text-2xl font-bold text-amber-500">Technical Skills</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      "React & Next.js", "TypeScript", "Laravel & PHP", "Node.js",
                      "MySQL & MongoDB", "Tailwind CSS", "REST APIs", "WebSockets",
                      "Git & GitHub", "Docker", "AWS & Vercel", "Framer Motion"
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 font-medium text-center transition-all duration-200 border rounded-lg bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:shadow-md"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Experience timeline */}
                <div className="p-8 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <h3 className="mb-6 text-2xl font-bold text-amber-500">Experience</h3>
                  <div className="space-y-6">
                    {[
                      {
                        period: "2022 - Present",
                        role: "Full Stack Developer",
                        company: "Somi Store",
                        description: "Led development of complete eCommerce platform with admin dashboard and AI features."
                      },
                      {
                        period: "2021 - 2022",
                        role: "Frontend Developer",
                        company: "SamsanHub",
                        description: "Built AI insight platform with real-time data visualization and responsive UI."
                      },
                      {
                        period: "2020 - 2021",
                        role: "Web Developer",
                        company: "Freelance",
                        description: "Developed various web applications and websites for clients across different industries."
                      }
                    ].map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex gap-4 p-4 transition-colors duration-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-amber-500"></div>
                        <div>
                          <div className="text-sm font-semibold text-amber-500">{exp.period}</div>
                          <h4 className="text-lg font-bold">{exp.role} • {exp.company}</h4>
                          <p className="mt-1 text-slate-600 dark:text-slate-400">{exp.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact card */}
                <div className="p-6 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <h4 className="mb-4 text-xl font-bold">Let's Connect</h4>
                  <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                    I'm always open to discussing new opportunities and interesting projects.
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: "Email", href: "mailto:hello@kelvinwilliams.com", text: "hello@kelvinwilliams.com" },
                      { icon: Github, label: "GitHub", href: "#", text: "github.com/kelvinw" },
                      { icon: Globe, label: "Portfolio", href: "#", text: "kelvinwilliams.dev" },
                      { icon: Download, label: "Resume", href: "#", text: "Download PDF" }
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 p-3 transition-colors duration-200 border rounded-lg border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 group"
                      >
                        <item.icon className="w-5 h-5 transition-transform duration-200 text-amber-500 group-hover:scale-110" />
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{item.text}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Services card */}
                <div className="p-6 text-white bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl">
                  <h4 className="mb-4 text-xl font-bold">Services</h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Full-Stack Web Development",
                      "eCommerce Solutions",
                      "API Development & Integration",
                      "UI/UX Design & Implementation",
                      "Performance Optimization",
                      "Technical Consulting"
                    ].map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

          {/* Contact Section */}
          {active === "contact" && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 mt-8 lg:mt-12 lg:grid-cols-2"
            >
              {/* Contact form */}
              <div className="p-8 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                <h2 className="mb-2 text-4xl font-bold">Get In Touch</h2>
                <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
                  Ready to start your project? Let's discuss how we can work together.
                </p>

                <form className="space-y-6">
                  {[
                    { label: "Full Name", type: "text", required: true },
                    { label: "Email Address", type: "email", required: true },
                    { label: "Subject", type: "text", required: true },
                  ].map((field, index) => (
                    <div key={index}>
                      <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {field.label} {field.required && <span className="text-amber-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        className="w-full px-4 py-3 transition-all duration-200 bg-transparent border rounded-lg outline-none border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      Project Details <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-4 py-3 transition-all duration-200 bg-transparent border rounded-lg outline-none resize-none border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Tell me about your project, timeline, and budget..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>

              {/* Contact info and testimonials */}
              <div className="space-y-8">
                {/* Contact information */}
                <div className="p-8 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Mail,
                        title: "Email",
                        content: "hello@kelvinwilliams.com",
                        description: "I'll respond within 24 hours"
                      },
                      {
                        icon: Globe,
                        title: "Location",
                        content: "Remote Worldwide",
                        description: "Available for global projects"
                      },
                      {
                        icon: Briefcase,
                        title: "Availability",
                        content: "Open for Projects",
                        description: "Starting new projects in January 2024"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 transition-colors duration-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <div className="p-3 rounded-lg bg-amber-500/10">
                          <item.icon className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                          <p className="mt-1 font-medium text-slate-900 dark:text-white">{item.content}</p>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="p-8 bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
                  <h3 className="mb-6 text-2xl font-bold">Client Testimonials</h3>
                  <div className="space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="p-6 border rounded-xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600"
                      >
                        <div className="mb-4 text-4xl text-amber-500">"</div>
                        <p className="mb-4 italic leading-relaxed text-slate-700 dark:text-slate-300">
                          {testimonial.quote}
                        </p>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Resume Download Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 mb-12"
          >
            <div className="p-8 text-center text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl">
              <h3 className="mb-4 text-3xl font-bold">Ready to Work Together?</h3>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-amber-100">
                Download my resume to learn more about my experience, or get in touch 
                to discuss how I can help with your next project.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold transition-all duration-200 bg-white text-amber-500 rounded-xl hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Resume (PDF)
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActive("contact")}
                  className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-200 border border-white rounded-xl hover:bg-white hover:text-amber-500"
                >
                  <MessageSquare className="w-5 h-5" />
                  Start Conversation
                </motion.button>
              </div>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-white border-t border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <div className="p-4 mx-auto max-w-7xl sm:p-6">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <div className="mb-2 text-lg font-bold text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                  Kelvin Williams
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  © {new Date().getFullYear()} — Full‑Stack Developer & Digital Craftsman
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Mail, href: "mailto:hello@kelvinwilliams.com", label: "Email" },
                  { icon: Globe, href: "#", label: "Website" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="transition-colors duration-200 text-slate-400 hover:text-amber-500"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>

              {/* Back to top */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Back to Top
              </motion.button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
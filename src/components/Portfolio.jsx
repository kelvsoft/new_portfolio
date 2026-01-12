import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Globe,
  Download,
  Briefcase,
  User,
  Brain,
  Smartphone,
  X,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

// --- External Components ---
// ThemeToggle Component (Manages theme via localStorage and document.documentElement)
const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    // Initialize state from localStorage or default to false (light)
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 transition-colors rounded-full bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

// ProjectCard component (Only requires data via props)
const ProjectCard = ({
  title,
  subtitle,
  bullets = [],
  img,
  tags = [],
  actions = [],
}) => (
  <motion.article
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="flex flex-col p-6 bg-white border shadow dark:bg-slate-800 dark:border-slate-700 rounded-2xl"
  >
    <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 border dark:border-slate-700">
      <img
        src={img} // ...and being called HERE
        alt={title}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      <div className="flex-1 w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
          {subtitle}
        </p>
        <ul className="mt-3 ml-5 space-y-1 text-sm list-disc text-slate-600 dark:text-slate-300">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((t, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-3 mt-4">
      {actions.map((a, i) => (
        <a
          key={i}
          href={a.href}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-2 text-sm transition bg-transparent border rounded-md dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          {a.label}
        </a>
      ))}
    </div>
  </motion.article>
);

// MobileMenu component (Requires state and handlers via props)
const MobileMenu = ({ active, closeMenu, navItems, setActive }) => (
  <motion.div
    initial={{ opacity: 0, x: "100%" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "100%" }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900 md:hidden"
  >
    <div className="flex items-center justify-between pb-6 border-b dark:border-slate-700">
      <div className="text-xl font-bold">Navigation</div>
      <button
        onClick={closeMenu}
        className="p-2 transition rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    <nav className="flex flex-col gap-2 mt-6">
      {navItems.map((item) => (
        <button
          key={item.section}
          onClick={() => {
            setActive(item.section);
            closeMenu();
          }}
          className={`flex items-center gap-3 p-3 rounded-xl text-lg font-medium text-left transition ${
            active === item.section
              ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </button>
      ))}
    </nav>

    <div className="pt-6 mt-8 border-t dark:border-slate-700">
      <h3 className="mb-3 font-semibold">Settings & Actions</h3>
      <div className="flex flex-col gap-3">
        {/* Integrated ThemeToggle here */}
        <div className="flex items-center justify-between p-3 transition border rounded-xl dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="text-lg font-medium">Toggle Theme</span>
          <ThemeToggle />
        </div>

        <a
          href="#contact"
          onClick={closeMenu}
          className="flex items-center justify-center gap-3 p-3 text-lg font-medium text-white transition rounded-xl bg-amber-500 hover:bg-amber-600"
        >
          Hire me
        </a>
      </div>
    </div>
  </motion.div>
);

// A polished, single-file React portfolio component. Built with Tailwind classes and Framer Motion.
export default function Portfolio() {
  // --- State and Handlers (Must be inside the component) ---
  const [active, setActive] = useState("home"); // home, projects, about, contact, menu

  const closeMenu = () =>
    setActive((prev) => (prev === "menu" ? "home" : prev));

  //modal pop up
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error
    message: "",
  });

  //contact form set up
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  //handle input change
  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //emailjs send message
  const sendMessage = async () => {
    const formElement = document.getElementById("contactForm");

    if (!form.name || !form.email || !form.subject || !form.message) {
      setModal({
        open: true,
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    try {
      await emailjs.sendForm(
        "service_00ob5gy",
        "template_43a2v48",
        formElement,
        "upIOKRCIyKLUApGIc"
      );

      setModal({
        open: true,
        type: "success",
        message: "Your message and file have been sent!",
      });

      // Clear state
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear file input
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.log(error);

      setModal({
        open: true,
        type: "error",
        message: "Failed to send message. Try again.",
      });
    }
  };

  // --- Data Definitions ---
  const navItems = [
    { label: "Home", section: "home", icon: User },
    { label: "Work", section: "projects", icon: Briefcase },
    { label: "About", section: "about", icon: Brain },
    { label: "Contact", section: "contact", icon: Smartphone },
  ];

  const projects = [
    {
      title: "SomiStore — Full E-Commerce Ecosystem",
      subtitle:
        "Enterprise-grade retail platform with AI-driven analytics and real-time support",
      bullets: [
        "Engineered a comprehensive inventory engine supporting dynamic categories, subcategories, and automated cloud-based media management.",
        "Developed a robust Admin Dashboard with real-time state synchronization, enabling seamless order fulfillment and merchant oversight.",
        "Integrated a persistent live-chat support system with administrative routing and automated email failovers.",
        "Implemented proprietary AI Insights for predictive merchant analytics and personalized customer experiences.",
      ],
      tags: ["E-Commerce", "Full-Stack", "Inertia.js", "AI Analytics"],
      img: "/somistore.png",
      actions: [{ label: "Live Site", href: "https://somistore.com.ng/" }],
    },
    {
      title: "SamsanHub — AI-Driven E-Commerce",
      subtitle: "Modernizing retail architecture with Laravel 12 and React",
      bullets: [
        "Migrating legacy PHP architecture to a high-performance Laravel 12 & React (Inertia.js) stack.",
        "Developing an AI-powered Admin Dashboard to automate inventory categorization and merchant reporting.",
        "Architecting secure RESTful APIs for real-time data orchestration and future AI content generation.",
        "Refactoring UI components with Tailwind CSS for a seamless, mobile-first shopping experience.",
      ],
      tags: ["Laravel 12", "React", "AI Integration", "Digital Transformation"],
      img: "/samsanhub.png",
      actions: [{ label: "Visit Site", href: "https://samsanhub.com/" }],
    },
    {
      title: "EchoStream: Enterprise Messaging Engine",
      subtitle:
        "Real-time communication suite built with Laravel 12, React, and Reverb WebSockets",
      bullets: [
        "Implemented a high-concurrency sidebar interface with real-time channel filtering and unread count badges.",
        "Architected message persistence using Eloquent with custom broadcast events for instantaneous UI updates.",
        "Integrated a global dark mode system with zero-flicker initialization using browser local storage and system preference sync.",
        "Engineered secure administrative protocols to manage messaging access across various user account states.",
      ],
      tags: ["Laravel 12", "React", "WebSockets", "Tailwind CSS"],
      img: "/echostream.png",
      actions: [
        {
          label: "View Source",
          href: "https://github.com/kelvsoft/EchoStream-Engine",
        },
      ],
    },
    {
      title: "Crypto Limit Order Matching Engine",
      subtitle:
        "High-concurrency trading engine with real-time liquidity updates",
      bullets: [
        "Engineered a high-performance matching engine using Laravel 12 and MySQL atomic transactions to ensure 100% data integrity during trade execution.",
        "Architected real-time order book synchronization using WebSockets (Pusher) and Laravel Echo, providing a zero-latency trading experience.",
        "Developed concurrency-safe balance management logic using row-level locking (lockForUpdate) to prevent race conditions in multi-user environments.",
      ],
      tags: ["Financial Engineering", "WebSockets", "Laravel 12", "Vue 3"],
      img: "/crypto.png",
      actions: [
        {
          label: "View Source",
          href: "https://github.com/kelvsoft/limit-order-exchange",
        },
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        "Kelvin built a complex eCommerce platform with an admin dashboard and support chat — fast, clean code and great communication.",
      author: "Client — Somi Store (internal)",
    },
    {
      quote:
        "Delivered AI insight features that improved decision-making for merchants.",
      author: "Partner — SamsanHub (internal)",
    },
  ];

  return (
    <div>
      {/* The ThemeToggle now controls the 'dark' class on the HTML tag, making the theme global */}
      <div className="min-h-screen transition-colors bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {/* Mobile Menu Overlay */}
        {active === "menu" && (
          <MobileMenu
            active={active}
            closeMenu={closeMenu}
            navItems={navItems}
            setActive={setActive}
          />
        )}

        {/* Header - Fixed to top for better UX */}
        <header className="sticky top-0 z-40 flex items-center justify-between max-w-6xl p-4 mx-auto border-b sm:p-6 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-lg bg-gradient-to-br from-rose-400 to-amber-400 sm:w-12 sm:h-12">
              KW
            </div>
            <div>
              <div className="text-sm font-semibold">Kelvin Williams</div>
              <div className="hidden text-xs text-slate-500 dark:text-slate-300 sm:block">
                Full‑Stack Developer • React / Laravel • AI & eCommerce
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-300 sm:hidden">
                Full‑Stack Developer
              </div>{" "}
              {/* Compact title for tiny screens */}
            </div>
          </div>

          <nav className="items-center hidden gap-4 md:flex">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => setActive(item.section)}
                className={`text-sm transition-colors ${
                  active === item.section
                    ? "font-bold text-amber-500"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Desktop Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="items-center hidden gap-2 px-3 py-2 text-sm transition border rounded-md md:inline-flex hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Hire me
            </a>
            <div className="md:hidden">
              <button
                onClick={() => setActive("menu")}
                className="p-2 transition border rounded-md dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl p-4 mx-auto sm:p-6">
          {/* HERO - Image order reversed on mobile (content first, image second) */}
          {active === "home" && (
            <section className="grid items-center gap-8 mt-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-last md:order-first"
              >
                {" "}
                {/* Content: Last on mobile, First on desktop */}
                <p className="text-sm font-semibold text-amber-500">
                  Full‑Stack • Remote • Freelance
                </p>
                <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Building Digital Experiences That{" "}
                  <span className="text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                    Scale & Convert
                  </span>
                </h1>
                <p className="max-w-2xl mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Crafting intelligent web solutions that blend cutting edge
                  technology with exceptional user experiences. Specializing in
                  AI integration and scalable architectures.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    onClick={() => setActive("projects")}
                    className="inline-flex items-center gap-2 px-4 py-2 text-white transition rounded-md shadow-lg cursor-pointer bg-amber-500 hover:bg-amber-600 shadow-amber-500/30"
                  >
                    See Work
                  </a>
                  <a
                    onClick={() => setActive("contact")}
                    className="inline-flex items-center gap-2 px-4 py-2 transition border rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Contact
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 transition border rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                </div>
                <div className="grid max-w-md grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-white border rounded-lg dark:bg-slate-800">
                    <div className="text-sm text-slate-500">
                      Years experience
                    </div>
                    <div className="text-2xl font-bold">3+</div>
                  </div>
                  <div className="p-4 bg-white border rounded-lg dark:bg-slate-800">
                    <div className="text-sm text-slate-500">Projects</div>
                    <div className="text-2xl font-bold">10+</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center order-first mb-8 md:order-last md:mb-0"
              >
                {" "}
                {/* Image: First on mobile, Last on desktop */}
                <div className="w-full max-w-sm overflow-hidden border shadow-lg rounded-2xl dark:border-slate-700">
                  <img
                    src="/king.png"
                    alt="work preview"
                    className="object-cover w-full h-auto"
                  />
                </div>
              </motion.div>
            </section>
          )}

          {/* PROJECTS */}
          {active === "projects" && (
            <section id="projects" className="mt-8">
              <h2 className="mb-6 text-3xl font-bold">Featured Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((p, i) => (
                  <ProjectCard key={i} {...p} />
                ))}
              </div>

              <div className="mt-12">
                <h3 className="mb-4 text-2xl font-semibold">
                  Selected Case Study — Somi Store
                </h3>
                <article className="p-6 bg-white border dark:bg-slate-800 dark:border-slate-700 rounded-2xl">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-lg font-semibold text-amber-500">
                        Problem
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Client needed a scalable eCommerce platform with a
                        merchant admin dashboard, chat support, and AI insights
                        to help product sales, recommendations and business
                        reporting.
                      </p>

                      <h4 className="mt-4 text-lg font-semibold text-amber-500">
                        My role
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Sole developer — architected frontend and backend, built
                        APIs, designed DB, and implemented AI integrations.
                      </p>

                      <h4 className="mt-4 text-lg font-semibold text-amber-500">
                        Key technical highlights
                      </h4>
                      <ul className="mt-2 ml-5 space-y-1 text-sm list-disc text-slate-600 dark:text-slate-300">
                        <li>
                          React + Inertia.js frontend with reusable components
                        </li>
                        <li>
                          Laravel REST APIs, Eloquent models, and migrations
                        </li>
                        <li>
                          Product upload options (image URL + file upload) with
                          FormData and Axios
                        </li>
                        <li>Protected routes and role-based access</li>
                        <li>
                          Admin message sidebar that receives customer messages
                          and sends replies
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="w-full h-48 mb-3 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                        <img
                          src="/somistore.png"
                          alt="somi"
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href="https://somistore.com.ng/"
                          className="px-3 py-2 text-sm transition border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Live site
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {/* ABOUT */}
          {active === "about" && (
            <section className="grid gap-6 mt-8 md:grid-cols-3">
              <div className="p-6 bg-white border md:col-span-2 dark:bg-slate-800 rounded-2xl">
                <h2 className="text-3xl font-bold">About Me</h2>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  I’m Kelvin — a Full‑Stack developer focused on building
                  maintainable web products that ship quickly and scale. My
                  preferred stack is React for UI, Laravel for backend, and
                  MySQL for data storage. I enjoy implementing AI features and
                  building admin tools that make operations safe and repeatable.
                </p>

                <h3 className="mt-6 text-lg font-bold text-amber-500">
                  Skills & Tools
                </h3>
                <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-3">
                  {[
                    "React",
                    "Inertia.js",
                    "PHP / Laravel 12", 
                    "Node.js",
                    "Vue.js",
                    "Reverb (WebSockets)",
                    "AI Integration",
                    "JavaScript / TypeScript",
                    "MySQL (Eloquent/Raw)", 
                    "Tailwind CSS",
                    "Framer Motion",
                    "Axios / FormData",
                    "Authentication (Breeze/Sanctum)", 
                    "Git / GitHub",
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-slate-700/50"
                    >
                      {s}
                    </div>
                  ))}
                </div>

                <h3 className="mt-6 text-lg font-bold text-amber-500">
                  Experience Highlights
                </h3>
                <ul className="mt-2 ml-5 space-y-2 text-base list-disc text-slate-600 dark:text-slate-300">
                  <li>
                    <strong>Somi Store:</strong> Engineered a full-scale
                    E-commerce ecosystem featuring a real-time merchant
                    dashboard, AI-driven product analytics, and automated cloud
                    media management.
                  </li>
                  <li>
                    <strong>EchoStream Engine:</strong> Architected a
                    high-concurrency messaging suite
                  </li>
                  <li>
                    <strong>Financial Engineering:</strong> Developed a
                    high-performance{" "}
                    <strong>Limit Order Matching Engine</strong>
                  </li>
                </ul>
              </div>

              <aside className="p-6 bg-white border dark:bg-slate-800 rounded-2xl">
                <h4 className="text-lg font-bold">Connect</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Available for remote roles and freelance. Prefer
                  Node/React/Laravel full‑stack work.
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <a
                    href="mailto:kelvin.5williams5@gmail.com"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm transition border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </a>
                  <a
                    href="https://github.com/kelvsoft"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm transition border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm transition border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Download className="w-4 h-4" /> Resume
                  </a>
                </div>
              </aside>
            </section>
          )}

          {/* CONTACT */}
          {active === "contact" && (
            <section id="contact" className="grid gap-6 mt-8 md:grid-cols-2">
              <div className="p-6 bg-white border dark:bg-slate-800 rounded-2xl">
                <h2 className="text-3xl font-bold">Get in touch</h2>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                  Tell me about your project — timeline, budget, and what you
                  need built.
                </p>

                {/* CONTACT FORM */}
                <form
                  id="contactForm"
                  className="grid gap-3 mt-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={updateForm}
                    className="p-3 bg-transparent border rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-amber-500"
                  />

                  <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={updateForm}
                    className="p-3 bg-transparent border rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-amber-500"
                  />

                  <input
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={updateForm}
                    className="p-3 bg-transparent border rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-amber-500"
                  />

                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={form.message}
                    onChange={updateForm}
                    className="p-3 bg-transparent border rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-amber-500"
                  />

                  {/* THIS IS THE ACTUAL FILE INPUT (HIDDEN) */}
                  <input
                    type="file"
                    name="attachment"
                    id="fileInput"
                    className="hidden"
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={sendMessage}
                      className="px-5 py-3 font-semibold text-white transition rounded-lg bg-amber-500 hover:bg-amber-600"
                    >
                      Send message
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      className="px-5 py-3 transition border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Attach file
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-6 bg-white border dark:bg-slate-800 rounded-2xl">
                <h3 className="text-xl font-bold">Quick links & Feedback</h3>
                <ul className="mt-3 space-y-2 text-base text-slate-600 dark:text-slate-300">
                  <li>
                    <a
                      onClick={() => setActive("projects")}
                      className="underline cursor-pointer"
                    >
                      Featured projects
                    </a>
                  </li>
                  <li>
                    <a href="/resume.pdf" download className="underline">
                      Download resume
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setActive("contact")}
                      className="underline"
                    >
                      Hire me — rates & availability
                    </a>
                  </li>
                </ul>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-amber-500">
                    Testimonials
                  </h4>
                  <div className="mt-3 space-y-3">
                    {testimonials.map((t, i) => (
                      <div
                        key={i}
                        className="p-4 text-sm border rounded-lg bg-slate-50 dark:bg-slate-700/50"
                      >
                        <div className="italic text-slate-700 dark:text-slate-200">
                          “{t.quote}”
                        </div>
                        <div className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          — {t.author}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* simple footer / resume */}
          <section id="resume" className="mt-12 mb-24">
            <div className="p-6 bg-white border dark:bg-slate-800 rounded-2xl">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h4 className="text-lg font-semibold">
                    Download Resume (PDF)
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    PDF with projects, experience, and contact details —
                    optimized for recruiters.
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 transition border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <a
                    onClick={() => setActive("contact")}
                    className="inline-flex items-center gap-2 px-4 py-2 transition border rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Briefcase className="w-4 h-4" />
                    Hire me
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-6 border-t dark:border-slate-700">
          <div className="flex flex-col items-center justify-between max-w-6xl gap-4 p-4 mx-auto sm:p-6 sm:flex-row">
            <div className="text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Kelvin Williams — Remote Full‑Stack
              Developer
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/kelvsoft"
                aria-label="https://github.com/kelvsoft"
                className="transition text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <Github />
              </a>
              <a
                href="mailto:kelvin.5williams5@gmail.com"
                aria-label="Email"
                className="transition text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <Mail />
              </a>
              <a
                href="#"
                aria-label="Website"
                className="transition text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <Globe />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* GLOBAL MODAL */}
      {modal.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="w-[90%] max-w-sm p-6 text-center bg-white dark:bg-slate-800 rounded-xl shadow-xl"
          >
            {/* Success or Error Icon */}
            <div className="flex justify-center mb-3">
              {modal.type === "success" ? (
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  ✓
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  ⚠
                </div>
              )}
            </div>

            <h3
              className={`text-lg font-semibold ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success" : "Error"}
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {modal.message}
            </p>

            <button
              onClick={() =>
                setModal({ open: false, type: "success", message: "" })
              }
              className="w-full px-4 py-2 mt-4 font-medium text-white transition rounded-lg bg-amber-500 hover:bg-amber-600"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

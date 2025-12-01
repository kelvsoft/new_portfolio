import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Globe, Download, Briefcase, User, MessageSquare, Brain, Smartphone, X, Menu } from "lucide-react";

// A polished, single-file React portfolio component. Built with Tailwind classes and Framer Motion.
// Replace placeholder links, images, and text with your real content (GitHub, resume link, live demos).

export default function PortfolioTest() {
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState("home"); // home, projects, about, contact, menu

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const closeMenu = () => setActive(active === "menu" ? "home" : active);

  const navItems = [
    { label: "Home", section: "home", icon: User },
    { label: "Work", section: "projects", icon: Briefcase },
    { label: "About", section: "about", icon: Brain },
    { label: "Contact", section: "contact", icon: Smartphone },
  ];

  const ProjectCard = ({ title, subtitle, bullets = [], img, tags = [], actions = [] }) => (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow p-6 flex flex-col"
    >
      <div className="flex items-start gap-4 flex-col sm:flex-row"> {/* Stacks elements vertically on small screens */}
        <div className="w-full sm:w-16 h-auto sm:h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center aspect-video sm:aspect-auto">
          {/* Using placeholder images for demo */}
          {img ? <img src={img} alt={title} className="object-cover w-full h-full"/> : <div className="text-sm text-slate-500 p-4">No image</div>}
        </div>
        <div className="flex-1 w-full"> 
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">{subtitle}</p>
          <ul className="mt-3 list-disc ml-5 text-sm space-y-1 text-slate-600 dark:text-slate-300">
            {bullets.map((b,i)=> <li key={i}>{b}</li>)}
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((t,i) => <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3 flex-wrap"> {/* Ensures action buttons wrap on small screens */}
        {actions.map((a,i)=> (
          <a key={i} href={a.href} target="_blank" rel="noreferrer" className="text-sm px-3 py-2 rounded-md border dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            {a.label}
          </a>
        ))}
      </div>
    </motion.article>
  );

  // --- Sample content pulled from your project history ---
  const projects = [
    {
      title: "Somi Store — Full eCommerce Platform",
      subtitle: "React + Laravel | Admin Dashboard | Payments | Chat Support | AI Insights",
      bullets: [
        "Product management (image URL + file upload), categories & subcategories",
        "Admin dashboard with refresh trigger and order management",
        "Custom support chat with admin sidebar and message persistence",
        "AI Insight menu for merchants & customers",
      ],
      tags: ["React", "Laravel", "MySQL", "AI"],
      img: "https://placehold.co/1200x800/22c55e/ffffff?text=E-Commerce+Demo",
      actions: [
        { label: "Live Demo", href: "#" },
        { label: "Code (partial)", href: "#" },
      ],
    },
    {
      title: "SamsanHub — AI Insight Platform",
      subtitle: "AI-driven insights, content generation, and API integrations",
      bullets: [
        "Built reusable AI insight components and server-side integrations",
        "Role-based access control and secure Laravel APIs",
        "Polished responsive UI using React and Tailwind",
      ],
      tags: ["AI", "React", "APIs"],
      img: "https://placehold.co/1200x800/eab308/ffffff?text=AI+Insights+Demo",
      actions: [
        { label: "Case Study", href: "#" },
      ],
    },
    {
      title: "Chat & Messaging System",
      subtitle: "Real-time chat integrated into admin dashboard",
      bullets: [
        "Sidebar message interface for admin to respond to customers",
        "Messages persist in DB and email fallback option",
        "Access to contact page retained for deactivated users",
      ],
      tags: ["Socket/Realtime", "UX"],
      img: "https://placehold.co/1200x800/0ea5e9/ffffff?text=Chat+System+Demo",
      actions: [{ label: "Read More", href: "#" }],
    },
  ];

  const testimonials = [
    {
      quote: "Kelvin built a complex eCommerce platform with an admin dashboard and support chat — fast, clean code and great communication.",
      author: "Client — Somi Store (internal)",
    },
    {
      quote: "Delivered AI insight features that improved decision-making for merchants.",
      author: "Partner — SamsanHub (internal)",
    },
  ];

  // Mobile Navigation Component
  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-900 md:hidden p-6 overflow-y-auto"
    >
      <div className="flex justify-between items-center pb-6 border-b dark:border-slate-700">
        <div className="text-xl font-bold">Navigation</div>
        <button onClick={closeMenu} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition">
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

      <div className="mt-8 pt-6 border-t dark:border-slate-700">
        <h3 className="font-semibold mb-3">Settings & Actions</h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className="flex items-center justify-center gap-3 p-3 rounded-xl text-lg font-medium text-left border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </button>
          <a
            href="#contact"
            onClick={closeMenu}
            className="flex items-center justify-center gap-3 p-3 rounded-xl text-lg font-medium bg-amber-500 text-white hover:bg-amber-600 transition"
          >
            Hire me
          </a>
        </div>
      </div>
    </motion.div>
  );


  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Mobile Menu Overlay */}
        {active === "menu" && <MobileMenu />}

        {/* Header - Fixed to top for better UX */}
        <header className="max-w-6xl mx-auto p-4 sm:p-6 flex items-center justify-between sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm z-40 border-b dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gradient-to-br from-rose-400 to-amber-400 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-lg">KW</div>
            <div>
              <div className="text-sm font-semibold">Kelvin Williams</div>
              <div className="text-xs text-slate-500 dark:text-slate-300 hidden sm:block">Full‑Stack Developer • React / Laravel • AI & eCommerce</div>
              <div className="text-xs text-slate-500 dark:text-slate-300 sm:hidden">Full‑Stack Developer</div> {/* Compact title for tiny screens */}
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => setActive(item.section)}
                className={`text-sm transition-colors ${
                  active === item.section ? "font-bold text-amber-500" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={toggleTheme} aria-label="Toggle theme" className="ml-4 text-sm px-3 py-1 rounded-full border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">Hire me</a>
            <div className="md:hidden">
              <button onClick={() => setActive("menu")} className="p-2 rounded-md border dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 sm:p-6">
          
          {/* HERO - Image order reversed on mobile (content first, image second) */}
          {active === "home" && (
            <section className="mt-8 grid md:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="order-last md:order-first"> {/* Content: Last on mobile, First on desktop */}
                <p className="text-sm text-amber-500 font-semibold">Full‑Stack • Remote • Freelance</p>
                <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">I build scalable web products — eCommerce, dashboards, and AI integrations.</h1>
                <p className="mt-4 text-base text-slate-600 dark:text-slate-300 max-w-xl">I design and ship end‑to‑end systems using React, Laravel, and MySQL. I’ve built Somi Store (complete eCommerce) and SamsanHub (AI insights). I focus on clean architecture, maintainable code, and products that grow.</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a onClick={() => setActive("projects")} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition shadow-lg shadow-amber-500/30">See Work</a>
                  <a onClick={() => setActive("contact")} className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">Contact</a>
                  <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"><Download className="w-4 h-4"/>Resume</a>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                  <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border"> 
                    <div className="text-sm text-slate-500">Years experience</div>
                    <div className="text-2xl font-bold">3+</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border"> 
                    <div className="text-sm text-slate-500">Projects</div>
                    <div className="text-2xl font-bold">10+</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center order-first md:order-last mb-8 md:mb-0"> {/* Image: First on mobile, Last on desktop */}
                <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border dark:border-slate-700">
                  <img src="https://placehold.co/1200x800/f97316/ffffff?text=Portfolio+Image" alt="work preview" className="w-full h-auto object-cover" />
                </div>
              </motion.div>
            </section>
          )}

          {/* PROJECTS */}
          {active === "projects" && (
            <section id="projects" className="mt-8">
              <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((p,i) => <ProjectCard key={i} {...p} />)}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-4">Selected Case Study — Somi Store</h3>
                <article className="bg-white dark:bg-slate-800 border dark:border-slate-700 p-6 rounded-2xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg text-amber-500">Problem</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Client needed a scalable eCommerce platform with a merchant admin dashboard, chat support, and AI insights to help product recommendations and business reporting.</p>

                      <h4 className="font-semibold mt-4 text-lg text-amber-500">My role</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Sole developer — architected frontend and backend, built APIs, designed DB, and implemented AI integrations.</p>

                      <h4 className="font-semibold mt-4 text-lg text-amber-500">Key technical highlights</h4>
                      <ul className="list-disc ml-5 text-sm mt-2 text-slate-600 dark:text-slate-300 space-y-1">
                        <li>React + Inertia.js frontend with reusable components</li>
                        <li>Laravel REST APIs, Eloquent models, and migrations</li>
                        <li>Product upload options (image URL + file upload) with FormData and Axios</li>
                        <li>Protected routes and role-based access</li>
                        <li>Admin message sidebar that receives customer messages and sends replies</li>
                      </ul>
                    </div>
                    <div>
                      <div className="w-full h-48 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden mb-3">
                        <img src="https://placehold.co/1200x800/ef4444/ffffff?text=Case+Study+Dashboard" alt="somi" className="w-full h-full object-cover" />
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <a href="#" className="text-sm px-3 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition">Live site</a>
                        <a href="#" className="text-sm px-3 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition">Read architecture</a>
                        <a href="#" className="text-sm px-3 py-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition">See code</a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {/* ABOUT */}
          {active === "about" && (
            <section className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white dark:bg-slate-800 border p-6 rounded-2xl">
                <h2 className="text-3xl font-bold">About Me</h2>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">I’m Kelvin — a Full‑Stack developer focused on building maintainable web products that ship quickly and scale. My preferred stack is React for UI, Laravel for backend, and MySQL for data storage. I enjoy implementing AI features and building admin tools that make operations safe and repeatable.</p>

                <h3 className="mt-6 font-bold text-lg text-amber-500">Skills & Tools</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {[
                    "React", "Inertia.js", "JavaScript/TypeScript", "PHP/Laravel",
                    "MySQL/phpMyAdmin", "Tailwind CSS", "Framer Motion", "Axios/FormData",
                    "Authentication", "Git"
                  ].map((s,i) => (
                    <div key={i} className="text-sm px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700/50">{s}</div>
                  ))}
                </div>

                <h3 className="mt-6 font-bold text-lg text-amber-500">Experience Highlights</h3>
                <ul className="list-disc ml-5 text-base mt-2 text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Built and maintained Somi Store — full eCommerce with admin dashboard and messaging.</li>
                  <li>Developed SamsanHub — AI insight platform with API integrations.</li>
                  <li>Delivered mobile debugging and builds using Expo / React Native.</li>
                </ul>
              </div>

              <aside className="bg-white dark:bg-slate-800 border p-6 rounded-2xl">
                <h4 className="text-lg font-bold">Connect</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Available for remote roles and freelance. Prefer Node/React/Laravel full‑stack work.</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href="mailto:kelvinwilliams@example.com" className="text-sm px-3 py-2 border rounded-md inline-flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Mail className="w-4 h-4"/> Email</a>
                  <a href="#" className="text-sm px-3 py-2 border rounded-md inline-flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Github className="w-4 h-4"/> GitHub</a>
                  <a href="#" className="text-sm px-3 py-2 border rounded-md inline-flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Download className="w-4 h-4"/> Resume</a>
                </div>
              </aside>
            </section>
          )}

          {/* CONTACT */}
          {active === "contact" && (
            <section id="contact" className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 border p-6 rounded-2xl">
                <h2 className="text-3xl font-bold">Get in touch</h2>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">Tell me about your project — timeline, budget, and what you need built.</p>

                <form className="mt-4 grid gap-3">
                  <input placeholder="Your name" className="p-3 rounded-lg border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-amber-500 outline-none" />
                  <input placeholder="Email" type="email" className="p-3 rounded-lg border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-amber-500 outline-none" />
                  <input placeholder="Subject" className="p-3 rounded-lg border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-amber-500 outline-none" />
                  <textarea placeholder="Message" rows={5} className="p-3 rounded-lg border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-amber-500 outline-none" />
                  <div className="flex gap-3 pt-2">
                    <button type="button" className="px-5 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">Send message</button>
                    <button type="button" className="px-5 py-3 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">Attach file</button>
                  </div>
                </form>
              </div>

              <div className="bg-white dark:bg-slate-800 border p-6 rounded-2xl">
                <h3 className="text-xl font-bold">Quick links & Feedback</h3>
                <ul className="mt-3 text-base text-slate-600 dark:text-slate-300 space-y-2">
                  <li><a onClick={() => setActive("projects")} className="underline cursor-pointer">Featured projects</a></li>
                  <li><a href="#" className="underline">Download resume</a></li>
                  <li><a href="#" className="underline">Hire me — rates & availability</a></li>
                </ul>

                <div className="mt-6">
                  <h4 className="font-semibold text-lg text-amber-500">Testimonials</h4>
                  <div className="mt-3 space-y-3">
                    {testimonials.map((t,i) => (
                      <div key={i} className="text-sm border rounded-lg p-4 bg-slate-50 dark:bg-slate-700/50">
                        <div className="italic text-slate-700 dark:text-slate-200">“{t.quote}”</div>
                        <div className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">— {t.author}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* simple footer / resume */}
          <section id="resume" className="mt-12 mb-24">
            <div className="bg-white dark:bg-slate-800 border p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-lg">Download Resume (PDF)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">PDF with projects, experience, and contact details — optimized for recruiters.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a href="#" className="px-4 py-2 border rounded-md inline-flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Download className="w-4 h-4"/>Download</a>
                  <a onClick={() => setActive("contact")} className="cursor-pointer px-4 py-2 border rounded-md inline-flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Briefcase className="w-4 h-4"/>Hire me</a>
                </div>
              </div>

            </div>
          </section>

        </main>

        <footer className="border-t dark:border-slate-700 py-6">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-center sm:text-left">© {new Date().getFullYear()} Kelvin Williams — Remote Full‑Stack Developer</div>
            <div className="flex gap-3">
              <a href="#" aria-label="GitHub" className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition"><Github/></a>
              <a href="mailto:kelvinwilliams@example.com" aria-label="Email" className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition"><Mail/></a>
              <a href="#" aria-label="Website" className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition"><Globe/></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    window.addEventListener('scroll', handleScroll);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Somi Store",
      description: "AI-Powered E-commerce Platform Revolutionizing Online Shopping",
      image: "/api/placeholder/600/400",
      features: [
        "AI Product Insights & Recommendations",
        "Real-time Chat System with AI Assistant",
        "Advanced Search & Filtering",
        "User Authentication & Authorization",
        "Payment Integration",
        "Inventory Management",
        "Order Tracking System",
        "Admin Dashboard"
      ],
      techStack: ["React", "Node.js", "MongoDB", "Express", "TensorFlow.js", "Socket.io", "Stripe API"],
      liveUrl: "#",
      githubUrl: "#",
      metrics: [
        { value: "40%", label: "Increase in Conversions" },
        { value: "2.5x", label: "Faster Response Time" },
        { value: "99.9%", label: "Uptime" }
      ]
    },
    {
      id: 2,
      title: "SamsanHub",
      description: "Collaborative Development Platform for Modern Teams",
      image: "/api/placeholder/600/400",
      features: [
        "Real-time Collaboration",
        "Code Sharing & Review",
        "Project Management",
        "Team Communication",
        "Version Control Integration",
        "Documentation Tools"
      ],
      techStack: ["React", "TypeScript", "PostgreSQL", "GraphQL", "Redis", "Docker", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      metrics: [
        { value: "50%", label: "Faster Development" },
        { value: "100+", label: "Active Users" },
        { value: "4.8/5", label: "User Rating" }
      ]
    }
  ];

  const skills = {
    frontend: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Redux", level: 85 },
      { name: "GraphQL", level: 82 }
    ],
    backend: [
      { name: "Node.js", level: 92 },
      { name: "Express", level: 90 },
      { name: "Python", level: 85 },
      { name: "Django", level: 80 },
      { name: "FastAPI", level: 78 },
      { name: "REST APIs", level: 95 }
    ],
    database: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 82 },
      { name: "Firebase", level: 80 },
      { name: "SQL", level: 87 }
    ],
    devops: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "CI/CD", level: 82 },
      { name: "Git", level: 95 },
      { name: "Linux", level: 83 },
      { name: "Nginx", level: 78 }
    ],
    ai_ml: [
      { name: "TensorFlow.js", level: 75 },
      { name: "OpenAI API", level: 85 },
      { name: "Machine Learning", level: 70 },
      { name: "NLP", level: 75 },
      { name: "Computer Vision", level: 65 }
    ]
  };

  const testimonials = [
    {
      name: "Client A",
      role: "CEO, Tech Startup",
      content: "The AI integration in our e-commerce platform increased sales by 40%. Exceptional work!",
      avatar: "/api/placeholder/100/100"
    },
    {
      name: "Client B",
      role: "Development Lead",
      content: "SamsanHub transformed how our team collaborates. The real-time features are incredible.",
      avatar: "/api/placeholder/100/100"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const SkillBar = ({ skill, level }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill}</span>
        <span className="text-sm opacity-75">{level}%</span>
      </div>
      <div className={`h-2 rounded-full ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div 
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Enhanced Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-lg border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              DevPortfolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(item.toLowerCase());
                  }}
                  className={`relative px-3 py-2 transition-all duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-blue-500 font-semibold' 
                      : 'hover:text-blue-400'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className={`w-6 h-0.5 transition-all duration-300 ${
                  isDarkMode ? 'bg-white' : 'bg-gray-900'
                } ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 my-1.5 transition-all duration-300 ${
                  isDarkMode ? 'bg-white' : 'bg-gray-900'
                } ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 transition-all duration-300 ${
                  isDarkMode ? 'bg-white' : 'bg-gray-900'
                } ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </button>

              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                Hire Me
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden mt-4 py-4 border-t ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
            }`}>
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 transition-colors duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 mb-6">
                🚀 Full-Stack Developer & AI Specialist
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Building The
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                  Future
                </span>
                With Code
              </h1>
              <p className={`text-xl lg:text-2xl mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Crafting intelligent web solutions that blend cutting-edge technology 
                with exceptional user experiences. Specializing in AI integration and scalable architectures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg flex items-center justify-center"
                >
                  View My Work
                  <span className="ml-2">→</span>
                </button>
                <button className={`border-2 px-8 py-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800' 
                    : 'border-gray-300 hover:border-gray-400 hover:bg-white'
                }`}>
                  📄 Download Resume
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">3+</div>
                  <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Client Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-on-scroll">
              <div className="relative">
                {/* Main Avatar/Image */}
                <div className={`w-96 h-96 mx-auto rounded-3xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-2xl flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-8xl">💻</div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    ⚡
                  </div>
                  <div className="absolute bottom-8 right-8 w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                    🤖
                  </div>
                  <div className="absolute top-8 right-12 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    🚀
                  </div>
                </div>
                
                {/* Background effects */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-30"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500 rounded-full blur-2xl opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Passionate full-stack developer with expertise in creating intelligent web applications. 
              I bridge the gap between complex AI technologies and user-friendly interfaces, delivering 
              solutions that drive real business value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-2xl text-center animate-on-scroll ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">Problem Solver</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Transforming complex challenges into elegant, scalable solutions
              </p>
            </div>
            
            <div className={`p-8 rounded-2xl text-center animate-on-scroll ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-4">Innovator</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Leveraging cutting-edge technologies to create future-proof applications
              </p>
            </div>
            
            <div className={`p-8 rounded-2xl text-center animate-on-scroll ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-4">Collaborator</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Excellent communication and teamwork for successful project delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showcasing my expertise in full-stack development and AI integration through real-world applications
            </p>
          </div>

          {projects.map((project, index) => (
            <div key={project.id} className={`mb-32 scroll-mt-20 ${
              index % 2 === 0 ? '' : 'lg:flex-row-reverse'
            } lg:flex items-stretch gap-12 animate-on-scroll`}>
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className={`rounded-3xl overflow-hidden shadow-2xl h-full ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } transform hover:scale-105 transition-transform duration-300`}>
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className={`text-lg mb-6 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{project.description}</p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                          <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-3">Key Features:</h4>
                      <ul className={`grid gap-3 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, idx) => (
                        <span 
                          key={idx}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            isDarkMode 
                              ? 'bg-gray-700 text-blue-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold flex-1">
                        Live Demo
                      </button>
                      <button className={`border-2 px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex-1 ${
                        isDarkMode 
                          ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800' 
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}>
                        Source Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold mb-8">Project Highlights</h3>
                
                {project.id === 1 && (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-2xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg border-l-4 border-blue-500`}>
                      <h4 className="font-semibold text-xl mb-3 flex items-center">
                        <span className="text-2xl mr-3">🤖</span>
                        AI Product Insights Engine
                      </h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Implemented advanced machine learning algorithms using TensorFlow.js for 
                        personalized product recommendations and real-time sales trend analysis. 
                        The system processes user behavior to deliver intelligent insights.
                      </p>
                    </div>
                    
                    <div className={`p-6 rounded-2xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg border-l-4 border-green-500`}>
                      <h4 className="font-semibold text-xl mb-3 flex items-center">
                        <span className="text-2xl mr-3">💬</span>
                        Real-time AI Chat System
                      </h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Built a scalable chat infrastructure with Socket.io featuring AI-powered 
                        customer support, automated responses, and real-time notifications. 
                        Integrated sentiment analysis for improved customer experience.
                      </p>
                    </div>
                    
                    <div className={`p-6 rounded-2xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg border-l-4 border-purple-500`}>
                      <h4 className="font-semibold text-xl mb-3 flex items-center">
                        <span className="text-2xl mr-3">🛒</span>
                        Complete E-commerce Solution
                      </h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Developed a full-stack e-commerce platform with secure payment processing, 
                        advanced inventory management, and comprehensive admin dashboard. 
                        Features include order tracking and analytics.
                      </p>
                    </div>
                  </div>
                )}
                
                {project.id === 2 && (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-2xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg border-l-4 border-blue-500`}>
                      <h4 className="font-semibold text-xl mb-3 flex items-center">
                        <span className="text-2xl mr-3">👥</span>
                        Real-time Developer Collaboration
                      </h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Created an innovative platform enabling developers to collaborate seamlessly 
                        with real-time code sharing, live editing, and instant review features. 
                        Supports multiple programming languages and frameworks.
                      </p>
                    </div>
                    
                    <div className={`p-6 rounded-2xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg border-l-4 border-green-500`}>
                      <h4 className="font-semibold text-xl mb-3 flex items-center">
                        <span className="text-2xl mr-3">🚀</span>
                        Advanced Project Management
                      </h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Implemented comprehensive project tracking with agile methodologies, 
                        task management, and team communication tools. Features include 
                        automated progress reporting and integration with popular version control systems.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className={`py-20 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Technical Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Comprehensive skills across the full development stack with specialized focus on AI integration
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className={`p-8 rounded-3xl shadow-xl animate-on-scroll ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className="text-2xl font-bold mb-6 capitalize flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  {category.replace('_', ' & ')}
                </h3>
                <div className="space-y-4">
                  {skillList.map((skill, index) => (
                    <SkillBar key={index} skill={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Client Testimonials</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`p-8 rounded-3xl animate-on-scroll ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-xl`}>
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className={`text-lg italic ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  "{testimonial.content}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {"★".repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's Work Together</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Ready to bring your next project to life with cutting-edge technology and innovative solutions
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-on-scroll">
                <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                    }`}>
                      📧
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Email</p>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        your.email@domain.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                    }`}>
                      💼
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Freelance</p>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Available for new projects
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-purple-100'
                    }`}>
                      🌍
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Location</p>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Remote - Worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <h4 className="font-semibold text-lg mb-4">Why Work With Me?</h4>
                  <ul className={`space-y-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Clean, maintainable code with best practices
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      AI-powered solutions for competitive advantage
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Responsive communication and regular updates
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      On-time delivery with quality assurance
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`p-8 rounded-3xl shadow-2xl animate-on-scroll ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-3">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="your.email@domain.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Project Details</label>
                    <textarea 
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Tell me about your project, timeline, and budget..."
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`py-12 border-t ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
                DevPortfolio
              </div>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Building the future with code, one project at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                    className={`block text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className={`block transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                {['Web Development', 'AI Integration', 'E-commerce', 'Consulting'].map((service) => (
                  <span
                    key={service}
                    className={`block transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`pt-8 border-t text-center ${
            isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>
              © 2024 Your Name. All rights reserved. Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-on-scroll {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
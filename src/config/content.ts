export const homepageContent = {
  hero: {
    tagline: "Setúbal, Portugal · Est. 2024",
    headline: "The building <span class=\"text-primary\">thinks.</span><br />You focus.",
    description: "22Cowork is Europe's most intelligent coworking space — a living laboratory for AI, automation, and the future of work.",
    ctaPrimary: "Enter the Ecosystem",
    ctaSecondary: "See the Intelligence",
    dataChips: [
      { label: "AIR", value: "98%" },
      { label: "TEMP", value: "21°C" },
      { label: "OCC", value: "4/12" },
      { label: "NET", value: "1Gbps" },
    ],
  },
  philosophyStrip: {
    text: "Not just a desk. <span class=\"text-gray-500\">A living laboratory for productivity, AI, and modern work. Every sensor, every system, every surface is engineered to help you do the best work of your life.</span>",
  },
  stats: [
    { value: 47, suffix: "+", label: "smart sensors" },
    { value: 1, suffix: "Gbps", label: "fiber speed" },
    { value: 98, suffix: "%", label: "avg air quality" },
    { value: 24, suffix: "/7", label: "building uptime" },
  ],
  ecosystem: {
    title: "The Ecosystem",
    headline: "Infrastructure built for the next decade.",
    features: [
      {
        title: "AI-Native Infrastructure",
        description: "Every desk, room, and corridor is wired for AI. Run experiments, deploy models, and access GPU resources without leaving the building.",
        detail: "Home Assistant · 47 devices · All online",
      },
      {
        title: "Adaptive Climate",
        description: "CO₂ sensors and occupancy data drive real-time HVAC adjustments. The air is always optimal for deep work.",
      },
      {
        title: "1 Gbps Symmetric",
        description: "Enterprise-grade fiber with redundant failover. Latency under 2ms to Lisbon data centers.",
      },
      {
        title: "Smart Access",
        description: "Keyless entry via NFC or mobile app. 24/7 security monitoring — fully automated.",
      },
      {
        title: "Hospitality Layer",
        description: "Specialty coffee, ergonomic hardware, and a concierge that handles everything from printing to package reception.",
      },
    ],
  },
  cta: {
    headline: "Experience it firsthand.",
    description: "Book a visit and see how the building responds to your presence.",
    buttonText: "Book a Visit",
  },
};

export const intelligencePageContent = {
  hero: {
    tagline: "Intelligence",
    headline: "A building that thinks with you.",
    description: "Powered by Home Assistant and a network of 47 IoT sensors, 22Cowork continuously monitors and optimizes every aspect of the environment — so you never have to think about it.",
  },
  liveStatus: {
    title: "Live Building Status",
    description: "Simulated live readings from the 22Cowork sensor network. Values update every 2 seconds.",
    metrics: [
      { label: "Air Quality", value: 98, unit: "%" },
      { label: "Temperature", value: 21, unit: "°C" },
      { label: "Ambient Noise", value: 31, unit: "dB" },
      { label: "Power Draw", value: 4.2, unit: "kW" },
      { label: "Occupancy", value: 4, unit: "/12" },
      { label: "Network Load", value: 340, unit: "Mbps" },
    ],
  },
  howItWorks: {
    title: "How it works",
    headline: "Six systems. One seamless experience.",
    features: [
      {
        title: "Adaptive Air Quality",
        description: "A network of CO₂, VOC, and particulate sensors continuously monitors air quality across every zone. The HVAC system responds automatically — you'll never notice the air, which is exactly the point.",
        detail: "CO₂ < 600ppm · VOC < 0.1mg/m³ · PM2.5 < 5μg/m³",
      },
      {
        title: "Circadian Climate Control",
        description: "Temperature and lighting color temperature shift throughout the day to align with your circadian rhythm. Cooler and brighter in the morning for focus. Warmer and dimmer in the afternoon for creative thinking.",
        detail: "6500K morning → 2700K evening · 19°C–23°C range",
      },
      {
        title: "Acoustic Intelligence",
        description: "Sound masking systems activate automatically in open areas when noise levels exceed thresholds. Meeting rooms detect when a call starts and engage active noise cancellation.",
        detail: "Target: < 35dB ambient · Sound masking: 45dB",
      },
      {
        title: "Occupancy Optimization",
        description: "Presence sensors track desk and room utilization in real time. The system learns patterns over time, pre-conditioning spaces before peak hours and powering down unused zones.",
        detail: "47 presence sensors · 15-min predictive warm-up",
      },
      {
        title: "Energy Intelligence",
        description: "Every circuit is monitored. The building automatically shifts non-critical loads to off-peak hours, integrates with solar generation data, and provides per-member energy reports.",
        detail: "Solar-aware · Per-circuit monitoring · Carbon reporting",
      },
      {
        title: "AI Workload Support",
        description: "Dedicated GPU compute nodes available to members for AI training, inference, and experimentation. Accessible via SSH or a browser-based JupyterHub instance — no setup required.",
        detail: "NVIDIA A100 · JupyterHub · SSH access",
      },
    ],
  },
  cta: {
    headline: "Experience it firsthand.",
    description: "Book a visit and see how the building responds to your presence.",
    buttonText: "Book a Visit",
  },
};

export const spacePageContent = {
  hero: {
    tagline: "The Space",
    headline: "Architecture designed for deep work.",
    description: "Every material, every light source, every acoustic panel was chosen with a single purpose: to eliminate friction between you and your best work.",
  },
  spaceTypes: [
    {
      title: "Open Studio",
      description: "Expansive open-plan workspace with height-adjustable desks, premium ergonomic seating, and zones calibrated for different work modes — from deep focus to collaborative sprints.",
      image: "/assets/hero_space.jpg",
      tags: ["Height-adjustable desks", "Ergonomic chairs", "Focus zones", "Natural light"],
    },
    {
      title: "Private Offices",
      description: "Fully enclosed, acoustically treated offices for teams of 1–8. Each comes with a dedicated smart panel for climate and lighting control, and a reserved fiber drop.",
      image: "/assets/private_office.jpg",
      tags: ["Acoustic treatment", "Smart climate", "Dedicated fiber", "24/7 access"],
    },
    {
      title: "Meeting Rooms",
      description: "Glass-walled rooms equipped with 4K displays, wireless presentation systems, and AI-powered noise cancellation. Book via app — rooms pre-cool 10 minutes before your meeting.",
      image: "/assets/meeting_room.jpg",
      tags: ["4K displays", "Wireless presentation", "AI noise cancellation", "Auto-booking"],
    },
    {
      title: "Community Lounge",
      description: "A curated social space for informal conversations, casual work, and the kind of serendipitous collisions that start companies. Specialty coffee always on.",
      image: "/assets/community_lounge.jpg",
      tags: ["Specialty coffee", "Curated library", "Lounge seating", "Event space"],
    },
  ],
  amenities: {
    title: "Amenities",
    headline: "Every detail considered.",
    items: [
      { label: "4K External Monitors", description: "Available at every hot desk" },
      { label: "Acoustic Engineering", description: "NRC 0.85 rated panels throughout" },
      { label: "Circadian Lighting", description: "Color temperature shifts with the day" },
      { label: "24/7 Access", description: "NFC keyless entry, always on" },
      { label: "Ergonomic Hardware", description: "Herman Miller, Logitech MX series" },
    ],
  },
  cta: {
    headline: "See it in person.",
    description: "Words and photos can only go so far. Book a tour and feel the difference.",
    buttonText: "Book a Visit",
  },
};

export const membershipsPageContent = {
  hero: {
    tagline: "Memberships",
    headline: "Join the network.",
    description: "Three tiers. One ecosystem. Choose the level of access that matches your ambition.",
  },
  tiers: [
    {
      name: "Nomad",
      tagline: "For the independent operator.",
      monthlyPrice: 149,
      annualPrice: 119,
      description: "Flexible hot-desk access with full building privileges. Come when you need to, leave when you want.",
      features: [
        "10 days/month hot-desk access",
        "1 Gbps fiber",
        "Adaptive climate & lighting",
        "Smart access via mobile app",
        "Community events",
        "Specialty coffee & tea",
        "2 meeting room hours/month",
      ],
      highlighted: false,
      cta: "Start as Nomad",
    },
    {
      name: "Resident",
      tagline: "For the serious builder.",
      monthlyPrice: 349,
      annualPrice: 279,
      description: "Unlimited access, a dedicated desk, and priority access to all AI infrastructure and GPU resources.",
      features: [
        "Unlimited hot-desk access",
        "Dedicated desk (reserved)",
        "1 Gbps fiber + dedicated IP",
        "GPU compute access (20h/mo)",
        "AI tools & JupyterHub",
        "10 meeting room hours/month",
        "Priority event access",
        "Locker storage",
        "Guest passes (2/month)",
      ],
      highlighted: true,
      cta: "Become a Resident",
    },
    {
      name: "Studio",
      tagline: "For the team that means business.",
      monthlyPrice: 899,
      annualPrice: 719,
      description: "A fully private, acoustically treated office for teams of up to 4. Your own space inside the most intelligent building in Europe.",
      features: [
        "Private office (up to 4 people)",
        "24/7 dedicated access",
        "Dedicated fiber drop",
        "GPU compute access (100h/mo)",
        "Unlimited meeting room access",
        "Custom smart environment profile",
        "Dedicated concierge",
        "Unlimited guest passes",
        "Custom branding on door panel",
      ],
      highlighted: false,
      cta: "Claim a Studio",
    },
  ],
  faqs: [
    {
      question: "Is there a minimum commitment?",
      answer: "No. All memberships are month-to-month by default. Annual plans are available at a 20% discount for those who want to commit.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, at any time. Changes take effect at the start of the next billing cycle.",
    },
    {
      question: "What is included in GPU compute access?",
      answer: "Access to NVIDIA A100 nodes via SSH or JupyterHub. Hours are tracked per session. Additional hours can be purchased at €3/hour.",
    },
    {
      question: "Is there a trial period?",
      answer: "Yes. Book a visit first — we offer a free day pass so you can experience the space before committing.",
    },
    {
      question: "Are there discounts for startups or students?",
      answer: "We offer a 30% discount for early-stage startups (pre-seed) and students enrolled in accredited programs. Contact us to apply.",
    },
  ],
};

export const communityPageContent = {
  hero: {
    tagline: "Community",
    headline: "Connect with the brightest minds.",
    description: "22Cowork is more than a workspace; it\'s an ecosystem of innovators, founders, and thought leaders. Connect, collaborate, and grow.",
  },
  memberTypes: [
    { role: "AI Engineers", count: "12", desc: "Building models, fine-tuning LLMs, and deploying production AI systems." },
    { role: "Founders", count: "8", desc: "Pre-seed to Series A, across SaaS, hardware, and deep tech." },
    { role: "Researchers", count: "5", desc: "Academic and independent researchers in ML, robotics, and systems." },
    { role: "Designers", count: "6", desc: "Product designers, UX researchers, and creative technologists." },
    { role: "Operators", count: "9", desc: "Growth, finance, and operations professionals at high-growth companies." },
  ],
  events: [
    {
      title: "AI Ethics Roundtable",
      date: "July 20, 2024",
      time: "18:00 - 19:30",
      location: "Auditorium",
      description: "A monthly discussion on the ethical implications of AI, featuring guest speakers from academia and industry.",
    },
    {
      title: "Founder's Pitch Night",
      date: "August 5, 2024",
      time: "19:00 - 21:00",
      location: "Event Space",
      description: "Showcase your startup, get feedback from experienced entrepreneurs, and network with potential investors.",
    },
    {
      title: "Deep Work Workshop",
      date: "August 15, 2024",
      time: "10:00 - 12:00",
      location: "Focus Zone 3",
      description: "Learn strategies and techniques for achieving flow state and maximizing productivity in a distraction-free environment.",
    },
  ],
  perks: [
    {
      title: "Exclusive Workshops",
      description: "Access to members-only workshops on AI, automation, and advanced productivity techniques.",
    },
    {
      title: "Mentorship Program",
      description: "Connect with experienced mentors in AI, tech, and entrepreneurship to accelerate your growth.",
    },
    {
      title: "Networking Events",
      description: "Regular social events, happy hours, and informal gatherings to foster connections and collaboration.",
    },
    {
      title: "Online Forum",
      description: "A private online community to share ideas, ask questions, and collaborate on projects.",
    },
  ],
  cta: {
    headline: "Join the conversation.",
    description: "Become part of a vibrant community pushing the boundaries of innovation.",
    buttonText: "Explore Memberships",
  },
};

export const bookPageContent = {
  hero: {
    tagline: "Connect",
    headline: "Experience the future of work.",
    description: "Schedule a visit, request a day pass, or inquire about membership. Our team will get back to you within 24 hours.",
  },
  form: {
    headline: "Tell us about your needs.",
    intents: [
      "Book a Tour",
      "Request a Day Pass",
      "Inquire about Membership",
      "General Inquiry",
    ],
    submitButton: "Send Request",
    successMessage: "Your request has been received! We'll be in touch shortly.",
  },
};

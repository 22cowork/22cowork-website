export const siteMetadata = {
  title: "22Cowork · The Future of Work",
  description: "Experience clarity, focus, and effortless productivity at 22Cowork. An intelligently designed ecosystem for ambitious professionals.",
  author: "22Cowork",
  keywords: "coworking, Setúbal, Portugal, workspace, office, productivity, AI, smart building, community, flexible office, dedicated desk, private office, meeting rooms, podcast studio",
  siteUrl: "https://22cowork.pt",
  social: {
    instagram: "https://www.instagram.com/22cowork/",
    youtube: "https://www.youtube.com/@22cowork",
    whatsapp: "https://wa.me/YOUR_WHATSAPP_NUMBER", // Replace with actual WhatsApp number
  },
};

export const navigationLinks = [
  { name: "Space", href: "/space" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Community", href: "/community" },
  { name: "Memberships", href: "/memberships" },
  { name: "Book a Tour", href: "/book" },
];

export const homepageContent = {
  hero: {
    tagline: "Your best work, realized.",
    headline: "Clarity, by design. Focus, by choice.",
    description: "An intelligently designed ecosystem where every detail supports your productivity. Experience a workspace that anticipates your needs, so you can master your day.",
    ctaPrimary: { text: "Book a Tour", href: "/book" },
    ctaSecondary: { text: "Explore the Space", href: "/space" },
    features: [
      "Effortless Access",
      "Seamless Connectivity",
      "Intuitive Environment",
    ],
    image: "/assets/hero_space.jpg", // Placeholder, will use real image
  },
  storytelling: {
    title: "A Day, Redefined.",
    sections: [
      {
        title: "Arrival. Effortless.",
        description: "Your day begins before you even step inside. Smart access anticipates your arrival, guiding you seamlessly into an environment designed for immediate focus. No friction, just flow.",
        image: "/assets/arrival.jpg", // Placeholder
      },
      {
        title: "Focus. Uninterrupted.",
        description: "Find your rhythm in spaces crafted for deep work. Intelligent lighting adapts to your presence, climate control maintains perfect comfort, and sound-dampened zones ensure your concentration remains unbroken.",
        image: "/assets/focus.jpg", // Placeholder
      },
      {
        title: "Connect. Intentionally.",
        description: "Beyond the individual, a vibrant community thrives. Connect with like-minded professionals in curated common areas, or host impactful meetings in our technologically advanced conference rooms. Collaboration, simplified.",
        image: "/assets/connect.jpg", // Placeholder
      },
      {
        title: "Depart. Accomplished.",
        description: "As your day concludes, leave feeling energized and accomplished. The building intelligently powers down, securing your work and preparing for tomorrow. Your productivity, amplified.",
        image: "/assets/depart.jpg", // Placeholder
      },
    ],
  },
  valueProposition: {
    title: "Beyond a Desk. An Ecosystem.",
    items: [
      {
        icon: "/assets/icon_ai.svg", // Placeholder
        headline: "Intelligent Infrastructure",
        description: "AI-powered systems optimize your environment for peak performance, from air quality to lighting.",
      },
      {
        icon: "/assets/icon_community.svg", // Placeholder
        headline: "Curated Community",
        description: "Connect with a network of innovators, founders, and creators. Opportunities for collaboration are always present.",
      },
      {
        icon: "/assets/icon_comfort.svg", // Placeholder
        headline: "Unrivaled Comfort",
        description: "Ergonomic design, silent zones, and premium amenities ensure your physical and mental well-being.",
      },
      {
        icon: "/assets/icon_security.svg", // Placeholder
        headline: "Advanced Security",
        description: "State-of-the-art security systems protect your work and privacy, 24/7.",
      },
    ],
  },
  ctaFinal: {
    headline: "Ready to Redefine Your Workday?",
    description: "Discover how 22Cowork can elevate your productivity and connect you with a thriving community.",
    ctaPrimary: { text: "Book Your Tour", href: "/book" },
    ctaSecondary: { text: "View Memberships", href: "/memberships" },
  },
};

export const spacePageContent = {
  hero: {
    headline: "Spaces Designed for Your Success.",
    description: "From focused deep work to dynamic collaboration, our environments are meticulously crafted to support every facet of your professional life.",
    image: "/assets/space_hero.jpg", // Placeholder
  },
  sections: [
    {
      title: "Dedicated Desks. Your Private Domain.",
      description: "Claim your permanent spot in a vibrant, yet focused, open-plan setting. Equipped with ergonomic furniture and seamless connectivity, it\'s your space to thrive, day after day.",
      image: "/assets/dedicated_desk.jpg", // Placeholder
      features: [
        "Ergonomic Seating",
        "Personal Storage",
        "High-Speed Ethernet",
        "24/7 Access",
      ],
    },
    {
      title: "Private Offices. Your Brand\'s Sanctuary.",
      description: "Secure a fully furnished, private office tailored for individuals or small teams. Ideal for focused work, confidential meetings, and establishing your brand presence.",
      image: "/assets/private_office.jpg", // Placeholder
      features: [
        "Soundproofed Environment",
        "Customizable Layouts",
        "Client-Ready Interiors",
        "Scalable Options",
      ],
    },
    {
      title: "Meeting & Podcast Studio. Ideas Amplified.",
      description: "Host impactful presentations, confidential discussions, or record high-quality podcasts in our state-of-the-art studio. Technology and comfort, perfectly aligned.",
      image: "/assets/meeting_room.jpg", // Placeholder
      features: [
        "Acoustically Treated",
        "High-Definition Displays",
        "Professional Audio Gear",
        "Seamless Booking",
      ],
    },
    {
      title: "Hot Desks. Flexible Freedom.",
      description: "Access our dynamic open workspace on demand. Perfect for those who need a professional environment without a fixed commitment. Find your spot, plug in, and produce.",
      image: "/assets/hot_desk.jpg", // Placeholder
      features: [
        "Flexible Access",
        "Diverse Work Zones",
        "Plug & Play Setup",
        "Community Access",
      ],
    },
  ],
};

export const intelligencePageContent = {
  hero: {
    headline: "Intelligence You Don\'t See. Results You Feel.",
    description: "Our building is a living ecosystem, constantly optimizing itself to enhance your comfort, productivity, and security. Technology, effortlessly integrated.",
    image: "/assets/intelligence_hero.jpg", // Placeholder
  },
  sections: [
    {
      title: "Adaptive Climate Control. Perfect Comfort.",
      description: "Experience an environment that intuitively adjusts to your presence. Our smart HVAC systems maintain optimal temperature and air quality, ensuring your focus is never broken.",
      image: "/assets/climate_control.jpg", // Placeholder
      features: [
        "Personalized Zones",
        "Real-time Air Quality",
        "Energy Optimized",
        "Silent Operation",
      ],
    },
    {
      title: "Dynamic Lighting. Naturally Productive.",
      description: "Intelligent lighting systems mimic natural daylight cycles, reducing eye strain and boosting your energy. Light that works with you, not against you.",
      image: "/assets/dynamic_lighting.jpg", // Placeholder
      features: [
        "Circadian Rhythm Support",
        "Presence Detection",
        "Glare Reduction",
        "Customizable Scenes",
      ],
    },
    {
      title: "Seamless Connectivity. Always On.",
      description: "Uninterrupted 10GB fiber internet and WiFi 7 ensure you\'re always connected. Our network infrastructure is built for speed, reliability, and security.",
      image: "/assets/connectivity.jpg", // Placeholder
      features: [
        "10GB Fiber Backbone",
        "WiFi 7 Ready",
        "Redundant Systems",
        "Secure VPN Options",
      ],
    },
    {
      title: "Smart Access & Security. Peace of Mind.",
      description: "Your safety and privacy are paramount. Advanced keycard access, intelligent surveillance, and secure data networks provide complete peace of mind, 24/7.",
      image: "/assets/security.jpg", // Placeholder
      features: [
        "24/7 Keycard Access",
        "AI-Powered Surveillance",
        "Data Privacy Protocols",
        "Visitor Management",
      ],
    },
  ],
};

export const membershipsPageContent = {
  hero: {
    headline: "Memberships Designed for Your Ambition.",
    description: "Flexible plans crafted to support every stage of your professional journey. Find the perfect fit for your focus, team, and growth.",
    image: "/assets/memberships_hero.jpg", // Placeholder
  },
  plans: [
    {
      name: "Hot Desk",
      tagline: "Flexible Freedom.",
      features: [
        "Access to open workspace",
        "High-speed Wi-Fi",
        "Community events access",
        "Business address",
      ],
      cta: { text: "Start Your Trial", href: "/book?plan=hot-desk" },
    },
    {
      name: "Dedicated Desk",
      tagline: "Your Permanent Hub.",
      features: [
        "Your own fixed desk",
        "Ergonomic chair",
        "Personal storage",
        "24/7 access",
        "Meeting room credits",
      ],
      cta: { text: "Inquire Now", href: "/book?plan=dedicated-desk" },
    },
    {
      name: "Private Office",
      tagline: "Your Brand\'s Sanctuary.",
      features: [
        "Fully furnished private office",
        "Soundproofed environment",
        "Customizable layout",
        "Client-ready interiors",
        "Generous meeting room credits",
      ],
      cta: { text: "Request a Quote", href: "/book?plan=private-office" },
    },
  ],
  ctaFinal: {
    headline: "Not Sure Which Plan is Right?",
    description: "Our team is here to help you find the perfect membership to elevate your work.",
    cta: { text: "Contact Us", href: "/contact" },
  },
};

export const communityPageContent = {
  hero: {
    headline: "Connect. Collaborate. Grow.",
    description: "Beyond the workspace, a vibrant ecosystem of innovators, founders, and creators. Discover opportunities, share insights, and build lasting connections.",
    image: "/assets/community_hero.jpg", // Placeholder
  },
  sections: [
    {
      title: "Curated Events. Inspired Connections.",
      description: "From expert-led workshops to informal networking mixers, our calendar is designed to foster meaningful interactions and professional growth.",
      image: "/assets/events.jpg", // Placeholder
      items: [
        "Weekly Meetups",
        "Skill-Share Sessions",
        "Founder Forums",
        "Social Gatherings",
      ],
    },
    {
      title: "Member Stories. Your Journey.",
      description: "Be inspired by the diverse achievements of our community. 22Cowork is where groundbreaking ideas take flight and careers accelerate.",
      image: "/assets/member_stories.jpg", // Placeholder
      items: [
        "Success Spotlights",
        "Collaborative Projects",
        "Industry Insights",
        "Personal Growth",
      ],
    },
    {
      title: "Online Hub. Always Connected.",
      description: "Our exclusive online platform keeps you connected with fellow members, even when you\'re not in the space. Share resources, ask questions, and collaborate effortlessly.",
      image: "/assets/online_hub.jpg", // Placeholder
      items: [
        "Member Directory",
        "Discussion Boards",
        "Resource Sharing",
        "Event RSVPs",
      ],
    },
  ],
  memberTypes: [
    {
      title: "Founders",
      description: "Building the next big thing. Seeking focus, resources, and a network of peers.",
    },
    {
      title: "Creators",
      description: "Crafting compelling content. Needing dedicated space, professional tools, and creative inspiration.",
    },
    {
      title: "Freelancers",
      description: "Mastering their craft. Valuing flexibility, community, and a professional address.",
    },
  ],
  ctaFinal: {
    headline: "Join Our Community.",
    description: "Experience the power of working alongside like-minded professionals. Your next opportunity is waiting.",
    cta: { text: "Explore Memberships", href: "/memberships" },
  },
};

export const bookPageContent = {
  hero: {
    headline: "Begin Your 22Cowork Experience.",
    description: "Schedule a personalized tour or inquire about our memberships. Discover the difference an intelligently designed workspace can make.",
    image: "/assets/book_hero.jpg", // Placeholder
  },
  form: {
    title: "Book Your Visit or Inquire",
    fields: [
      { label: "Full Name", type: "text", name: "fullName", placeholder: "John Doe" },
      { label: "Email", type: "email", name: "email", placeholder: "john.doe@example.com" },
      { label: "Phone Number", type: "tel", name: "phone", placeholder: "+351 912 345 678" },
      {
        label: "Interest",
        type: "select",
        name: "interest",
        options: [
          { value: "tour", label: "Schedule a Tour" },
          { value: "hot-desk", label: "Hot Desk Membership" },
          { value: "dedicated-desk", label: "Dedicated Desk Membership" },
          { value: "private-office", label: "Private Office Inquiry" },
          { value: "podcast-studio", label: "Podcast Studio Booking" },
          { value: "other", label: "Other Inquiry" },
        ],
      },
      { label: "Preferred Date (Optional)", type: "date", name: "preferredDate" },
      { label: "Message", type: "textarea", name: "message", placeholder: "Tell us about your needs..." },
    ],
    submitButton: "Send Inquiry",
    successMessage: "Your inquiry has been received. We'll be in touch shortly!",
  },
  ctaFinal: {
    headline: "Questions? We're Here to Help.",
    description: "Our team is ready to guide you through your 22Cowork journey. Reach out anytime.",
    cta: { text: "Contact Us", href: "/contact" },
  },
};

export const contactPageContent = {
  hero: {
    headline: "Let\'s Connect.",
    description: "Have questions? Ready to elevate your workspace? Reach out to our team.",
    image: "/assets/contact_hero.jpg", // Placeholder
  },
  details: [
    {
      icon: "/assets/icon_location.svg", // Placeholder
      title: "Our Location",
      description: "Rua do Comércio, 22, 2900-000 Setúbal, Portugal",
      link: "https://maps.app.goo.gl/YOUR_GOOGLE_MAPS_LINK", // Replace with actual Google Maps link
    },
    {
      icon: "/assets/icon_email.svg", // Placeholder
      title: "Email Us",
      description: "team@22cowork.pt",
      link: "mailto:team@22cowork.pt",
    },
    {
      icon: "/assets/icon_phone.svg", // Placeholder
      title: "Call Us",
      description: "+351 912 345 678", // Replace with actual phone number
      link: "tel:+351912345678",
    },
  ],
};

export const aboutPageContent = {
  hero: {
    headline: "Our Vision. Your Future.",
    description: "22Cowork was founded on the belief that work environments should inspire, empower, and adapt. We\'re building the future of productivity, one intelligent space at a time.",
    image: "/assets/about_hero.jpg", // Placeholder
  },
  sections: [
    {
      title: "The 22Cowork Philosophy",
      description: "We believe in creating spaces that are more than just offices. They are ecosystems designed for deep work, seamless collaboration, and genuine community. Our philosophy is rooted in the idea that technology should be invisible, enhancing your experience without distraction.",
      image: "/assets/philosophy.jpg", // Placeholder
    },
    {
      title: "Our Commitment to Intelligence",
      description: "From AI-powered climate control to smart access systems, every aspect of 22Cowork is engineered for efficiency and comfort. We are a living laboratory for the future of work, constantly evolving to meet the needs of ambitious professionals.",
      image: "/assets/commitment.jpg", // Placeholder
    },
    {
      title: "Join Our Story",
      description: "We\'re building a community of forward-thinkers in Setúbal. Whether you\'re a founder, creator, or freelancer, 22Cowork offers the environment and network to amplify your potential.",
      image: "/assets/join_story.jpg", // Placeholder
    },
  ],
};

export const trialPageContent = {
  hero: {
    headline: "Experience 22Cowork. Risk-Free.",
    description: "Discover the difference an intelligently designed workspace makes. Try 22Cowork for 3 days, completely free.",
    image: "/assets/trial_hero.jpg", // Placeholder
  },
  features: [
    "3 Days of Hot Desk Access",
    "High-Speed Wi-Fi",
    "Community Event Access",
    "Complimentary Coffee & Tea",
    "No Obligation",
  ],
  cta: { text: "Claim Your Free Trial", href: "/book?plan=free-trial" },
};

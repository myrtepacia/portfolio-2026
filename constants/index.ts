export const frontend = [
    'Javascript',
    'Next.js',
    'TailwindCSS',
    'Typescript'
]
export const backend = [
    'Node.js',
    'PHP',
    'Python'
]

export const devTools = [
    'Git',
    'Github',
    'Figma',
    'Vscode',
    'Vercel'
]

export const techSupport = [
    'Printer Troubleshooting',
    'Basic Computer Troubleshooting',

]

export const projectData = [
    {
        title: 'IponicsPH',
        // Each project's icon and screenshots live in its own folder under /images/projects
        icon: '/images/projects/IponicsPH/icon.svg',
        screenshots: [
            '/images/projects/IponicsPH/Home.jpg',
            '/images/projects/IponicsPH/Savings.jpg',
            '/images/projects/IponicsPH/activity.jpg',
            '/images/projects/IponicsPH/Plan.jpg',
        ],
        // Phone screenshots, so the viewer shows them in a tall frame
        tallScreenshots: true,
        tagline: 'Allowance Budgeting App',
        type: 'Mobile App',
        description: 'An Android app for planning and tracking an allowance in the Philippines, with spending activity and savings. All data stays on the phone.',
        stack: ['React', 'TypeScript', 'Vite', 'Capacitor'],
        highlights: [
            'Allowance planning built for the Philippines',
            'Spending activity and savings in one place',
            'Home-screen widget for what you can still spend today',
        ],
        link: '',
        // An app to install, so its card shows Download instead of Live Website
        download: '/projects/IponicsPH/IponicsPH.apk',
    },
    {
        title: 'CSFlix',
        // Still listed on /projects, just not in the home page's Featured Projects
        featured: false,
        icon: '/images/projects/csflix/icon.svg',
        screenshots: [
            '/images/projects/csflix/home.jpg',
            '/images/projects/csflix/home-2.jpg',
            '/images/projects/csflix/booking.jpg',
        ],
        tagline: 'Cinema Booking & E-Ticketing Platform',
        type: 'School Project',
        description: 'A school project cinema booking website for reserving seats, pre-ordering snacks, and paying online, with QR e-tickets, customer reviews, and an admin dashboard for managing films and scanning tickets.',
        stack: ['JavaScript', 'PHP', 'MySQL'],
        highlights: [
            'Seat reservation with snack pre-orders and online payment',
            'QR-code e-tickets scanned from the admin dashboard',
            'Customer reviews and film management for admins',
        ],
        link: 'https://csflix.app'
    },   
    {
         title: 'Portfolio',
         // Still listed on /projects, just not in the home page's Featured Projects
         featured: false,
         icon: '/images/projects/portfolio/icon-color.png',
         screenshots: ['/images/projects/portfolio/home.jpg', '/images/projects/portfolio/home-2.jpg'],
         tagline: 'AI-Assisted Personal Website',
         type: 'Personal Project',
         description: 'A modern personal portfolio website that presents my skills, projects, and experience through a clean and professional interface, enhanced by an AI-powered assistant for a more engaging user experience.',
         stack: ['Next.js', 'TailwindCSS', 'Javascript', 'Typescript', 'OpenAI'],
         highlights: [
            'Skills, projects, and experience in one place',
            'AI assistant that answers visitor questions',
            'Light and dark themes with a responsive layout',
         ],
         link: 'https://myrtepacia.tech/'
    },
     {
        title: 'Restaurant Discrete Event Simulation',
        // Still listed on /projects, just not in the home page's Featured Projects
        featured: false,
        icon: '/images/projects/restaurant-sim/icon.svg',
        screenshots: ['/images/projects/restaurant-sim/landing.jpg'],
        tagline: 'Restaurant Operations Simulation Dashboard',
        type: 'Simulation',
        description: 'A dashboard-based restaurant operations simulator using discrete-event simulation to model guest flow, wait times, utilization, and revenue.',
        stack: ['TypeScript', 'TailwindCSS', 'React', 'Next.js', 'Python'],
        highlights: [
            'Models guest flow through the restaurant event by event',
            'Dashboard for wait times, table utilization, and revenue',
            'Built with TypeScript, React, and Python',
        ],
        link: 'https://restaurant-discrete-event-simulatio.vercel.app/'
    },

]

export const certificates = [
    // Newest first; the home page shows the first few
    {
        title: "Prompt, Connect, Convert: The New Era of AI-Powered Marketing",
        provider: "National Teachers College",
        image: '/images/certificates/ai-powered-marketing.jpg'
    },
    {
        title: "Code Connect Workshop",
        provider: "Negros Oriental State University",
        image: '/images/certificates/cc-workshop.jpg'
    },
     {
        title: "Computer Systems Servicing NC II",
        provider: "Technical Education and Skills Development Authority",
        image: '/images/certificates/NCII.jpg'
    },
    {
        title: "Basic Javascript for Web Development",
        provider: "Department of Information and Communications Technology",
        image: '/images/certificates/basic-js.jpg'
    },
    {
        title: "Using HTML and CSS to Design a Website",
        provider: "Department of Information and Communications Technology",
        image: '/images/certificates/html-css.jpg'
    },
]

// Events shown in the home page gallery; each program's photos live in its own folder
export const programs = [
    {
        title: 'Code Connect',
        description: "A hands-on workshop on databases and programming languages, run by the computing student organizations at Negros Oriental State University.",
        photos: [
            '/images/gallery/code-connect/1.jpg',
            '/images/gallery/code-connect/2.jpg',
            '/images/gallery/code-connect/3.jpg',
            '/images/gallery/code-connect/4.jpg',
        ],
    },
]

export const hireme = [
    'Clean, maintainable code',
    'Performance-focused',
    'Pixel-perfect UI',
    'Scalable architecture',
    'Client-focused mindset',

]

export const profile = {
    name: 'Henmyr Vincent L. Tepacia',
    shortName: 'Henmyr Vincent Tepacia',
    initials: 'HT',
    location: 'Dumaguete, Philippines',
    mapUrl: 'https://maps.app.goo.gl/ierGoY5Ps5taCW9JA',
    city: 'Dumaguete, PH',
    timeZone: 'Asia/Manila',
    email: 'myrtepacia@gmail.com',
    calendly: 'https://calendly.com/myrtepacia/consultation',
    github: 'https://github.com/myrtepacia',
    githubUsername: 'myrtepacia',
    linkedin: 'https://www.linkedin.com/in/myrtepacia/',
    site: 'https://myrtepacia.tech',
}

export const socials = [
    { label: 'GitHub', href: 'https://github.com/myrtepacia' },
    { label: 'Facebook', href: 'https://web.facebook.com/myrtepacia/' },
    { label: 'Instagram', href: 'https://www.instagram.com/myrtepacia/' },
    { label: 'Discord', href: 'https://discord.com/users/300006432798015489' },
]

// "Education & Experience" list on the home page, newest first.
// Leave `end` out for something still ongoing; it shows as "Present".

export const education = [
    {
        level: 'College Degree',
        badge: '2024 - Present',
        school: 'Negros Oriental State University',
        detail: 'Bachelor of Science in Computer Science',
        initials: 'NO',
        link: 'https://web.facebook.com/NORSUPIOMAIN',
    },
    {
        level: 'Senior High',
        badge: 'NC II Holder',
        school: 'Demetrio L. Alviola National High School',
        detail: 'Computer System Servicing',
        initials: 'DA',
        link: 'https://web.facebook.com/DlanhsSince1968',
    },
]


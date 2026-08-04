// Add a project by appending an object. `hue` is a token, never a hex value.
export const projects = [
  {
    name: 'Toub POS',
    year: '2026',
    tag: 'Group project',
    blurb: 'A role-based POS for student popup booths — cashiers work from PIN-locked stalls, cash confirmations write audit logs, and paid orders dispatch live to the kitchen over Telegram.',
    stack: ['React', 'Vite', 'Express', 'MySQL', 'Sequelize', 'JWT'],
    metric: 'Owner / Manager / Cashier roles, built for real campus booths',
    hue: 'var(--color-sage)',
    href: 'https://github.com/sothyvan/TOUB_POS',
  },
  {
    name: 'Vehicle Rental Management System',
    year: '2025',
    tag: 'Group project',
    blurb: 'A fleet management system for a rental business — I owned the backend and database: entity modeling, repository layer, and rental logic with snapshot-based history for auditing.',
    stack: ['Java', 'Spring Boot', 'JPA / Hibernate', 'MySQL', 'React'],
    metric: 'Backend + database owner — RBAC, billing, fleet reporting',
    hue: 'var(--color-ember)',
    href: 'https://github.com/Ryuo-chhi/Vehicle-Rental-Management-System-Main-',
  },
  {
    name: 'Self-Planning Travel Planner',
    year: '2024 → 2026',
    tag: 'Group project',
    blurb: 'Started as a static HTML/CSS/JS itinerary planner for a Year 2 web design course. The team later rebuilt it full-stack — I helped shape the direction and feature ideas, including the AI travel assistant, while a teammate led the React/Express rebuild.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Express', 'Sequelize'],
    metric: 'Evolved from a static site into an AI-powered full-stack app',
    hue: 'var(--color-sky)',
    href: 'https://github.com/thangsaoly/self-planning-react',
  },
]

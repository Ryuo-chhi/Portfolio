// Single source of truth for the header, the mobile rail, the command palette,
// and scroll tracking. `id` must match the section element's id.
export const navigation = [
  { id: 'workshop', icon: '🏠', label: 'Workshop', command: 'Go to the workshop' },
  { id: 'story',    icon: '📖', label: 'Story',    command: 'Read my notebook' },
  { id: 'projects', icon: '🛠', label: 'Projects', command: 'Browse the shelf' },
  { id: 'skills',   icon: '⚡', label: 'Skills',   command: 'Open the toolbox' },
  { id: 'bench',    icon: '📐', label: 'Bench',    command: 'Look at the blueprint wall' },
  { id: 'contact',  icon: '📬', label: 'Contact',  command: 'Write me a letter' },
]

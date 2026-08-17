// Single source of truth for the header, the mobile rail, the command palette,
// and scroll tracking. `id` must match the section element's id.
export const navigation = [
  { id: 'workshop', icon: 'workshop', label: 'Workshop', command: 'Go to the workshop' },
  { id: 'story',    icon: 'story',    label: 'Story',    command: 'Read my notebook' },
  { id: 'projects', icon: 'projects', label: 'Projects', command: 'Browse the shelf' },
  { id: 'skills',   icon: 'skills',   label: 'Skills',   command: 'Open the toolbox' },
  { id: 'bench',    icon: 'bench',    label: 'Bench',    command: 'Look at the blueprint wall' },
  { id: 'contact',  icon: 'contact',  label: 'Contact',  command: 'Write me a letter' },
]

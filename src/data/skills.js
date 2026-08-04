// `glyph` names a shape in ToolGlyph.jsx: atom, triangle, wind, brackets, leaf,
// server, flame, barrel, stack, cloud, box, branch, wrench, flask.
export const skills = [
  {
    drawer: 'Front of house',
    tools: [
      { name: 'HTML', glyph: 'brackets' },
      { name: 'CSS', glyph: 'wind' },
      { name: 'JavaScript', glyph: 'triangle' },
      { name: 'React', glyph: 'atom' },
      { name: 'Tailwind CSS', glyph: 'cloud' },
    ],
  },
  {
    drawer: 'Back of house',
    tools: [
      { name: 'Java', glyph: 'flame' },
      { name: 'Node.js / Express', glyph: 'server' },
      { name: 'REST API design', glyph: 'flask' },
      { name: 'Sequelize', glyph: 'stack' },
    ],
  },
  {
    drawer: 'Storage',
    tools: [{ name: 'MySQL', glyph: 'barrel' }],
  },
  {
    drawer: 'Out the door',
    tools: [
      { name: 'Git', glyph: 'branch' },
      { name: 'GitHub', glyph: 'box' },
    ],
  },
]

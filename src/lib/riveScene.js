// Resolves the workshop Rive file if it exists in src/imports/
const riveFiles = import.meta.glob('../imports/workshop.riv', {
  query: '?url',
  import: 'default',
  eager: true,
})

export const getWorkshopRiveUrl = () => {
  const path = Object.keys(riveFiles)[0]
  return path ? riveFiles[path] : null
}

export const RIVE_ARTBOARD = "Workshop";
export const RIVE_STATE_MACHINE = "Workshop";
export const RIVE_NIGHT_PROPERTY = "palette.night";

export const RIVE_TRIGGERS = {
  mug: "interactions.tapMug",
  plant: "interactions.tapPlant",
  robot: "interactions.tapRobot"
};

export const RIVE_HOTSPOTS = [
  { id: "plant", label: "Make plant leaf fall", style: { left: "12.8%", top: "78.6%", width: "9.2%", height: "16.8%" } },
  { id: "robot", label: "Wake up robot", style: { left: "24.5%", top: "70%", width: "11%", height: "25%" } },
  { id: "mug", label: "Puff steam from mug", style: { left: "71.4%", top: "66.4%", width: "6.4%", height: "6.4%" } }
];

export const RIVE_COLOR_BINDINGS = [
  { property: "palette.wall", cssVar: "--color-cream" },
  { property: "palette.floor", cssVar: "--color-sand" },
  { property: "palette.wood", cssVar: "--color-bark" },
  { property: "palette.woodLight", cssVar: "--color-bark-light" },
  { property: "palette.forest", cssVar: "--color-forest" },
  { property: "palette.forestDeep", cssVar: "--color-forest-deep" },
  { property: "palette.sage", cssVar: "--color-sage" },
  { property: "palette.sageSoft", cssVar: "--color-sage-soft" },
  { property: "palette.ember", cssVar: "--color-ember" },
  { property: "palette.emberSoft", cssVar: "--color-ember-soft" },
  { property: "palette.sky", cssVar: "--color-sky" },
];

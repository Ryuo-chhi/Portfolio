import { useEffect, useRef } from "react"
import riveWasmUrl from "@rive-app/canvas-lite/rive.wasm?url"
import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
  useViewModelInstanceBoolean,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
} from "@rive-app/react-canvas-lite"
import { readCssRgb } from "../lib/cssColor"
import {
  RIVE_ARTBOARD,
  RIVE_COLOR_BINDINGS,
  RIVE_HOTSPOTS,
  RIVE_NIGHT_PROPERTY,
  RIVE_STATE_MACHINE,
  RIVE_TRIGGERS,
} from "../lib/riveScene"

/* Serve the WASM from our own bundle. Left alone, the runtime fetches it from
   unpkg on first paint — a third-party request that ties the hero illustration
   to someone else's CDN being reachable, and to whatever version it serves. */
RuntimeLoader.setWasmUrl(riveWasmUrl)

/**
 * Plays the Rive workshop scene.
 *
 * This file is lazy-loaded, so the runtime and its WASM only reach the browser
 * when a .riv actually exists — see HeroScene.
 *
 * @param props
 * @param props.src          Resolved URL of the .riv asset.
 * @param props.night        True in lamplight; drives both the palette push and
 *                           the file's own night boolean.
 * @param props.onRobotClick Raised so the page can show Bolt's speech bubble.
 * @param props.onError      Called if the file fails to load, so the caller can
 *                           fall back to the hand-drawn SVG scene.
 */
export default function RiveWorkshopScene({
  src,
  night,
  onRobotClick,
  onError,
}) {
  const { rive, RiveComponent } = useRive({
    src,
    artboard: RIVE_ARTBOARD,
    stateMachines: RIVE_STATE_MACHINE,
    // binds the file's default view model instance, which is what the
    // useViewModelInstance* hooks below read and write
    autoBind: true,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoadError: onError,
  })

  const vmi = rive?.viewModelInstance ?? null

  /* Respect reduced motion. The state machine would otherwise keep animating
     regardless of the CSS guard in index.css, which cannot reach a canvas. */
  useEffect(() => {
    if (!rive) return
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => (query.matches ? rive.pause() : rive.play())
    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [rive])

  const fireMug = useViewModelInstanceTrigger(RIVE_TRIGGERS.mug, vmi).trigger
  const firePlant = useViewModelInstanceTrigger(
    RIVE_TRIGGERS.plant,
    vmi,
  ).trigger
  const fireRobot = useViewModelInstanceTrigger(
    RIVE_TRIGGERS.robot,
    vmi,
  ).trigger

  const { setValue: setNight } = useViewModelInstanceBoolean(
    RIVE_NIGHT_PROPERTY,
    vmi,
  )
  useEffect(() => {
    setNight?.(night)
  }, [night, setNight])

  const tap = (id) => {
    if (id === "mug") fireMug?.()
    if (id === "plant") firePlant?.()
    if (id === "robot") {
      fireRobot?.()
      if (onRobotClick) onRobotClick()
    }
  }

  return (
    <div className="relative w-full">
      {/* Rive sizes its canvas from the container, so the aspect ratio of the
          artboard has to be declared here or nothing renders. */}
      <div className="aspect-[720/440] w-full">
        <RiveComponent className="h-full w-full" />
      </div>

      {RIVE_COLOR_BINDINGS.map((binding) => (
        <ColorBinding
          key={binding.property}
          {...binding}
          vmi={vmi}
          night={night}
        />
      ))}

      {RIVE_HOTSPOTS.map((hotspot) => (
        <button
          key={hotspot.id}
          type="button"
          onClick={() => tap(hotspot.id)}
          aria-label={hotspot.label}
          className="absolute rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.33,0.02,0.24,1)] hover:-translate-y-1 focus-visible:-translate-y-1 cursor-pointer"
          style={{ ...hotspot.style }}
        />
      ))}
    </div>
  )
}

/**
 * Pushes one token into one Rive colour property.
 *
 * One component per binding rather than a loop of hooks inside the parent: the
 * hook count stays fixed per component, which is what the rules of hooks
 * actually require.
 */
function ColorBinding({
  property,
  cssVar,
  vmi,
  night,
}) {
  const { setRgb } = useViewModelInstanceColor(property, vmi)
  const setRgbRef = useRef(setRgb)
  setRgbRef.current = setRgb

  useEffect(() => {
    if (!vmi) return
    /* Deferred a frame on purpose. Child effects run before the parent's, and
       it is App that toggles `.night` on <html> — reading the token
       synchronously here would pick up the palette we are replacing. */
    const frame = requestAnimationFrame(() => {
      const rgb = readCssRgb(cssVar)
      if (rgb) setRgbRef.current?.(rgb.r, rgb.g, rgb.b)
    })
    return () => cancelAnimationFrame(frame)
  }, [cssVar, vmi, night])

  return null
}

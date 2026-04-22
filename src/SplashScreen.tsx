import { useEffect, useMemo, useState } from 'react'
import { ShaderLabComposition, type ShaderLabConfig } from '@basementstudio/shader-lab'

type ResponsiveParams = {
  cellSize: number
  crtBloomIntensity: number
  crtBrightness: number
  gradientOpacity: number
  imageScale: number
}

function computeParams(width: number, height: number): ResponsiveParams {
  const largest = Math.max(width, height)
  const isMobile = largest < 900

  let cellSize: number
  if (largest >= 1600) cellSize = 7
  else if (largest >= 1200) cellSize = 6
  else if (largest >= 900) cellSize = 5
  else if (largest >= 600) cellSize = 3.5
  else cellSize = 3.5

  return {
    cellSize,
    crtBloomIntensity: isMobile ? 0.9 : 1.28,
    crtBrightness: isMobile ? 0.4 : 0.5,
    gradientOpacity: isMobile ? 0.18 : 0.26,
    imageScale: isMobile ? 1.0 : 0.45,
  }
}

function buildConfig(p: ResponsiveParams): ShaderLabConfig {
  return {
  layers: [
    {
      blendMode: 'normal',
      compositeMode: 'filter',
      maskConfig: { invert: false, mode: 'multiply', source: 'luminance' },
      hue: 0,
      id: '99109d60-a6ce-44a8-9832-24905d6c14bb',
      kind: 'effect',
      name: 'Pattern',
      opacity: 0,
      params: {
        cellSize: 8,
        preset: 'bars',
        colorMode: 'source',
        monoColor: '#f5f5f0',
        bgOpacity: 0.16,
        invert: false,
        customColorCount: 4,
        customLuminanceBias: 0,
        customBgColor: '#F5F5F0',
        customColor1: '#0d1014',
        customColor2: '#4d5057',
        customColor3: '#969aa2',
        customColor4: '#e1e2de',
        bloomEnabled: true,
        bloomIntensity: 8,
        bloomThreshold: 0.03,
        bloomRadius: 9.5,
        bloomSoftness: 0.79,
      },
      saturation: 1,
      type: 'pattern',
      visible: false,
    },
    {
      blendMode: 'normal',
      compositeMode: 'filter',
      maskConfig: { invert: false, mode: 'multiply', source: 'luminance' },
      hue: 11,
      id: '8f621e7b-a310-46d7-a2ed-6c015473d2bc',
      kind: 'effect',
      name: 'CRT',
      opacity: 1,
      params: {
        crtMode: 'slot-mask',
        cellSize: p.cellSize,
        scanlineIntensity: 1,
        maskIntensity: 1,
        barrelDistortion: 0.3,
        chromaticAberration: 1.18,
        beamFocus: 0.43,
        brightness: p.crtBrightness,
        highlightDrive: 1,
        highlightThreshold: 0.27,
        shoulder: 1.03,
        chromaRetention: 0.96,
        shadowLift: 0.46,
        persistence: 0,
        vignetteIntensity: 1,
        flickerIntensity: 0.13,
        glitchIntensity: 0.4,
        glitchSpeed: 1,
        signalArtifacts: 0.45,
        bloomEnabled: true,
        bloomIntensity: p.crtBloomIntensity,
        bloomThreshold: 0,
        bloomRadius: 0,
        bloomSoftness: 0,
      },
      saturation: 0.99,
      type: 'crt',
      visible: true,
    },
    {
      blendMode: 'normal',
      compositeMode: 'filter',
      maskConfig: { invert: false, mode: 'multiply', source: 'luminance' },
      hue: 0,
      id: '6bfa2084-cf57-4f8a-bb49-57cfa1c74b1c',
      kind: 'effect',
      name: 'Dithering',
      opacity: 0.12,
      params: {
        preset: 'custom',
        algorithm: 'bayer-4x4',
        colorMode: 'source',
        monoColor: '#f5f5f0',
        shadowColor: '#101010',
        highlightColor: '#f5f2e8',
        pixelSize: 1,
        spread: 0.09,
        levels: 3,
        dotScale: 0.3,
        animateDither: false,
        ditherSpeed: 1,
        chromaticSplit: false,
      },
      saturation: 1,
      type: 'dithering',
      visible: false,
    },
    {
      blendMode: 'normal',
      compositeMode: 'mask',
      maskConfig: { invert: false, mode: 'multiply', source: 'luminance' },
      hue: 0,
      id: '0e3136ed-a783-4527-888d-269caeb49a9f',
      kind: 'source',
      name: 'Text',
      opacity: 1,
      params: {
        text: 'basement',
        anchor: 'center',
        offset: [0, 0],
        fontSize: 201,
        fontFamily: 'sans',
        fontWeight: 800,
        letterSpacing: -0.1,
        textColor: '#ffffff',
        backgroundColor: '#000000',
        backgroundAlpha: 1,
      },
      saturation: 1,
      type: 'text',
      visible: false,
    },
    {
      blendMode: 'normal',
      compositeMode: 'filter',
      maskConfig: { invert: false, mode: 'multiply', source: 'luminance' },
      hue: 0,
      id: 'a924d323-7026-4b54-8738-355ef0d17009',
      kind: 'source',
      name: 'Gradient',
      opacity: p.gradientOpacity,
      params: {
        preset: 'neon-glow',
        activePoints: 2,
        point1Color: '#000000',
        point1Position: [0, 0],
        point1Weight: 0.6,
        point2Color: '#464646',
        point2Position: [-0.7, -0.5],
        point2Weight: 1.3,
        point3Color: '#662626',
        point3Position: [0.8, 0.3],
        point3Weight: 1.1,
        point4Color: '#220033',
        point4Position: [0.2, -0.8],
        point4Weight: 0.9,
        point5Color: '#1a0a2e',
        point5Position: [-0.5, 0.7],
        point5Weight: 1,
        noiseType: 'perlin',
        noiseSeed: 93.1,
        warpAmount: 0.64,
        warpScale: 1.04,
        warpIterations: 1,
        warpDecay: 0.58,
        warpBias: 0.35,
        vortexAmount: -0.25,
        animate: true,
        motionAmount: 0.42,
        motionSpeed: 1,
        falloff: 3.5,
        tonemapMode: 'totos',
        glowStrength: 0.89,
        glowThreshold: 0.52,
        grainAmount: 0.2,
        vignetteStrength: 0.1,
        vignetteRadius: 1.5,
        vignetteSoftness: 1,
      },
      saturation: 0.93,
      type: 'gradient',
      visible: true,
    },
    {
      blendMode: 'normal',
      compositeMode: 'filter',
      maskConfig: { invert: false, mode: 'multiply', source: 'luminance' },
      hue: 0,
      id: '0eba52be-fdf1-4343-8cbc-324f1d271e4c',
      kind: 'source',
      name: 'Image',
      opacity: 1,
      params: {
        fitMode: 'cover',
        scale: p.imageScale,
        offset: [0, 0],
        svgRasterResolution: '2048',
      },
      saturation: 1,
      type: 'image',
      visible: true,
      asset: {
        fileName: 'flowx-logo.svg',
        kind: 'image',
        src: `${import.meta.env.BASE_URL}flowx-logo.svg`,
      },
    },
  ],
    timeline: {
      duration: 8,
      loop: true,
      tracks: [],
    },
  }
}

export function SplashScreen() {
  const [params, setParams] = useState(() =>
    computeParams(window.innerWidth, window.innerHeight),
  )

  useEffect(() => {
    const onResize = () => {
      setParams(computeParams(window.innerWidth, window.innerHeight))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const config = useMemo(
    () => buildConfig(params),
    [
      params.cellSize,
      params.crtBloomIntensity,
      params.crtBrightness,
      params.gradientOpacity,
      params.imageScale,
    ],
  )

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
      }}
    >
      <ShaderLabComposition
        config={config}
        onRuntimeError={(message) => {
          console.error('[ShaderLab runtime error]', message)
        }}
      />
    </div>
  )
}

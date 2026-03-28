import { useEffect, useRef, type CSSProperties } from "react";
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform float animationSpeed;
uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;
uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;
uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;
uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;
uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;
uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;
uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const int MAX_LINES = 32;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t) {
  if (lineGradientCount <= 0) {
    return vec3(0.26, 0.31, 0.16);
  }

  if (lineGradientCount == 1) {
    return lineGradient[0];
  }

  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled = clampedT * float(lineGradientCount - 1);
  int idx = int(floor(scaled));
  float f = fract(scaled);
  int idx2 = min(idx + 1, lineGradientCount - 1);
  vec3 c1 = lineGradient[idx];
  vec3 c2 = lineGradient[idx2];
  return mix(c1, c2, f);
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float xOffset = offset;
  float xMovement = time * 0.08;
  float amp = 0.16 + sin(offset * 1.7 + time * 0.28) * 0.09;
  float y = sin(uv.x + xOffset + xMovement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0105 / max(abs(m) + 0.012, 1e-3);
}

void addWaveLayer(
  inout vec3 col,
  vec2 baseUv,
  vec2 mouseUv,
  int lineCount,
  float lineDistance,
  vec3 wavePosition,
  float opacity,
  float offsetBase,
  bool mirrorX
) {
  for (int i = 0; i < MAX_LINES; ++i) {
    if (i >= lineCount) {
      break;
    }

    float fi = float(i);
    float t = fi / max(float(lineCount - 1), 1.0);
    vec3 lineCol = getLineColor(t);
    float angle = wavePosition.z * log(length(baseUv) + 1.0);
    vec2 ruv = baseUv * rotate(angle);

    if (mirrorX) {
      ruv.x *= -1.0;
    }

    col += lineCol * wave(
      ruv + vec2(lineDistance * fi + wavePosition.x, wavePosition.y),
      offsetBase + 0.18 * fi,
      baseUv,
      mouseUv,
      interactive
    ) * opacity;
  }
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) {
    baseUv += parallaxOffset * parallaxStrength;
  }

  vec2 mouseUv = vec2(-1000.0, -1000.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  vec3 col = vec3(0.0);

  if (enableBottom) {
    addWaveLayer(col, baseUv, mouseUv, bottomLineCount, bottomLineDistance, bottomWavePosition, 0.22, 1.55, false);
  }

  if (enableMiddle) {
    addWaveLayer(col, baseUv, mouseUv, middleLineCount, middleLineDistance, middleWavePosition, 0.36, 1.15, false);
  }

  if (enableTop) {
    addWaveLayer(col, baseUv, mouseUv, topLineCount, topLineDistance, topWavePosition, 0.18, 0.85, true);
  }

  float alpha = clamp(max(max(col.r, col.g), col.b) * 1.45, 0.0, 1.0);
  fragColor = vec4(col, alpha);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

export type WavePosition = {
  x: number;
  y: number;
  rotate: number;
};

export type FloatingLinesProps = {
  linesGradient?: string[];
  enabledWaves?: Array<"top" | "middle" | "bottom">;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: CSSProperties["mixBlendMode"];
  opacity?: number;
};

function hexToVec3(hex: string): Vector3 {
  let value = hex.trim();
  if (value.startsWith("#")) value = value.slice(1);

  let r = 255;
  let g = 255;
  let b = 255;

  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }

  return new Vector3(r / 255, g / 255, b / 255);
}

export default function FloatingLines({
  linesGradient = ["#5E6B37", "#7E8E52", "#AEB784", "#D6D1AC"],
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [8, 14, 12],
  lineDistance = [7, 5, 6],
  topWavePosition = { x: 8.2, y: 1.15, rotate: -0.28 },
  middleWavePosition = { x: 4.8, y: 0.15, rotate: 0.18 },
  bottomWavePosition = { x: 1.4, y: -0.85, rotate: -0.18 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 4.8,
  bendStrength = -0.38,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.12,
  mixBlendMode = "multiply",
  opacity = 0.9,
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetMouseRef = useRef(new Vector2(-1000, -1000));
  const currentMouseRef = useRef(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef(0);
  const currentInfluenceRef = useRef(0);
  const targetParallaxRef = useRef(new Vector2(0, 0));
  const currentParallaxRef = useRef(new Vector2(0, 0));

  const getWaveValue = (source: number | number[], waveType: "top" | "middle" | "bottom", fallback: number) => {
    if (typeof source === "number") return source;
    const index = ["top", "middle", "bottom"].indexOf(waveType);
    return source[index] ?? fallback;
  };

  const topLineCount = enabledWaves.includes("top") ? getWaveValue(lineCount, "top", 8) : 0;
  const middleLineCount = enabledWaves.includes("middle") ? getWaveValue(lineCount, "middle", 14) : 0;
  const bottomLineCount = enabledWaves.includes("bottom") ? getWaveValue(lineCount, "bottom", 12) : 0;

  const topLineDistance = enabledWaves.includes("top") ? getWaveValue(lineDistance, "top", 7) * 0.01 : 0.01;
  const middleLineDistance = enabledWaves.includes("middle") ? getWaveValue(lineDistance, "middle", 5) * 0.01 : 0.01;
  const bottomLineDistance = enabledWaves.includes("bottom") ? getWaveValue(lineDistance, "bottom", 6) * 0.01 : 0.01;

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.opacity = String(opacity);
    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes("top") },
      enableMiddle: { value: enabledWaves.includes("middle") },
      enableBottom: { value: enabledWaves.includes("bottom") },
      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },
      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },
      topWavePosition: { value: new Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate) },
      middleWavePosition: { value: new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate) },
      bottomWavePosition: { value: new Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate) },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)) },
      lineGradientCount: { value: 0 },
    };

    const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
    uniforms.lineGradientCount.value = stops.length;
    stops.forEach((hex, i) => {
      const color = hexToVec3(hex);
      uniforms.lineGradient.value[i].set(color.x, color.y, color.z);
    });

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const setSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || 1;
      const height = containerRef.current.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };

    setSize();
    window.addEventListener("resize", setSize);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dpr = renderer.getPixelRatio();

      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1;

      if (parallax) {
        const offsetX = (x - rect.width / 2) / rect.width;
        const offsetY = -(y - rect.height / 2) / rect.height;
        targetParallaxRef.current.set(offsetX, offsetY);
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0;
      targetParallaxRef.current.set(0, 0);
    };

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    let raf = 0;
    const renderLoop = () => {
      uniforms.iTime.value = clock.getElapsedTime();

      if (interactive) {
        currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(currentMouseRef.current);
        currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
        uniforms.bendInfluence.value = currentInfluenceRef.current;
      }

      if (parallax) {
        currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
        uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [
    animationSpeed,
    bendRadius,
    bendStrength,
    bottomLineCount,
    bottomLineDistance,
    bottomWavePosition,
    enabledWaves,
    interactive,
    lineDistance,
    lineCount,
    linesGradient,
    middleLineCount,
    middleLineDistance,
    middleWavePosition,
    mixBlendMode,
    mouseDamping,
    opacity,
    parallax,
    parallaxStrength,
    topLineCount,
    topLineDistance,
    topWavePosition,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        mixBlendMode,
      }}
    />
  );
}

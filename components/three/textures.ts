import * as THREE from "three";

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A white form/document with lines, a photo box and a coloured stamp. */
export function docTexture(accent: string, stamp: "check" | "seal" = "check") {
  const [c, ctx] = canvas(512, 700);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 512, 700);
  // flag header
  ctx.fillStyle = "#E1261C"; ctx.fillRect(0, 0, 90, 26);
  ctx.fillStyle = "#00843D"; ctx.fillRect(90, 0, 422, 9);
  ctx.fillStyle = "#e9edf2"; ctx.fillRect(90, 9, 422, 8);
  ctx.fillStyle = "#111"; ctx.fillRect(90, 17, 422, 9);
  // title
  ctx.fillStyle = "#0B2E59";
  rr(ctx, 40, 60, 260, 26, 13); ctx.fill();
  ctx.fillStyle = "#c9d2df";
  rr(ctx, 40, 100, 180, 16, 8); ctx.fill();
  // photo box
  ctx.fillStyle = "#e8eef6"; rr(ctx, 360, 56, 112, 136, 12); ctx.fill();
  ctx.fillStyle = "#b8c6d8";
  ctx.beginPath(); ctx.arc(416, 106, 26, 0, Math.PI * 2); ctx.fill();
  rr(ctx, 380, 140, 72, 40, 20); ctx.fill();
  // lines
  for (let i = 0; i < 9; i++) {
    const y = 230 + i * 40;
    ctx.fillStyle = i % 3 === 0 ? "#9fb0c6" : "#dbe2ec";
    rr(ctx, 40, y, i % 3 === 0 ? 140 : 300 + ((i * 37) % 130), 14, 7); ctx.fill();
  }
  // stamp
  ctx.save();
  ctx.translate(370, 580);
  ctx.rotate(-0.25);
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.9;
  ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(0, 0, 54, 0, Math.PI * 2); ctx.stroke();
  if (stamp === "check") {
    ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(-28, 2); ctx.lineTo(-6, 24); ctx.lineTo(32, -20); ctx.stroke();
  } else {
    ctx.fillStyle = accent;
    ctx.font = "bold 26px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("APPROVED", 0, 0);
  }
  ctx.restore();
  // signature
  ctx.strokeStyle = "#0B2E59"; ctx.lineWidth = 4; ctx.globalAlpha = 0.8;
  ctx.beginPath(); ctx.moveTo(50, 620);
  ctx.bezierCurveTo(90, 560, 110, 660, 150, 600); ctx.bezierCurveTo(180, 560, 200, 640, 240, 610);
  ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Navy passport cover with a gold emblem. */
export function passportTexture() {
  const [c, ctx] = canvas(512, 700);
  const g = ctx.createLinearGradient(0, 0, 512, 700);
  g.addColorStop(0, "#123e74"); g.addColorStop(1, "#0a2547");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 700);
  ctx.strokeStyle = "#C9A23A"; ctx.fillStyle = "#C9A23A";
  ctx.lineWidth = 3; rr(ctx, 26, 26, 460, 648, 18); ctx.stroke();
  ctx.font = "600 34px sans-serif"; ctx.textAlign = "center";
  ctx.fillText("PASSPORT", 256, 130);
  ctx.font = "600 30px serif"; ctx.fillText("جواز سفر", 256, 180);
  // emblem
  ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(256, 380, 110, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(256, 380, 90, 0, Math.PI * 2); ctx.stroke();
  for (let i = 0; i < 8; i++) {
    ctx.save(); ctx.translate(256, 380); ctx.rotate((i * Math.PI) / 4);
    ctx.fillRect(-6, -70, 12, 40); ctx.restore();
  }
  ctx.beginPath(); ctx.arc(256, 380, 24, 0, Math.PI * 2); ctx.fill();
  // chip symbol
  ctx.lineWidth = 4; rr(ctx, 216, 560, 80, 54, 10); ctx.stroke();
  ctx.beginPath(); ctx.arc(256, 587, 14, 0, Math.PI * 2); ctx.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Emirates-ID-like card (generic, no real design). */
export function idCardTexture() {
  const [c, ctx] = canvas(640, 400);
  const g = ctx.createLinearGradient(0, 0, 640, 400);
  g.addColorStop(0, "#f4fbf7"); g.addColorStop(1, "#dff2e7");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 640, 400);
  ctx.fillStyle = "#00843D"; ctx.fillRect(0, 0, 640, 14);
  ctx.fillStyle = "#E1261C"; ctx.fillRect(0, 0, 24, 400);
  ctx.fillStyle = "#cfe3d8"; rr(ctx, 60, 70, 150, 190, 14); ctx.fill();
  ctx.fillStyle = "#9cc4ad"; ctx.beginPath(); ctx.arc(135, 140, 38, 0, Math.PI * 2); ctx.fill();
  rr(ctx, 85, 190, 100, 60, 30); ctx.fill();
  ctx.fillStyle = "#0B2E59"; rr(ctx, 240, 80, 240, 22, 11); ctx.fill();
  ctx.fillStyle = "#a9bccf";
  for (let i = 0; i < 4; i++) { rr(ctx, 240, 130 + i * 34, 330 - i * 40, 14, 7); ctx.fill(); }
  ctx.fillStyle = "#C9A23A"; rr(ctx, 520, 280, 70, 54, 10); ctx.fill();
  ctx.fillStyle = "#0B2E59";
  for (let i = 0; i < 22; i++) ctx.fillRect(60 + i * 18, 320, i % 3 ? 8 : 4, 40);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

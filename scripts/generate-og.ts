// scripts/generate-og.ts
import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PUBLIC = join(process.cwd(), 'public');
mkdirSync(PUBLIC, { recursive: true });

const MH_PATHS = `
  <path d="M0.5 11.5V2.5H1.974L3.8 6.362L5.626 2.5H7.1V11.5H5.7V5.619L3.8 9.639L1.9 5.619V11.5Z" fill="#fffdf6"/>
  <path d="M8.3 2.5H9.7V6.3H12.1V2.5H13.5V11.5H12.1V7.7H9.7V11.5H8.3Z" fill="#fffdf6"/>
`;

function markSvg(size: number): string {
  const r = Math.round(size * 0.12);
  const pad = Math.round(size * 0.18);
  const inner = size - pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${r}" fill="#14130f"/>
    <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 14 14" fill="none">
      ${MH_PATHS}
    </svg>
  </svg>`;
}

async function generateOg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#f6f3ec"/>
    <!-- MH mark 64x64 -->
    <rect x="80" y="200" width="64" height="64" rx="8" fill="#14130f"/>
    <svg x="95" y="215" width="34" height="34" viewBox="0 0 14 14" fill="none">
      ${MH_PATHS}
    </svg>
    <!-- Company name -->
    <text x="158" y="245" font-family="Georgia, serif" font-size="28" fill="#14130f" letter-spacing="-0.5">Metric House</text>
    <!-- Rule -->
    <line x1="80" y1="290" x2="520" y2="290" stroke="#d8d2bf" stroke-width="1"/>
    <!-- H1 line 1 -->
    <text x="80" y="360" font-family="Georgia, serif" font-size="64" fill="#14130f" letter-spacing="-2">Software for the</text>
    <!-- H1 line 2 -->
    <text x="80" y="440" font-family="Georgia, serif" font-size="64" fill="#14130f" letter-spacing="-2">way people </text>
    <text x="594" y="440" font-family="Georgia, serif" font-size="64" fill="#1a3d52" font-style="italic" letter-spacing="-2">actually</text>
    <!-- H1 line 3 -->
    <text x="80" y="520" font-family="Georgia, serif" font-size="64" fill="#14130f" letter-spacing="-2">want to work.</text>
    <!-- Domain label -->
    <text x="80" y="595" font-family="monospace" font-size="14" fill="#6b6657" letter-spacing="1.4">METRIC-HOUSE.COM</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC, 'og-image.png'));
  console.log('✓ og-image.png');
}

async function generateFavicons() {
  const faviconSvg = markSvg(32);
  writeFileSync(join(PUBLIC, 'favicon.svg'), markSvg(64));

  const png32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
  const ico = await toIco([png32]);
  writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
  console.log('✓ favicon.ico');

  const appleSvg = markSvg(180);
  await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(join(PUBLIC, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png (180×180)');
}

async function main() {
  await generateOg();
  await generateFavicons();
  console.log('All assets generated.');
}

main().catch((err) => { console.error(err); process.exit(1); });

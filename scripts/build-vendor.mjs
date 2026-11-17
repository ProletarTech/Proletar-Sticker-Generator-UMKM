import { copyFile, mkdir } from 'node:fs/promises';
import { build } from 'esbuild';

await mkdir('vendor', { recursive: true });

await build({
  entryPoints: ['src/pdfium-runtime.js'],
  bundle: true,
  format: 'iife',
  globalName: 'PdfiumRuntime',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  legalComments: 'none',
  outfile: 'vendor/pdfium-runtime.js',
});

await build({
  entryPoints: ['src/svgo-runtime.js'],
  bundle: true,
  format: 'iife',
  globalName: 'SvgoRuntime',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  legalComments: 'none',
  outfile: 'vendor/svgo-runtime.js',
});

await copyFile('node_modules/@hyzyla/pdfium/LICENSE.md', 'vendor/PDFIUM-LICENSE.md');
await copyFile('node_modules/svgo/LICENSE', 'vendor/SVGO-LICENSE');

# Proletar Sticker Studio

The repository root is the complete static web app/PWA. [index.html](./index.html) is the single app entry point; its icons, manifest, service worker, and supporting pages are alongside it.

The GitHub Pages workflow publishes the repository root. Open the published site over HTTPS to install the PWA and use its offline support. The app can also be opened locally, but service workers require HTTPS or localhost.

`Studio Warna.html` is the standalone Color Studio page. `Proletar Tech · Invoice.html` is available as a standalone page and from inside the main app.

`CLASSIC-BASELINE-SHA256.txt` records hashes for the preserved historical baseline; the current app files are maintained at the repository root.

## PDFium and SVGO

The Sticker Sheet accepts PDF imports through PDFium. Each PDF page is rendered locally as a PNG artwork image, with page size capped to keep memory use bounded. Generated PDFs continue to use jsPDF, which creates the app's print-ready layouts; the export dialog also offers a PDFium page preview.

SVGO optimizes SVG files when they are downloaded, including SVGs inside the synchronized SVG ZIP. Layer IDs, dimensions, and viewBox values are preserved for print and cutting workflows.

The browser-ready runtime bundles are stored under `vendor/` so the app does not depend on a third-party CDN. Build them after installing the locked npm dependencies with `npm ci` and `npm run build:vendor`. The smaller SVGO bundle is cached for offline use; the larger PDFium bundle is loaded on demand and cached after it has loaded once.

## Export size and print fidelity

SVG sheet and Hybrid exports embed each eligible raster artwork once and reuse it with SVG `<use>` references (including the SVG 1.1 `xlink:href` form). For importers that do not handle `<use>`, use the existing CorelDRAW lightweight SVG export; its sheet artwork is raster while registration marks and cut contours stay vector.

The SVG optimizer is limited to comments, metadata, titles, descriptions, and empty attributes. It does not rewrite IDs, viewBox, paths, shapes, transforms, or embedded image data. Cut contours and registration marks remain vector, with their existing 0.001 mm output precision. Higher precision is retained for artwork clipping when rounding changed rasterized pixels.

RGB PDF keeps eligible source PNG/JPEG artwork at its original resolution and reuses image aliases. CMYK conversion yields between bounded pixel chunks while retaining the existing per-pixel conversion values and selected DPI.

The experimental RGB PDF exports can create a full sheet, artwork only, vector contours + registration marks only, or a full sheet with each raster background fill baked into its reusable image. Eligible untouched PNG artwork above 4000 PPI is downsampled using browser high-quality resampling; this is not pixel-lossless because it changes PNG pixels. The baked-fill experiment may produce a larger or smaller PDF. Source images and regular PDF exports are unchanged. Artwork-only omits contours and marks; contours-only omits all artwork.

Images uploaded directly to Sticker Sheet are not vectorized automatically. Vectorize (SVG) results sent to Sticker Sheet retain their completed paths and matching trace settings, so PDF export reuses them instead of tracing the SVG again. If settings changed before sending, Vectorize updates the trace before transfer.

Long PDF/SVG render and export tasks, vectorize image preparation, Cut Image PNG creation, background removal, and upscaling can be canceled while processing. Cancellation is checked between rendering cells or pixel chunks; an in-progress synchronous canvas draw, image encode, or PDF image-compression call must finish first. Canceled work is not offered as a completed output.

## License

See [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md). Third-party libraries retain their own licenses.

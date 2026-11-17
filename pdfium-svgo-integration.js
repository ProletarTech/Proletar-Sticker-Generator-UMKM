(() => {
  const artworkInput = document.querySelector('#file[accept*=".svgz"]');
  const status = document.getElementById('status');
  const downloadStatus = document.getElementById('dlstatus');
  let pdfiumLibraryPromise;
  let svgoPromise;

  if (!artworkInput || typeof artworkInput.onchange !== 'function') {
    console.error('PDFium/SVGO integration could not find the sticker artwork input.');
    return;
  }

  function messageOf(error) {
    return error && error.message ? error.message : String(error);
  }

  function loadClassicScript(path, globalName) {
    if (window[globalName]) return Promise.resolve(window[globalName]);

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL(path, document.baseURI).href;
      script.onload = () => {
        if (window[globalName]) resolve(window[globalName]);
        else reject(new Error(`${globalName} did not initialize.`));
      };
      script.onerror = () => reject(new Error(`Could not load ${path}.`));
      document.head.appendChild(script);
    });
  }

  function getPdfiumLibrary() {
    if (!pdfiumLibraryPromise) {
      pdfiumLibraryPromise = loadClassicScript('./vendor/pdfium-runtime.js', 'PdfiumRuntime')
        .then(runtime => {
          if (!runtime.PDFiumLibrary) throw new Error('The PDFium library is unavailable.');
          return runtime.PDFiumLibrary.init({ disableBase64Warning: true });
        })
        .catch(error => {
          pdfiumLibraryPromise = null;
          throw error;
        });
    }
    return pdfiumLibraryPromise;
  }

  function getSvgo() {
    if (!svgoPromise) {
      svgoPromise = loadClassicScript('./vendor/svgo-runtime.js', 'SvgoRuntime')
        .then(runtime => {
          if (typeof runtime.optimize !== 'function') throw new Error('The SVGO optimizer is unavailable.');
          return runtime.optimize;
        })
        .catch(error => {
          svgoPromise = null;
          throw error;
        });
    }
    return svgoPromise;
  }

  async function optimizeSvgBlob(name, blob) {
    if (!/\.svg$/i.test(String(name)) || !(blob instanceof Blob)) return blob;

    const optimize = await getSvgo();
    const result = optimize(await blob.text(), {
      multipass: true,
      // Hapus hanya data nonvisual; plugin geometri dan ID tidak dijalankan.
      plugins: ['removeComments', 'removeMetadata', 'removeTitle', 'removeDesc', 'removeEmptyAttrs'],
    });
    if (!result || typeof result.data !== 'string' || !result.data.includes('<svg')) {
      throw new Error('SVGO did not return a valid SVG document.');
    }
    return new Blob([result.data], { type: blob.type || 'image/svg+xml' });
  }

  function reportExportError(error) {
    const text = `SVG optimization failed: ${messageOf(error)}`;
    if (downloadStatus) downloadStatus.textContent = text;
    console.error(text, error);
  }

  async function optimizeSvgForExport(name, blob) {
    try {
      return await optimizeSvgBlob(name, blob);
    } catch (error) {
      reportExportError(error);
      throw error;
    }
  }

  function addPdfPreviewButton(name, blob, host) {
    const buttonId = host && host.id === 'done' ? 'pdfium-done-preview' : 'pdfium-export-preview';
    let button = document.getElementById(buttonId);
    if (!button) {
      button = document.createElement('button');
      button.id = buttonId;
      button.type = 'button';
      button.className = 'p o';
      button.textContent = 'Preview PDF with PDFium';
      if (host && host.id === 'done') {
        const buttons = host.querySelector('.btns');
        const closeButton = host.querySelector('#done-x');
        if (buttons) buttons.insertBefore(button, closeButton || null);
      } else if (downloadStatus && downloadStatus.parentNode) {
        downloadStatus.parentNode.insertBefore(button, downloadStatus.nextSibling);
      }
    }
    button.hidden = false;
    button.onclick = () => openPdfPreview(name, blob);
  }

  const originalSaveFile = window.saveFile;
  if (typeof originalSaveFile === 'function') {
    window.saveFile = async function (name, blob) {
      if (/\.svg$/i.test(String(name))) blob = await optimizeSvgForExport(name, blob);
      const result = await originalSaveFile.call(this, name, blob);
      if (/\.pdf$/i.test(String(name))) addPdfPreviewButton(name, blob, document.getElementById('done'));
      return result;
    };
  }

  const originalSaveDirectFile = window.saveDirectFile;
  if (typeof originalSaveDirectFile === 'function') {
    window.saveDirectFile = async function (name, blob, targetStatus) {
      if (/\.svg$/i.test(String(name))) blob = await optimizeSvgForExport(name, blob);
      const result = await originalSaveDirectFile.call(this, name, blob, targetStatus);
      if (/\.pdf$/i.test(String(name))) addPdfPreviewButton(name, blob, null);
      return result;
    };
  }

  const originalCreateStoredZip = window.createStoredZip;
  if (typeof originalCreateStoredZip === 'function') {
    window.createStoredZip = async function (entries, ...args) {
      const optimizedEntries = await Promise.all(entries.map(async entry => {
        if (!entry || !/\.svg$/i.test(String(entry.name))) return entry;
        return { ...entry, blob: await optimizeSvgForExport(entry.name, entry.blob) };
      }));
      return originalCreateStoredZip.call(this, optimizedEntries, ...args);
    };
  }

  function renderCanvas(canvas, image) {
    const width = image.width;
    const height = image.height;
    const pixels = new Uint8ClampedArray(image.data);
    if (pixels.length !== width * height * 4) {
      throw new Error('PDFium returned an invalid page bitmap.');
    }
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Canvas rendering is unavailable.');
    canvas.width = width;
    canvas.height = height;
    context.putImageData(new ImageData(pixels, width, height), 0, 0);
  }

  function previewScale(width, height, maxSide, maxPixels, maxScale) {
    return Math.min(maxScale, maxSide / Math.max(width, height), Math.sqrt(maxPixels / (width * height)));
  }

  async function openPdfPreview(name, blob) {
    const dialog = document.createElement('dialog');
    dialog.style.cssText = 'max-width:96vw;max-height:96vh;width:1000px;padding:16px;border:0;border-radius:12px;box-shadow:0 12px 48px #0008';
    dialog.innerHTML = '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><strong class="pdfium-title"></strong><button type="button" class="p o pdfium-prev">Previous</button><span class="pdfium-page" role="status"></span><button type="button" class="p o pdfium-next">Next</button><button type="button" class="p o pdfium-close">Close</button></div><p class="pdfium-status" role="status"></p><canvas style="display:block;max-width:100%;max-height:72vh;margin:12px auto;object-fit:contain"></canvas>';
    dialog.querySelector('.pdfium-title').textContent = name;
    document.body.appendChild(dialog);

    let pdfDocument = null;
    let pageIndex = 0;
    let pageCount = 0;
    const canvas = dialog.querySelector('canvas');
    const info = dialog.querySelector('.pdfium-status');
    const counter = dialog.querySelector('.pdfium-page');
    const previous = dialog.querySelector('.pdfium-prev');
    const next = dialog.querySelector('.pdfium-next');
    const close = () => dialog.close();

    async function drawPage() {
      previous.disabled = true;
      next.disabled = true;
      info.textContent = `Rendering page ${pageIndex + 1} of ${pageCount} with PDFium...`;
      let page;
      try {
        page = pdfDocument.getPage(pageIndex);
        const size = page.getOriginalSize();
        const scale = previewScale(size.originalWidth, size.originalHeight, 1600, 2_000_000, 2);
        const image = await page.render({ scale, colorSpace: 'RGBA' });
        renderCanvas(canvas, image);
        counter.textContent = `${pageIndex + 1} / ${pageCount}`;
        info.textContent = 'Rendered locally with PDFium.';
      } catch (error) {
        info.textContent = `Could not render this PDF page: ${messageOf(error)}`;
        console.error('PDFium preview failed:', error);
      } finally {
        if (page) page.close();
        previous.disabled = pageIndex <= 0;
        next.disabled = pageIndex >= pageCount - 1;
      }
    }

    previous.addEventListener('click', async () => {
      if (pageIndex > 0) {
        pageIndex--;
        await drawPage();
      }
    });
    next.addEventListener('click', async () => {
      if (pageIndex < pageCount - 1) {
        pageIndex++;
        await drawPage();
      }
    });
    dialog.querySelector('.pdfium-close').addEventListener('click', close);
    dialog.addEventListener('close', () => {
      if (pdfDocument) pdfDocument.destroy();
      dialog.remove();
    }, { once: true });

    try {
      dialog.showModal();
      info.textContent = 'Loading PDF with PDFium...';
      const library = await getPdfiumLibrary();
      pdfDocument = await library.loadDocument(new Uint8Array(await blob.arrayBuffer()));
      pageCount = pdfDocument.getPageCount();
      if (!pageCount) throw new Error('The PDF has no pages.');
      await drawPage();
    } catch (error) {
      info.textContent = `Could not open this PDF with PDFium: ${messageOf(error)}`;
      console.error('PDFium preview failed:', error);
    }
  }

  const pdfInput = document.createElement('input');
  pdfInput.type = 'file';
  pdfInput.accept = 'application/pdf,.pdf';
  pdfInput.multiple = true;
  pdfInput.hidden = true;
  pdfInput.setAttribute('aria-label', 'Choose PDF files to import');
  document.body.appendChild(pdfInput);

  const importRow = document.createElement('div');
  importRow.className = 'btns';
  importRow.style.marginTop = '8px';
  const importButton = document.createElement('button');
  importButton.type = 'button';
  importButton.className = 'p o';
  importButton.textContent = 'Import PDF pages (PDFium)';
  const importNote = document.createElement('small');
  importNote.textContent = 'PDF pages become PNG artwork; PDFium previews PDFs and SVGO optimizes SVG exports on this device.';
  importRow.append(importButton, importNote);
  artworkInput.parentNode.insertBefore(importRow, artworkInput.nextSibling);

  importButton.addEventListener('click', () => pdfInput.click());
  pdfInput.addEventListener('change', async () => {
    const files = [...pdfInput.files];
    pdfInput.value = '';
    if (!files.length) return;

    importButton.disabled = true;
    if (status) status.textContent = 'Loading PDFium engine...';
    let importedPages = 0;
    const errors = [];
    try {
      const library = await getPdfiumLibrary();
      for (const file of files) {
        let pdfDocument;
        try {
          pdfDocument = await library.loadDocument(new Uint8Array(await file.arrayBuffer()));
          const pageCount = pdfDocument.getPageCount();
          if (!pageCount) throw new Error('The PDF has no pages.');
          for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
            if (status) status.textContent = `Importing ${file.name}: page ${pageIndex + 1} of ${pageCount}...`;
            let page;
            let canvas;
            try {
              page = pdfDocument.getPage(pageIndex);
              const size = page.getOriginalSize();
              const scale = previewScale(size.originalWidth, size.originalHeight, 4096, 12_000_000, 4);
              const image = await page.render({ scale, colorSpace: 'RGBA' });
              canvas = document.createElement('canvas');
              renderCanvas(canvas, image);
              const png = await new Promise((resolve, reject) => {
                canvas.toBlob(result => result ? resolve(result) : reject(new Error('Could not encode a PDF page as PNG.')), 'image/png');
              });
              const baseName = file.name.replace(/\.pdf$/i, '') || 'pdf';
              const pageFile = new File([png], `${baseName}-page-${pageIndex + 1}.png`, { type: 'image/png' });
              const handler = artworkInput.onchange;
              if (typeof handler !== 'function') throw new Error('The artwork upload handler is unavailable.');
              await handler.call(artworkInput, { target: { files: [pageFile], value: '' } });
              importedPages++;
            } finally {
              if (page) page.close();
              if (canvas) {
                canvas.width = 0;
                canvas.height = 0;
              }
            }
          }
        } catch (error) {
          errors.push(`${file.name}: ${messageOf(error)}`);
        } finally {
          if (pdfDocument) pdfDocument.destroy();
        }
      }
    } catch (error) {
      errors.push(messageOf(error));
    } finally {
      importButton.disabled = false;
    }

    if (status) {
      status.textContent = [
        importedPages ? `Imported ${importedPages} PDF page(s) as artwork.` : '',
        errors.length ? `Failed: ${errors.join(' ')}` : '',
      ].filter(Boolean).join(' ') || 'No PDF pages were imported.';
    }
  });
})();

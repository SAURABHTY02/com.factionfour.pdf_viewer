const pdfjsLib = require('./pdf');
//  const PDFJSWorker = require('pdfjs-dist/build/pdf.worker.js')
 pdfjsLib.GlobalWorkerOptions.workerSrc = './worker.js';
 // 'pdfjs-dist/build/pdf.worker.js';



const view_pdf = async (htmlElement, file) => {
  console.log(htmlElement, "node modules", file)

  const buffer = await file.arrayBuffer();
  let byteArray = new Int8Array(buffer);
  console.log("after node modules", byteArray)
  //const pdfData = await fetch(url).then(response => response.arrayBuffer());
  const pdf = await pdfjsLib.getDocument(byteArray).promise;
  const page = await pdf.getPage(1);

  const canvas = htmlElement.current;
  const context = canvas.getContext('2d');
  const viewport = page.getViewport({ scale: 1 });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: context,
    viewport: viewport
  });

};

module.exports = {
  view_pdf
}
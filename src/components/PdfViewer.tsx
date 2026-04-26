"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Required for pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PdfViewerProps = {
  url: string;
};

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({
    numPages,
  }: {
    numPages: number;
  }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-auto p-4">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("PDF load error:", error)}
        loading={<p>Loading PDF...</p>}
      >
        <Page
          pageNumber={pageNumber}
          width={700}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      {numPages > 0 && (
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 rounded-lg border"
          >
            Prev
          </button>

          <p>
            Page {pageNumber} of {numPages}
          </p>

          <button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
            disabled={pageNumber >= numPages}
            className="px-4 py-2 rounded-lg border"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
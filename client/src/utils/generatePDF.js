import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (paperElement) => {
  if (!paperElement) {
    throw new Error("Question paper content was not found");
  }

  const clone = paperElement.cloneNode(true);
  clone.querySelectorAll(".no-print").forEach((element) => element.remove());
  clone.querySelectorAll("input, textarea, select").forEach((field) => {
    const value = field.value || field.getAttribute("value") || "";
    const text = document.createElement("span");
    text.textContent = value;
    text.style.cssText = field.style.cssText;
    text.style.display = "inline-block";
    text.style.minHeight = "1em";
    field.replaceWith(text);
  });

  clone.style.width = `${paperElement.getBoundingClientRect().width}px`;
  clone.style.maxWidth = "none";
  clone.style.margin = "0";
  clone.style.padding = "0";
  clone.style.border = "none";
  clone.style.background = "#ffffff";
  clone.style.position = "absolute";
  clone.style.left = "0";
  clone.style.top = "0";
  clone.style.zIndex = "1";
  clone.style.pointerEvents = "none";
  document.body.appendChild(clone);

  const partC = clone.querySelector(".page-4");
  if (partC) {
    const cloneTop = clone.getBoundingClientRect().top;
    const partCTop = partC.getBoundingClientRect().top - cloneTop;
    const pageHeightInCssPixels = clone.offsetWidth * (277 / 190);
    const nextPageTop = Math.ceil((partCTop + 1) / pageHeightInCssPixels) * pageHeightInCssPixels;
    const spacer = document.createElement("div");
    spacer.style.height = `${Math.max(0, nextPageTop - partCTop)}px`;
    spacer.setAttribute("aria-hidden", "true");
    partC.parentNode.insertBefore(spacer, partC);
  }

  try {
    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: clone.offsetWidth,
    });
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;
    const pagePixelHeight = Math.floor((canvas.width * contentHeight) / contentWidth);

    for (let offset = 0, pageIndex = 0; offset < canvas.height; offset += pagePixelHeight, pageIndex += 1) {
      if (pageIndex > 0) pdf.addPage();

      const sliceHeight = Math.min(pagePixelHeight, canvas.height - offset);
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeight;
      pageCanvas.getContext("2d").drawImage(
        canvas,
        0,
        offset,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight
      );

      pdf.addImage(
        pageCanvas.toDataURL("image/png"),
        "PNG",
        margin,
        margin,
        contentWidth,
        (sliceHeight * contentWidth) / canvas.width
      );
    }

    pdf.save("Question_Paper.pdf");
  } finally {
    clone.remove();
  }
};
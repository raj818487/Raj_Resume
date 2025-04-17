document.addEventListener("DOMContentLoaded", function () {
  if (!window.html2canvas) {
    console.error("html2canvas library not loaded");
    return;
  }

  async function downloadPDF() {
    try {
      if (!window.jspdf) {
        throw new Error("jsPDF library not loaded");
      }

      const { jsPDF } = window.jspdf;
      const resume = document.getElementById("resume");

      if (!resume) {
        throw new Error("Resume element not found");
      }

      const canvas = await html2canvas(resume, {
        scale: 4,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: resume.scrollWidth,
        height: resume.scrollHeight,
        windowWidth: resume.scrollWidth,
        windowHeight: resume.scrollHeight,
        imageTimeout: 0,
        removeContainer: true,
        letterRendering: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF(imgHeight > pdfHeight ? "p" : "l", "mm", [
        pdfWidth,
        Math.max(pdfHeight, imgHeight),
      ]);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was a problem generating the PDF: " + error.message);
    }
  }

  async function downloadJPEG() {
    try {
      const resume = document.getElementById("resume");

      if (!resume) {
        throw new Error("Resume element not found");
      }

      const canvas = await html2canvas(resume, {
        scale: 4,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: resume.scrollWidth,
        height: resume.scrollHeight,
        windowWidth: resume.scrollWidth,
        windowHeight: resume.scrollHeight,
        imageTimeout: 0,
        removeContainer: true,
        letterRendering: true,
      });

      if (!canvas) {
        throw new Error("Failed to create canvas");
      }

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "resume.jpeg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating JPEG:", error);
      alert("There was a problem generating the JPEG: " + error.message);
    }
  }

  // Expose functions to window object for button onclick events
  window.downloadPDF = downloadPDF;
  window.downloadJPEG = downloadJPEG;
});

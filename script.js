document.addEventListener("DOMContentLoaded", function () {
  if (!window.html2canvas) {
    console.error("html2canvas library not loaded");
    return;
  }

  const { jsPDF } = window.jspdf;

  // Show loading indicator
  function showLoading() {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading-indicator";
    loadingDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 5px;
      z-index: 9999;
    `;
    loadingDiv.textContent = "Generating document...";
    document.body.appendChild(loadingDiv);
  }

  // Hide loading indicator
  function hideLoading() {
    const loadingDiv = document.getElementById("loading-indicator");
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  async function downloadPDF() {
    try {
      showLoading();

      if (!window.jspdf) {
        throw new Error("jsPDF library not loaded");
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm

      // Get the single page resume content
      const resumeContent = document.getElementById("resume-content");
      const canvas = await html2canvas(resumeContent, {
        scale: 4,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        width: resumeContent.scrollWidth,
        height: resumeContent.scrollHeight,
      });

      // Fit to A4 page size while maintaining aspect ratio
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      
      // If height exceeds A4 page, scale to fit
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      if (imgHeight > pageHeight) {
        finalHeight = pageHeight;
        finalWidth = (canvas.width * pageHeight) / canvas.height;
      }

      const imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, "PNG", 0, 0, finalWidth, finalHeight);

      // Save PDF
      pdf.save("Parmar_Raj_Resume.pdf");
      hideLoading();
    } catch (error) {
      console.error("Error generating PDF:", error);
      hideLoading();
      alert("There was a problem generating the PDF: " + error.message);
    }
  }

  async function downloadJPEG() {
    try {
      showLoading();

      const resumeContent = document.getElementById("resume-content");

      // Generate JPEG
      const canvas = await html2canvas(resumeContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        width: resumeContent.scrollWidth,
        height: resumeContent.scrollHeight,
      });

      // Create download link
      const link = document.createElement("a");
      link.download = "Parmar_Raj_Resume.jpg";
      link.href = canvas.toDataURL("image/jpeg", 1.0);

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      hideLoading();
    } catch (error) {
      console.error("Error generating JPEG:", error);
      hideLoading();
      alert("There was a problem generating the JPEG: " + error.message);
    }
  }

  // Add click event listeners to buttons
  document
    .getElementById("download-pdf-btn")
    .addEventListener("click", downloadPDF);
  document
    .getElementById("download-jpeg-btn")
    .addEventListener("click", downloadJPEG);
});

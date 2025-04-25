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

      // First page
      const page1 = document.getElementById("resume-page1");
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page1");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      // Calculate the aspect ratio to maintain A4 proportions
      const imgWidth = pageWidth;
      const imgHeight = (canvas1.height * imgWidth) / canvas1.width;

      const imgData1 = canvas1.toDataURL("image/png", 1.0);
      pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight);

      // Second page
      const page2 = document.getElementById("resume-page2");
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page2");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      const imgData2 = canvas2.toDataURL("image/png", 1.0);
      pdf.addPage();
      pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight);

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

      const page1 = document.getElementById("resume-page1");
      const page2 = document.getElementById("resume-page2");
      const pageWidth = 210; // A4 width in mm

      // Generate first page JPEG
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page1");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      // Generate second page JPEG
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page2");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      // Create download links for both pages
      const link1 = document.createElement("a");
      link1.download = "Parmar_Raj_Resume_Page1.jpg";
      link1.href = canvas1.toDataURL("image/jpeg", 1.0);

      const link2 = document.createElement("a");
      link2.download = "Parmar_Raj_Resume_Page2.jpg";
      link2.href = canvas2.toDataURL("image/jpeg", 1.0);

      // Trigger downloads
      document.body.appendChild(link1);
      link1.click();
      document.body.removeChild(link1);

      // Small delay between downloads
      setTimeout(() => {
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
        hideLoading();
      }, 500);
    } catch (error) {
      console.error("Error generating JPEG:", error);
      hideLoading();
      alert("There was a problem generating the JPEG: " + error.message);
    }
  }

  // Add click event listeners to buttons
  document
    .querySelector('.download-btn[onclick="downloadPDF()"]')
    .addEventListener("click", downloadPDF);
  document
    .querySelector('.download-btn[onclick="downloadJPEG()"]')
    .addEventListener("click", downloadJPEG);
});
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

      // First page
      const page1 = document.getElementById("resume-page1");
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page1");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      // Calculate the aspect ratio to maintain A4 proportions
      const imgWidth = pageWidth;
      const imgHeight = (canvas1.height * imgWidth) / canvas1.width;

      const imgData1 = canvas1.toDataURL("image/png", 1.0);
      pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight);

      // Second page
      const page2 = document.getElementById("resume-page2");
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page2");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      const imgData2 = canvas2.toDataURL("image/png", 1.0);
      pdf.addPage();
      pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight);

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

      const page1 = document.getElementById("resume-page1");
      const page2 = document.getElementById("resume-page2");
      const pageWidth = 210; // A4 width in mm

      // Generate first page JPEG
      const canvas1 = await html2canvas(page1, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page1");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      // Generate second page JPEG
      const canvas2 = await html2canvas(page2, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById("resume-page2");
          container.style.height = "auto";
          container.style.overflow = "visible";
          container.style.position = "relative";
        },
      });

      // Create download links for both pages
      const link1 = document.createElement("a");
      link1.download = "Parmar_Raj_Resume_Page1.jpg";
      link1.href = canvas1.toDataURL("image/jpeg", 1.0);

      const link2 = document.createElement("a");
      link2.download = "Parmar_Raj_Resume_Page2.jpg";
      link2.href = canvas2.toDataURL("image/jpeg", 1.0);

      // Trigger downloads
      document.body.appendChild(link1);
      link1.click();
      document.body.removeChild(link1);

      // Small delay between downloads
      setTimeout(() => {
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
        hideLoading();
      }, 500);
    } catch (error) {
      console.error("Error generating JPEG:", error);
      hideLoading();
      alert("There was a problem generating the JPEG: " + error.message);
    }
  }

  // Add click event listeners to buttons
  document
    .querySelector('.download-btn[onclick="downloadPDF()"]')
    .addEventListener("click", downloadPDF);
  document
    .querySelector('.download-btn[onclick="downloadJPEG()"]')
    .addEventListener("click", downloadJPEG);
});

import PDFDocument from "pdfkit";

// Generates a PDF for the "Propuesta de Acercamiento Inicial" — a first-touch
// document sent directly from a lead in the CRM, deliberately WITHOUT any
// pricing. It mirrors the visual language of the commercial quote PDF
// (lib/quotePdf.ts) so both documents feel like the same brand, but carries
// only the admin's free-text message plus optional reference links.

export interface ApproachPdfData {
  leadName: string;
  company?: string;
  createdAt: string;
  message: string;
  links: { label: string; url: string }[];
}

const COLORS = {
  primary: "#0F172A",
  gray: "#64748B",
  lightGray: "#94A3B8",
  border: "#E2E8F0",
  panelBg: "#F8FAFC",
  accent: "#7B5CFF",
};

export function generateApproachPdfBuffer(data: ApproachPdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const left = doc.page.margins.left;

    // ── Header ──────────────────────────────────────────────
    doc.font("Helvetica-Bold").fontSize(22).fillColor(COLORS.primary).text("SynFlow IA", left, 50);
    doc.font("Helvetica").fontSize(9).fillColor(COLORS.gray)
      .text("Inteligencia Artificial y Automatización de Procesos", left, 77);
    doc.fontSize(8).fillColor(COLORS.lightGray).text("Medellín, Colombia", left, 90);

    const rightColWidth = 220;
    const rightX = left + pageWidth - rightColWidth;
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray)
      .text("ACERCAMIENTO INICIAL", rightX, 50, { width: rightColWidth, align: "right" });
    doc.font("Helvetica").fontSize(8).fillColor(COLORS.gray)
      .text(`Fecha: ${new Date(data.createdAt).toLocaleDateString("es-CO")}`, rightX, 66, { width: rightColWidth, align: "right" });

    doc.moveTo(left, 112).lineTo(left + pageWidth, 112).strokeColor(COLORS.border).stroke();

    // ── Addressee box ────────────────────────────────────────
    let y = 130;
    doc.rect(left, y, pageWidth, 54).fillAndStroke(COLORS.panelBg, COLORS.border);
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray).text("DIRIGIDO A:", left + 18, y + 14);
    doc.font("Helvetica-Bold").fontSize(12).fillColor(COLORS.primary)
      .text(data.company ? `${data.leadName} — ${data.company}` : data.leadName, left + 18, y + 27);

    y += 74;

    // ── Title + message body ────────────────────────────────
    doc.font("Helvetica-Bold").fontSize(16).fillColor(COLORS.primary)
      .text("Propuesta de Acercamiento Inicial", left, y);
    y += 30;

    doc.font("Helvetica").fontSize(10).fillColor(COLORS.gray)
      .text(data.message, left, y, { width: pageWidth, lineGap: 3 });
    y += doc.heightOfString(data.message, { width: pageWidth, lineGap: 3 }) + 30;

    // ── Links (clickable) ───────────────────────────────────
    if (data.links.length > 0) {
      doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray).text("ENLACES DE REFERENCIA", left, y);
      y += 16;

      for (const link of data.links) {
        const linkLabel = link.label.trim() || link.url;
        doc.rect(left, y, pageWidth, 32).fillAndStroke(COLORS.panelBg, COLORS.border);
        doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.accent);
        const textY = y + 11;
        doc.text(linkLabel, left + 15, textY, { width: pageWidth - 30, underline: true });
        doc.link(left + 15, textY, doc.widthOfString(linkLabel), 13, link.url);
        y += 40;
      }
      y += 10;
    }

    // ── Footer ───────────────────────────────────────────────
    const footerY = doc.page.height - doc.page.margins.bottom - 40;
    doc.moveTo(left, footerY).lineTo(left + pageWidth, footerY).strokeColor(COLORS.border).stroke();
    doc.font("Helvetica").fontSize(7).fillColor(COLORS.lightGray)
      .text("SynFlow IA • Transformando negocios con soluciones avanzadas de Inteligencia Artificial.", left, footerY + 10, { width: pageWidth, align: "center" });
    doc.text(`Este es un acercamiento inicial, sin compromiso comercial. © ${new Date().getFullYear()} SynFlow IA.`, left, footerY + 22, { width: pageWidth, align: "center" });

    doc.end();
  });
}

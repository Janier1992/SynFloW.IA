import PDFDocument from "pdfkit";

// Generates a PDF that mirrors the "Presupuesto Comercial" invoice view
// shown in the Admin Portal (components/ui/AdminPortal.tsx preview modal),
// so the client receives, as an email attachment, the same document seen
// by the SynFlow IA team in the CRM.

export interface QuotePdfData {
  id: string;
  createdAt: string;
  client: string;
  services: string;
  hoursEngineering: number;
  hoursArchitecture: number;
  hoursDevelopment: number;
  rateEngineering: number;
  rateArchitecture: number;
  rateDevelopment: number;
  subtotal: number;
  tax: number;
  total: number;
  paymentType?: "unico" | "diferido";
  installments?: number;
  downPayment?: number;
  installmentAmount?: number;
}

const formatCOP = (val: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(val);

const COLORS = {
  primary: "#0F172A",
  gray: "#64748B",
  lightGray: "#94A3B8",
  border: "#E2E8F0",
  panelBg: "#F8FAFC",
  tableHeaderBg: "#F1F5F9",
  green: "#166534",
  greenBg: "#F0FDF4",
  greenBorder: "#BBF7D0",
};

export function generateQuotePdfBuffer(data: QuotePdfData): Promise<Buffer> {
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
      .text("PRESUPUESTO", rightX, 50, { width: rightColWidth, align: "right" });
    doc.font("Helvetica-Bold").fontSize(11).fillColor(COLORS.primary)
      .text(`#${data.id.toUpperCase()}`, rightX, 64, { width: rightColWidth, align: "right" });
    doc.font("Helvetica").fontSize(8).fillColor(COLORS.gray)
      .text(`Fecha: ${new Date(data.createdAt).toLocaleDateString("es-CO")}`, rightX, 80, { width: rightColWidth, align: "right" });

    doc.moveTo(left, 112).lineTo(left + pageWidth, 112).strokeColor(COLORS.border).stroke();

    // ── Client / commercial condition box ──────────────────
    let y = 130;
    doc.rect(left, y, pageWidth, 68).fillAndStroke(COLORS.panelBg, COLORS.border);
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray).text("DIRIGIDO A:", left + 18, y + 14);
    doc.font("Helvetica-Bold").fontSize(12).fillColor(COLORS.primary).text(data.client, left + 18, y + 27);
    doc.font("Helvetica").fontSize(8).fillColor(COLORS.gray).text("Cliente Asociado / Partner Comercial", left + 18, y + 44);

    const col2X = left + pageWidth / 2 + 10;
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray).text("CONDICIÓN COMERCIAL:", col2X, y + 14);
    doc.font("Helvetica").fontSize(9).fillColor(COLORS.gray).text("Tarifa Horaria Estimada", col2X, y + 27);
    doc.font("Helvetica").fontSize(8).fillColor(COLORS.lightGray).text("Vigencia del presupuesto: 30 días", col2X, y + 44);

    y += 88;

    // ── Services included ───────────────────────────────────
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray).text("SERVICIOS INCLUIDOS", left, y);
    y += 14;
    doc.font("Helvetica-Bold").fontSize(10);
    const servicesBoxHeight = Math.max(30, doc.heightOfString(data.services, { width: pageWidth - 30 }) + 20);
    doc.rect(left, y, pageWidth, servicesBoxHeight).fillAndStroke(COLORS.panelBg, COLORS.border);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.primary)
      .text(data.services, left + 15, y + 10, { width: pageWidth - 30 });
    y += servicesBoxHeight + 20;

    // ── Breakdown table ──────────────────────────────────────
    const cols = [
      { label: "Concepto Profesional", width: pageWidth * 0.42 },
      { label: "Horas", width: pageWidth * 0.14, align: "center" as const },
      { label: "Tarifa / Hora", width: pageWidth * 0.22, align: "right" as const },
      { label: "Subtotal", width: pageWidth * 0.22, align: "right" as const },
    ];

    doc.rect(left, y, pageWidth, 24).fill(COLORS.tableHeaderBg);
    let x = left;
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.gray);
    for (const c of cols) {
      doc.text(c.label, x + 10, y + 8, { width: c.width - 15, align: c.align || "left" });
      x += c.width;
    }
    y += 24;

    const rows = [
      {
        concept: "Ingeniería de Datos",
        sub: "Implementación ETL, modelado semántico y LLMs",
        hours: data.hoursEngineering,
        rate: data.rateEngineering,
      },
      {
        concept: "Arquitectura UX / UI",
        sub: "Diseño interactivo de flujos y pantallas del sistema",
        hours: data.hoursArchitecture,
        rate: data.rateArchitecture,
      },
      {
        concept: "Desarrollo de Software",
        sub: "Despliegue de código Next.js, API e integración de APIs",
        hours: data.hoursDevelopment,
        rate: data.rateDevelopment,
      },
    ].filter((r) => r.hours > 0);

    const rowHeight = 34;
    for (const row of rows) {
      doc.moveTo(left, y).lineTo(left + pageWidth, y).strokeColor(COLORS.border).stroke();
      x = left;
      doc.font("Helvetica-Bold").fontSize(9).fillColor(COLORS.primary).text(row.concept, x + 10, y + 8, { width: cols[0].width - 15 });
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.lightGray).text(row.sub, x + 10, y + 20, { width: cols[0].width - 15 });
      x += cols[0].width;
      doc.font("Helvetica").fontSize(9).fillColor(COLORS.primary).text(String(row.hours), x, y + 12, { width: cols[1].width - 10, align: "center" });
      x += cols[1].width;
      doc.font("Helvetica").fontSize(9).fillColor(COLORS.primary).text(formatCOP(row.rate), x, y + 12, { width: cols[2].width - 15, align: "right" });
      x += cols[2].width;
      doc.font("Helvetica-Bold").fontSize(9).fillColor(COLORS.primary).text(formatCOP(row.hours * row.rate), x, y + 12, { width: cols[3].width - 15, align: "right" });
      y += rowHeight;
    }
    doc.moveTo(left, y).lineTo(left + pageWidth, y).strokeColor(COLORS.border).stroke();
    y += 16;

    // ── Totals ───────────────────────────────────────────────
    const totalsBoxWidth = 230;
    const totalsX = left + pageWidth - totalsBoxWidth;
    doc.font("Helvetica").fontSize(9).fillColor(COLORS.gray);
    doc.text("Subtotal:", totalsX, y, { width: totalsBoxWidth - 110 });
    doc.text(formatCOP(data.subtotal), totalsX, y, { width: totalsBoxWidth, align: "right" });
    y += 16;
    doc.text(`IVA (${data.tax}%):`, totalsX, y, { width: totalsBoxWidth - 110 });
    doc.text(formatCOP(data.total - data.subtotal), totalsX, y, { width: totalsBoxWidth, align: "right" });
    y += 18;
    doc.moveTo(totalsX, y).lineTo(totalsX + totalsBoxWidth, y).strokeColor(COLORS.border).stroke();
    y += 8;
    doc.font("Helvetica-Bold").fontSize(13).fillColor(COLORS.primary).text("Total Neto:", totalsX, y, { width: totalsBoxWidth - 110 });
    doc.text(formatCOP(data.total), totalsX, y, { width: totalsBoxWidth, align: "right" });
    y += 40;

    // ── Payment plan (Modalidad de Pago) ────────────────────
    const isDeferred = data.paymentType === "diferido" && (data.installments || 0) > 0;
    doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.lightGray).text("MODALIDAD DE PAGO", left, y);
    y += 14;

    if (isDeferred) {
      const installments = data.installments || 1;
      const installmentAmount = data.installmentAmount || 0;
      const downPayment = data.downPayment || 0;
      const boxHeight = 34 + installments * 15 + (downPayment > 0 ? 15 : 0) + 10;

      doc.rect(left, y, pageWidth, boxHeight).fillAndStroke(COLORS.greenBg, COLORS.greenBorder);
      let py = y + 14;
      doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.green)
        .text(`Pago Diferido — ${installments} cuotas mensuales`, left + 15, py);
      py += 18;
      if (downPayment > 0) {
        doc.font("Helvetica").fontSize(8).fillColor(COLORS.gray)
          .text(`Cuota inicial (abono): ${formatCOP(downPayment)}`, left + 15, py);
        py += 15;
      }
      for (let i = 0; i < installments; i++) {
        doc.font("Helvetica").fontSize(8).fillColor(COLORS.gray)
          .text(`Cuota ${i + 1} de ${installments}`, left + 15, py, { width: pageWidth - 200 });
        doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.primary)
          .text(formatCOP(installmentAmount), left + 15, py, { width: pageWidth - 30, align: "right" });
        py += 15;
      }
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.gray)
        .text(`Cada cuota se factura por concepto de: ${data.services}`, left + 15, py + 2, { width: pageWidth - 30 });
      y += boxHeight + 15;
    } else {
      doc.rect(left, y, pageWidth, 36).fillAndStroke(COLORS.tableHeaderBg, COLORS.border);
      doc.font("Helvetica").fontSize(9).fillColor(COLORS.gray)
        .text(`Pago único por la totalidad del proyecto, por concepto de: ${data.services}`, left + 15, y + 13, { width: pageWidth - 30 });
      y += 52;
    }

    // ── Footer ───────────────────────────────────────────────
    const footerY = doc.page.height - doc.page.margins.bottom - 40;
    doc.moveTo(left, footerY).lineTo(left + pageWidth, footerY).strokeColor(COLORS.border).stroke();
    doc.font("Helvetica").fontSize(7).fillColor(COLORS.lightGray)
      .text("SynFlow IA • Transformando negocios con soluciones avanzadas de Inteligencia Artificial.", left, footerY + 10, { width: pageWidth, align: "center" });
    doc.text(`Presupuesto comercial válido por 30 días a partir de su emisión. © ${new Date().getFullYear()} SynFlow IA.`, left, footerY + 22, { width: pageWidth, align: "center" });

    doc.end();
  });
}

import { ref } from "vue"
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { supabase } from "@/supabase/supabase.config";

export function usePdf() {
  const pdf = ref<InvoicePdf>();
  const pdfSrc = ref()

  const downloadPdf = async (payload: any) => {
    await supabase.storage.from("invoice_pdf").download(payload)
  }
  const loadPdf = async (payload: any) => {
        const { data } = await supabase.storage.from("invoice-pdf").download(payload)
    pdfSrc.value = data;
  };
  const createPdf = async (order: any) => {
    console.log(order);
    
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });
    const info: any[] = [];

    order?.products.forEach((element: any) => {
      info.push([element.product_id, element.quantity]);
    });
    autoTable(doc, {
      head: [["Title", "Harga", "Qty"]],
      body: info,
      margin: { left: 0.5, top: 1.25 },
    });
    // text is placed using x, y coordinates
    doc.setFontSize(16).text("Nota " + order?.transaction_num, 0.5, 1.0);
    // create a line under heading
    doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
    // Using array of sentences
    doc
      .setFont("helvetica")
      .setFontSize(12)
      .text(JSON.stringify(order?.table), 0.5, 3.5, {
        align: "left",
        maxWidth: 7.5,
      });

    // Creating footer and saving file
    doc
      .setFont("times")
      .setFontSize(11)
      .setTextColor(0, 0, 255)
      .text(
        "Terima Kasih Dan Kembali Lagi....",
        0.5,
        doc.internal.pageSize.height - 0.5
      );
      return doc.output('blob');
  };
  return {
    createPdf,
    pdf,
    loadPdf,
    pdfSrc,
    downloadPdf
  };
}

export interface InvoicePdf {
  filepath: string | undefined;
  webviewPath?: string | undefined;
}
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { StatsSummary } from "../types/stats";

export const exportCSV = (summary: StatsSummary, period: string) => {
  const rows = [
    ["Период", period],
    ["Всего проверено сегодня", summary.totalReviewedToday],
    ["Всего проверено за неделю", summary.totalReviewedThisWeek],
    ["Всего проверено за месяц", summary.totalReviewedThisMonth],
    ["Одобрено (%)", summary.approvedPercentage],
    ["Отклонено (%)", summary.rejectedPercentage],
    ["На доработку (%)", summary.requestChangesPercentage],
    ["Среднее время проверки (сек)", summary.averageReviewTime],
  ];

  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + rows.map((r) => r.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `stats_${period}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportPDF = async (element: HTMLElement, period: string) => {
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`stats_${period}.pdf`);
};

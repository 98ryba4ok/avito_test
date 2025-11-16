import { describe, it, expect, vi, beforeEach } from "vitest";
import { exportCSV, exportPDF } from "./export";
import html2canvas from "html2canvas";
import type { StatsSummary } from "../types/stats";

vi.mock("html2canvas", () => ({
  default: vi.fn(),
}));

const addImageMock = vi.fn();
const saveMock = vi.fn();

vi.mock("jspdf", () => {
  return {
    default: vi.fn().mockImplementation(function () {
      return {
        addImage: addImageMock,
        save: saveMock,
        internal: {
          pageSize: { getWidth: () => 210 },
        },
      };
    }),
  };
});

describe("exportCSV", () => {
  let appendSpy: any;
  let removeSpy: any;
  let clickSpy: any;

  beforeEach(() => {
    appendSpy = vi.spyOn(document.body, "appendChild");
    removeSpy = vi.spyOn(document.body, "removeChild");
    clickSpy = vi.fn();

    const originalCreate = document.createElement;

    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = originalCreate.call(document, tag);
      el.setAttribute = vi.fn();
      el.click = clickSpy;
      return el;
    });
  });

  it("создаёт CSV и инициирует скачивание", () => {
    const summary: StatsSummary = {
      totalReviewed: 260,
      totalReviewedToday: 10,
      totalReviewedThisWeek: 50,
      totalReviewedThisMonth: 200,
      approvedPercentage: 60,
      rejectedPercentage: 20,
      requestChangesPercentage: 20,
      averageReviewTime: 5,
    };

    exportCSV(summary, "week");

    expect(appendSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });
});

describe("exportPDF", () => {
  it("вызывает html2canvas и сохраняет PDF", async () => {
    const fakeCanvas = {
      width: 1000,
      height: 1500,
      toDataURL: vi.fn().mockReturnValue("data:image/png;base64,fake"),
    };

    (html2canvas as unknown as vi.Mock).mockResolvedValue(fakeCanvas);

    const el = document.createElement("div");

    await exportPDF(el, "today");

    expect(html2canvas).toHaveBeenCalled();
    expect(addImageMock).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalledWith("stats_today.pdf");
  });
});

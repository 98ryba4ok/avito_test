import { describe, it, expect, vi } from "vitest";

vi.mock("../pages/ItemDetail/ItemDetail.module.css", () => {
  return {
    default: {
      itemDetail__status: "itemDetail__status",
      "itemDetail__status--approved": "itemDetail__status--approved",
      "itemDetail__status--rejected": "itemDetail__status--rejected",
      "itemDetail__status--requestChanges": "itemDetail__status--requestChanges",
    },
  };
});

import { QUICK_REASONS, ACTION_MAP } from "./itemDetailConstants";

describe("itemDetailConstants", () => {
  it("QUICK_REASONS должен быть массивом с 6 элементами", () => {
    expect(Array.isArray(QUICK_REASONS)).toBe(true);
    expect(QUICK_REASONS.length).toBe(6);
  });

  it("ACTION_MAP должен содержать все ключи", () => {
    const keys = Object.keys(ACTION_MAP);
    expect(keys).toEqual(["approved", "rejected", "requestChanges"]);
  });

  it("каждый объект ACTION_MAP должен содержать корректный label", () => {
    expect(ACTION_MAP.approved.label).toBe("Одобрено");
    expect(ACTION_MAP.rejected.label).toBe("Отклонено");
    expect(ACTION_MAP.requestChanges.label).toBe("Вернули на доработку");
  });

  it("каждый объект ACTION_MAP должен содержать корректный className", () => {
    expect(ACTION_MAP.approved.className).toBe("itemDetail__status itemDetail__status--approved");
    expect(ACTION_MAP.rejected.className).toBe("itemDetail__status itemDetail__status--rejected");
    expect(ACTION_MAP.requestChanges.className).toBe(
      "itemDetail__status itemDetail__status--requestChanges"
    );
  });
});

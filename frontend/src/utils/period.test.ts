import { describe, it, expect } from "vitest";
import { getPeriodLabel } from "./period";

describe("getPeriodLabel", () => {
  it("должен возвращать корректную метку для 'today'", () => {
    expect(getPeriodLabel("today")).toBe("Период: Сегодня");
  });

  it("должен возвращать корректную метку для 'week'", () => {
    expect(getPeriodLabel("week")).toBe("Период: Последние 7 дней");
  });

  it("должен возвращать корректную метку для 'month'", () => {
    expect(getPeriodLabel("month")).toBe("Период: Последние 30 дней");
  });
});

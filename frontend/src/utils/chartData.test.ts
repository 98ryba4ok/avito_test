import { describe, it, expect } from "vitest";
import { getActivityChartData, getDecisionsChartData, getCategoriesChartData } from "./chartData";

describe("getActivityChartData", () => {
  it("должен корректно формировать данные для графика активности", () => {
    const input = [
      { date: "2024-01-01", approved: 5, rejected: 2, requestChanges: 1 },
      { date: "2024-01-02", approved: 3, rejected: 1, requestChanges: 0 },
    ];

    const result = getActivityChartData(input);

    expect(result.labels).toEqual(["2024-01-01", "2024-01-02"]);
    expect(result.datasets[0].data).toEqual([5, 3]);
    expect(result.datasets[1].data).toEqual([2, 1]);
    expect(result.datasets[2].data).toEqual([1, 0]);
  });
});

describe("getDecisionsChartData", () => {
  it("должен возвращать null, если входные данные — null", () => {
    expect(getDecisionsChartData(null)).toBeNull();
  });

  it("должен корректно формировать данные по решениям", () => {
    const input = { approved: 10, rejected: 4, requestChanges: 2 };

    const result = getDecisionsChartData(input);

    expect(result?.labels).toEqual(["Одобрено", "Отклонено", "На доработку"]);

    expect(result?.datasets[0].data).toEqual([10, 4, 2]);
    expect(result?.datasets[0].backgroundColor).toEqual(["#1a73e8", "#e53935", "#fbc02d"]);
  });
});

describe("getCategoriesChartData", () => {
  it("должен возвращать null, если категорий нет", () => {
    expect(getCategoriesChartData(null)).toBeNull();
  });

  it("должен корректно формировать данные по категориям", () => {
    const input = {
      Недвижимость: 20,
      Транспорт: 15,
      Электроника: 8,
    };

    const result = getCategoriesChartData(input);

    expect(result?.labels).toEqual(["Недвижимость", "Транспорт", "Электроника"]);
    expect(result?.datasets[0].label).toBe("Объявления по категориям");
    expect(result?.datasets[0].data).toEqual([20, 15, 8]);
    expect(result?.datasets[0].backgroundColor).toBe("#1a73e8");
  });
});

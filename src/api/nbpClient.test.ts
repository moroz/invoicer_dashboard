import { getLastWorkingDate } from "./nbpClient";

describe(getLastWorkingDate, () => {
  test("returns Thursday when called with a Friday", () => {
    const actual = getLastWorkingDate("2022-10-14");
    expect(actual).toEqual("2022-10-13");
  });

  test("returns last Friday when called with a Saturday", () => {
    const actual = getLastWorkingDate("2022-10-15");
    expect(actual).toEqual("2022-10-14");
  });

  test("returns last Friday when called with a Monday", () => {
    const actual = getLastWorkingDate("2022-10-17");
    expect(actual).toEqual("2022-10-14");
  });

  test("returns last Friday when called with a Sunday", () => {
    const actual = getLastWorkingDate("2022-10-16");
    expect(actual).toEqual("2022-10-14");
  });
});

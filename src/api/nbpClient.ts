import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export interface NBPRate {
  no: string;
  effectiveDate: string;
  mid: string;
}

export interface NBPResponse {
  table: "A";
  currency: string;
  code: string;
  rates: NBPRate[];
}

const ISO8601_DATE = "YYYY-MM-DD";

export const getLastWorkingDate = (date: string | Date) => {
  const parsed = dayjs(date);

  if (parsed.day() === 1) {
    return parsed.subtract(3, "day").format(ISO8601_DATE);
  }

  if (parsed.day() === 0) {
    return parsed.subtract(2, "day").format(ISO8601_DATE);
  }

  return parsed.subtract(1, "day").format(ISO8601_DATE);
};

export const getExchangeRate = async (
  currency: string,
  date: Date | string
) => {
  const normalizedDate = dayjs(date).format(ISO8601_DATE);
  const url = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/${normalizedDate}/?format=json`;
  try {
    const res = await fetch(url);
    if (res.status !== 200) return null;
    const parsed = (await res.json()) as NBPResponse;
    return parsed.rates[0];
  } catch (e) {
    return null;
  }
};

export const useExchangeRate = (currency: string, date: Date | string) => {
  const [data, setData] = useState<NBPRate | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async (currency: string, date: Date | string) => {
    setLoading(true);
    const result = await getExchangeRate(currency, date);
    setLoading(false);
    setData(result);
  }, []);

  useEffect(() => {
    if (currency && date) {
      getData(currency, date);
    }
  }, [currency, date]);

  return {
    loading,
    data
  };
};

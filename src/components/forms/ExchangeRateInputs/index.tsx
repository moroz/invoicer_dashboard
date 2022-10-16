import { getLastWorkingDate, useExchangeRate } from "@api/nbpClient";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../InputField";
import styles from "./ExchangeRateInputs.module.sass";

interface Props {}

const ExchangeRateInputs: React.FC<Props> = () => {
  const { register, watch, setValue } = useFormContext();
  const showRates = watch("calculateExchangeRate", false);
  const currency = watch("currency", "PLN");
  const date = watch("exchangeRateEffectiveDate");
  const { data, loading } = useExchangeRate(currency, date);

  const dateOfSale = watch("dateOfSale");

  useEffect(() => {
    setValue("exchangeRateEffectiveDate", getLastWorkingDate(dateOfSale));
  }, [dateOfSale]);

  useEffect(() => {
    setValue("bankRate", data);
  }, [data]);

  if (currency === "PLN") return null;

  return (
    <section className={styles.root}>
      <div className="field">
        <label className={styles.label}>
          <input type="checkbox" {...register("calculateExchangeRate")} />{" "}
          Calculate exchange rate based on NBP rate from:
        </label>
        <InputField
          required
          disabled={!showRates}
          type="date"
          {...register("exchangeRateEffectiveDate")}
        />
      </div>
      {showRates && (
        <div className={styles.rates}>
          {loading && <p>Loading...</p>}
          {data ? (
            <p>
              1 {currency} = {data.mid} USD (Reference exchange rates no.{" "}
              {data.no} as of {data.effectiveDate})
            </p>
          ) : (
            <p>Reference exchange rates not available for the given date.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ExchangeRateInputs;

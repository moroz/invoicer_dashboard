import {
  calculateGross,
  calculateVatValue,
  sanitizeNumericValue
} from "@/lib/calculations";
import {
  InvoiceParams,
  LineItemParams,
  VAT_RATE_NUMBERS
} from "@api/interfaces";
import { DeleteButton, NewButton } from "@components/buttons";
import { InputField, VatRateSelect } from "@components/forms";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./LineItemEditor.module.sass";

interface Props {}

const EMPTY_LINE_ITEM: LineItemParams = {
  quantity: 1,
  description: "",
  vatRate: "TWENTY_THREE",
  unitNetPrice: 0
};

const LineItemEditor: React.FC<Props> = () => {
  const { register, control, watch, setValue } =
    useFormContext<InvoiceParams>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems"
  });

  const setNumericValue = (name: string) => (e: any) => {
    const value = e.target.value;
    setValue(name as any, sanitizeNumericValue(value));
  };

  return (
    <table className={clsx("table is-fullwidth is-bordered", styles.table)}>
      <thead>
        <tr>
          <th className={styles.id}>#</th>
          <th className={styles.name}>Name</th>
          <th className={styles.narrow}>Unit</th>
          <th className={styles.narrow}>Quantity</th>
          <th className={styles.narrow}>Unit price</th>
          <th className={styles.narrow}>Vat rate</th>
          <th className={styles.amount}>Vat amount</th>
          <th className={styles.amount}>Gross subtotal</th>
          <th className={styles.buttons}></th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, number) => {
          const unitNetPrice = watch(
            `lineItems.${number}.unitNetPrice`
          ) as string;
          const vatRate = watch(`lineItems.${number}.vatRate`);
          const quantity = watch(
            `lineItems.${number}.quantity`
          ) as unknown as string;
          const vatAmount = calculateVatValue(unitNetPrice, quantity, vatRate);
          const gross = calculateGross(unitNetPrice, quantity, vatRate);

          return (
            <tr key={field.id}>
              <td className={styles.id}>{number + 1}</td>
              <td className={styles.input}>
                <input
                  required
                  {...register(`lineItems.${number}.description`)}
                />
              </td>
              <td className={clsx(styles.input, styles.narrow)}>
                <input {...register(`lineItems.${number}.unit`)} />
              </td>
              <td className={clsx(styles.input, styles.narrow)}>
                <input
                  required
                  {...register(`lineItems.${number}.quantity`, {
                    setValueAs: sanitizeNumericValue,
                    onBlur: setNumericValue(`lineItems.${number}.quantity`)
                  })}
                />
              </td>
              <td className={clsx(styles.input, styles.narrow)}>
                <input
                  required
                  {...register(`lineItems.${number}.unitNetPrice`, {
                    setValueAs: sanitizeNumericValue,
                    onBlur: setNumericValue(`lineItems.${number}.unitNetPrice`)
                  })}
                />
              </td>
              <td className={styles.input}>
                <VatRateSelect
                  {...register(`lineItems.${number}.vatRate`)}
                  required
                />
              </td>
              <td>{vatAmount.toFixed(2)}</td>
              <td>{gross.toFixed(2)}</td>
              <td className={styles.buttons}>
                <NewButton
                  onClick={() => append(EMPTY_LINE_ITEM)}
                  children=""
                />
                {fields.length > 1 && (
                  <DeleteButton children="" onClick={() => remove(number)} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LineItemEditor;

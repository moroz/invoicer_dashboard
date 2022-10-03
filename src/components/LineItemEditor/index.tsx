import {
  calculateGross,
  calculateVatValue,
  sanitizeNumericValue
} from "@/lib/calculations";
import { InvoiceParams, VAT_RATE_NUMBERS } from "@api/interfaces";
import { DeleteButton } from "@components/buttons";
import { InputField, VatRateSelect } from "@components/forms";
import clsx from "clsx";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./LineItemEditor.module.sass";

interface Props {}

const LineItemEditor: React.FC<Props> = () => {
  const { register, control, watch } = useFormContext<InvoiceParams>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems"
  });

  return (
    <table className={clsx("table is-fullwidth is-bordered", styles.table)}>
      <thead>
        <th className={styles.id}>#</th>
        <th>Name</th>
        <th>Unit</th>
        <th>Quantity</th>
        <th>Unit net price</th>
        <th>Vat rate</th>
        <th>Vat amount</th>
        <th>Gross subtotal</th>
        <th></th>
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
                <InputField
                  colSpan={4}
                  required
                  {...register(`lineItems.${number}.description`)}
                />
              </td>
              <td className={styles.input}>
                <InputField {...register(`lineItems.${number}.unit`)} />
              </td>
              <td className={styles.input}>
                <InputField
                  required
                  {...register(`lineItems.${number}.quantity`, {
                    setValueAs: sanitizeNumericValue
                  })}
                />
              </td>
              <td className={styles.input}>
                <InputField
                  required
                  {...register(`lineItems.${number}.unitNetPrice`, {
                    setValueAs: sanitizeNumericValue
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
              <td>
                {fields.length > 1 && (
                  <DeleteButton
                    onClick={() => remove(number)}
                    className="mb-3"
                  />
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

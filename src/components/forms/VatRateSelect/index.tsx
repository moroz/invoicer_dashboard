import { VAT_RATES } from "@api/interfaces";
import React from "react";
import Select from "../Select";

const VAT_RATE_OPTIONS = Object.entries(VAT_RATES).map(([value, label]) => ({
  value,
  label
}));

interface Props extends React.HTMLProps<HTMLSelectElement> {}

const VatRateSelect = React.forwardRef((props: Props, ref: any) => {
  return (
    <Select options={VAT_RATE_OPTIONS} label="Vat rate:" {...props} ref={ref} />
  );
});

export default VatRateSelect;

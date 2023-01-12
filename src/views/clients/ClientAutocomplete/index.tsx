import { ClientTemplateType } from "@api/interfaces";
import { useGetClientOptionsQuery } from "@api/queries";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./ClientAutocomplete.module.sass";

interface Props {
  type: ClientTemplateType;
}

const ClientAutocomplete: React.FC<Props> = ({ type }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const getOptions = useGetClientOptionsQuery(type);

  return (
    <div className={clsx(styles.root, "field")}>
      <label className={"label"}>Client</label>
      <input
        className="input"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {snapshot.focus && (
        <div className={styles.options}>{JSON.stringify(snapshot.options)}</div>
      )}
    </div>
  );
};

export default ClientAutocomplete;

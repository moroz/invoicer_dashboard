import { ClientOptionItem, ClientTemplateType } from "@api/interfaces";
import { useGetClientOptionsQuery } from "@api/queries";
import clsx from "clsx";
import React, { ChangeEvent, HTMLProps, useCallback, useState } from "react";
import styles from "./ClientAutocomplete.module.sass";

interface Props {
  type: ClientTemplateType;
}

interface OptionProps extends HTMLProps<HTMLLIElement> {
  client: ClientOptionItem;
}

const ClientOption: React.FC<OptionProps> = ({
  client,
  className,
  ...rest
}) => {
  return (
    <li key={client.value} className={clsx(styles.option, className)} {...rest}>
      <span className={styles.name}>{client.name}</span>{" "}
      {client.vatId ? (
        <span className={styles.vatId}>({client.vatId})</span>
      ) : (
        ""
      )}
      <p className={styles.address}>
        {client.addressLine ? (
          <span className={styles.addressLine}>{client.addressLine}</span>
        ) : (
          ""
        )}
      </p>
    </li>
  );
};

const ClientAutocomplete: React.FC<Props> = ({ type }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const { previousData, data } = useGetClientOptionsQuery({
    templateType: type,
    q: value
  });

  const options = (data ?? previousData)?.clients.data ?? [];

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  return (
    <div className={clsx(styles.root, "field")}>
      <label className={"label"}>Client</label>
      <div className={styles.wrapper}>
        <input
          className="input"
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {focused && (
          <ul className={styles.options}>
            {options.map((option) => (
              <ClientOption client={option} key={option.value} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClientAutocomplete;

import { ClientOptionItem, ClientTemplateType } from "@api/interfaces";
import { useGetClientOptionsQuery } from "@api/queries";
import useClickOutside from "@hooks/useClickOutside";
import clsx from "clsx";
import React, { HTMLProps, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./ClientAutocomplete.module.sass";

interface Props {
  type: ClientTemplateType;
  name: string;
  onSelect: (client: ClientOptionItem) => void;
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

const ClientAutocomplete: React.FC<Props> = ({ onSelect, type, name }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { register, watch } = useFormContext();

  const value = watch(name, "");

  const [focused, setFocused] = useState(false);
  const { previousData, data } = useGetClientOptionsQuery({
    templateType: type,
    q: value
  });

  useClickOutside(wrapperRef, () => setFocused(false));

  const options = (data ?? previousData)?.clients.data ?? [];

  const onSelectOption = useCallback(
    (option: ClientOptionItem) => () => {
      onSelect(option);
      setFocused(false);
    },
    [setFocused, onSelect]
  );

  return (
    <div className={clsx(styles.root, "field")} ref={wrapperRef}>
      <label className={"label"}>Client</label>
      <div className={styles.wrapper}>
        <input
          className="input"
          onFocus={() => setFocused(true)}
          {...register(name)}
        />
        {focused && (
          <ul className={styles.options}>
            {options.map((option) => (
              <ClientOption
                client={option}
                key={option.value}
                onClick={onSelectOption(option)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClientAutocomplete;

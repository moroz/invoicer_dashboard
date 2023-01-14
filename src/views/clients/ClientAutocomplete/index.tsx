import { ClientOptionItem, ClientTemplateType } from "@api/interfaces";
import { useGetClientOptionsQuery } from "@api/queries";
import useClickOutside from "@hooks/useClickOutside";
import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./ClientAutocomplete.module.sass";
import ClientOption from "./ClientOption";

interface Props {
  type: ClientTemplateType;
  name: string;
  onSelect: (client: ClientOptionItem) => void;
}

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

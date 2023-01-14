import { ClientOptionItem } from "@api/interfaces";
import clsx from "clsx";
import React, { HTMLProps, memo } from "react";
import styles from "../ClientAutocomplete.module.sass";

interface OptionProps extends HTMLProps<HTMLLIElement> {
  client: ClientOptionItem;
}

const ClientOption: React.FC<OptionProps> = memo(
  ({ client, className, ...rest }) => {
    const address = [client.addressLine, client.city, client.postalCode]
      .filter(Boolean)
      .join(", ");

    const bankInfo = [client.bankName, client.accountNo]
      .filter(Boolean)
      .join(" ");

    return (
      <li className={clsx(styles.option, className)} {...rest}>
        <span className={styles.name}>{client.name}</span>{" "}
        {client.vatId ? (
          <span className={styles.vatId}>({client.vatId})</span>
        ) : (
          ""
        )}
        <p className={styles.address}>{address}</p>
        <p className={styles.bankInfo}>{bankInfo}</p>
      </li>
    );
  }
);

export default ClientOption;

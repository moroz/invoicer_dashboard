import clsx from "clsx";
import React, { EventHandler } from "react";
import styles from "./IconButton.module.sass";
import { Link, LinkProps } from "react-router-dom";

interface BaseProps {
  icon: React.FC;
  className?: string;
  children?: React.ReactNode;
}

export interface IconButtonProps extends BaseProps {
  onClick: EventHandler<React.MouseEvent>;
  to?: never;
}

export interface IconLinkProps extends BaseProps {
  onClick?: never;
  to: string;
}

export type BaseButtonProps = IconLinkProps | IconButtonProps;
export type ButtonProps = Omit<BaseButtonProps, "icon">;

const IconButton: React.FC<BaseButtonProps> = ({
  icon: Icon,
  className,
  children,
  ...props
}) => {
  const classes = clsx("button", className, styles.button);

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        <Icon /> {children}
      </Link>
    );
  }

  return (
    <button {...props} type="button" className={classes}>
      <Icon /> {children}
    </button>
  );
};

export default IconButton;
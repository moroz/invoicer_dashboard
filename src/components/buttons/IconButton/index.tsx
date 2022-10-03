import clsx from "clsx";
import React, { EventHandler } from "react";
import styles from "./IconButton.module.sass";
import { Link } from "react-router-dom";

interface BaseProps {
  icon: React.FC;
  className?: string;
  children?: React.ReactNode;
  download?: boolean | string;
  target?: string;
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

  if ("to" in props && props.to?.match(/^https?:\/\//)) {
    const rel = props.target === "_blank" ? "noopener noreferrer" : undefined;

    return (
      <a href={props.to} className={classes} rel={rel} {...props}>
        <Icon /> {children}
      </a>
    );
  }

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

export interface MakeIconButtonParams {
  icon: React.FC;
  overrideClassName?: string;
  defaultChildren?: string;
}

export const makeIconButton = ({
  icon: Icon,
  overrideClassName,
  defaultChildren
}: MakeIconButtonParams) => {
  return ({ children, className, ...props }: ButtonProps) => {
    return (
      <IconButton
        {...(props as BaseButtonProps)}
        className={clsx(overrideClassName, className)}
        icon={Icon}
      >
        {children === undefined ? defaultChildren : children}
      </IconButton>
    );
  };
};

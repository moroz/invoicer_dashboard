import { makeIconButton } from "./IconButton";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as RefetchIcon } from "./rotate.svg";

export { default as IconButton, makeIconButton } from "./IconButton";
export { default as SubmitButton } from "./SubmitButton";
export { default as ButtonGroup } from "./ButtonGroup";

export const NewButton = makeIconButton({
  icon: PlusIcon,
  overrideClassName: "is-primary",
  defaultChildren: "New"
});

export const RefetchButton = makeIconButton({
  icon: RefetchIcon,
  defaultChildren: "Refresh"
});

import { makeIconButton } from "./IconButton";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as RefetchIcon } from "./rotate.svg";
import { ReactComponent as PDFIcon } from "./file-pdf.svg";
import { ReactComponent as DownloadIcon } from "./download.svg";
import { ReactComponent as XmarkIcon } from "./xmark.svg";
import { ReactComponent as EditIcon } from "./file-pen.svg";

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

export const PDFButton = makeIconButton({
  icon: PDFIcon,
  defaultChildren: "View PDF"
});

export const DownloadButton = makeIconButton({
  icon: DownloadIcon,
  defaultChildren: "Download"
});

export const DeleteButton = makeIconButton({
  overrideClassName: "is-danger",
  icon: XmarkIcon,
  defaultChildren: "Remove"
});

export const EditButton = makeIconButton({
  overrideClassName: "is-info",
  icon: EditIcon,
  defaultChildren: "Edit"
});

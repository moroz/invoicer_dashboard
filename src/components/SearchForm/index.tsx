import clsx from "clsx";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import useParsedQuery from "@hooks/useParsedQuery";
import styles from "./SearchForm.module.sass";

interface Props {}

const SearchForm: React.FC<Props> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [params, updateParams] = useParsedQuery();
  const [term, setTerm] = useState(params.q ?? "");

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      updateParams({ ...params, q: term });
    },
    [params, term]
  );

  const handleDocumentKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const focused = document.querySelector(
        "input:focus, textarea:focus, select:focus"
      );
      if (focused) return;
      e.preventDefault();
      inputRef.current?.focus();
    },
    [inputRef]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }, []);

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Escape" || e.key === "27") inputRef?.current?.blur();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, []);

  const placeholder = hasFocus ? `搜尋文章` : `按 / 來搜尋文章`;

  return (
    <form className={clsx(styles.root, "field")} onSubmit={onSubmit}>
      <input
        name="q"
        type="text"
        className="input"
        placeholder={placeholder}
        value={term}
        onChange={onChange}
        onKeyDown={handleInputKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        ref={inputRef}
      />
    </form>
  );
};

export default SearchForm;

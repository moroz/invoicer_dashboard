import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function useParsedQuery<T = any>(): [T, (data: T) => void] {
  const [params, updateSearchParams] = useSearchParams();
  const parsed = useMemo(
    () =>
      [...params!.entries()].reduce((acc, [key, value]) => {
        if (["true", "false", "null"].includes(value) || key === "page") {
          return {
            ...acc,
            [key]: JSON.parse(value)
          };
        }
        return { ...acc, [key]: value };
      }, {} as T),
    [params]
  );

  const update = useCallback(
    (data: any) => {
      const newSearchParams = Object.entries(data).reduce(
        (acc, [key, value]: any) => {
          if ([null, undefined, ""].includes(value)) return acc;
          return {
            ...acc,
            [key]: value
          };
        },
        {}
      );
      updateSearchParams(newSearchParams);
    },
    [updateSearchParams]
  );

  return [parsed as T, update];
}

import * as React from "react";

export function JSONEditor<T>({
  value,
  onChange
}: {
  value: T;
  onChange: (v: T) => void;
}) {
  const [currentValue, setCurrentValue] = React.useState(() =>
    JSON.stringify(value, null, 2)
  );
  const [isInvalid, setIsInvalid] = React.useState(false);
  React.useEffect(() => {
    setCurrentValue(JSON.stringify(value, null, 2));
  }, [value]);
  return (
    <textarea
      value={currentValue}
      rows={7}
      style={{
        width: "100%",
        background: isInvalid ? "red" : undefined
      }}
      onChange={(e) => {
        setCurrentValue(e.target.value);
        try {
          onChange(JSON.parse(e.target.value));
          setIsInvalid(false);
        } catch (err) {
          setIsInvalid(true);
        }
      }}
    ></textarea>
  );
}

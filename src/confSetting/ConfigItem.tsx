import { Paper, TextField, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface ConfigItemProps {
  keyName: string;
  confShowMessage: (key: string, code: number) => void;
  onValueChange: (key: string, value: string) => Promise<number | undefined>;
  fetchValue: (key: string) => Promise<string | undefined>;
}

const ConfigItem: React.FC<ConfigItemProps> = ({
  keyName,
  confShowMessage,
  onValueChange,
  fetchValue,
}) => {
  const [value, setValue] = useState<string>("");

  const getValue = useCallback(async () => {
    try {
      const response = await fetchValue(keyName);
      if (response !== undefined) {
        setValue((_prevValues) => (response));
      }
    } catch (error) {
      console.error("Error fetching value:", error);
    }
  }, [keyName, setValue, fetchValue]);

  useEffect(() => {
    getValue();
  }, [getValue]);

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <TextField
        id={keyName}
        label={keyName}
        multiline
        minRows={keyName === "cookie" ? 10 : 3}
        variant="outlined"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        InputProps={{
          style: {
            fontFamily: '"Roboto Mono", monospace',
          },
          endAdornment: (
            <Button
              variant="outlined"
              color="primary"
              onClick={async () => {
                const response = await onValueChange(keyName, value)
                confShowMessage(keyName, response !== undefined ? response : -1)
              }}
            >
              提交
            </Button>
          ),
        }}
      />
    </Paper>
  );
};

export default ConfigItem;

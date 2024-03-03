import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useAtom } from "jotai";
import { showMessageAtom } from "../snackBar/snackbarAtoms";

interface CopyableTextProps extends TypographyProps {
  text: string;
}

const CopyableText: React.FC<CopyableTextProps> = ({ text, ...props }) => {
  const [, showMessage] = useAtom(showMessageAtom);

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      showMessage({ message: "复制成功", severity: "success" });
    } catch (err) {
      console.error("Failed to copy text to clipboard", err);
    }
  };
  return (
    <Typography
      {...props}
      onClick={() => copyToClipboard(text)}
      style={{ cursor: "pointer" }}
    >
      {text}
    </Typography>
  );
};
export default CopyableText;

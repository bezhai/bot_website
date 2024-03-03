import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// 使用更具日式二次元风格的字体
const animeFont = "'HarmonySans', sans-serif";
const lightBlue = "#ADD8E6";
const deepBlue = "#007BFF";

// 自定义卡片风格，增加一些鲜艳的颜色和动漫感的阴影
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `2px solid ${lightBlue}`,
  borderRadius: "13px",
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  boxShadow: `0 4px 20px 0 ${deepBlue}`,
  "&:hover": {
    transform: "scale(1.005)", // 悬停时放大
    boxShadow: `0 8px 40px 0 ${deepBlue}`,
  },
  fontFamily: animeFont,
}));

// 自定义CardContent风格
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
  fontFamily: animeFont,
}));

// 自定义输入框风格
const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: lightBlue, // 聚焦时标签颜色
  },
  ".MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: lightBlue, // 聚焦时下划线颜色
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: lightBlue, // 默认边框颜色
    },
    "&:hover fieldset": {
      borderColor: deepBlue, // 悬停时边框颜色
    },
    "&.Mui-focused fieldset": {
      borderColor: lightBlue, // 聚焦时边框颜色
    },
  },
  fontFamily: animeFont,
});

// 自定义按钮风格
const StyledButton = styled(Button)({
  fontWeight: "bold",
  textTransform: "none",
  boxShadow: "none",
  "&.MuiButton-contained": {
    color: "#fff",
    backgroundColor: lightBlue,
    "&:hover": {
      backgroundColor: deepBlue,
    },
  },
  "&.MuiButton-outlined": {
    color: lightBlue,
    borderColor: lightBlue,
    "&:hover": {
      borderColor: deepBlue,
      color: deepBlue,
    },
  },
  fontFamily: animeFont,
});

export interface Word {
  origin: string;
  extra_info?: {
    zh?: string;
    en?: string;
  };
}

interface TranslationCardProps {
  word: {
    word: Word;
    translation: string;
    num: number;
  };
  index: number;
  updateTranslation: (index: number, value: string) => void;
  submitTranslation: (origin: string, index: number) => void;
  deleteTranslation: (origin: string) => void;
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  word,
  index,
  updateTranslation,
  submitTranslation,
  deleteTranslation,
}) => {
  return (
    <StyledCard key={word.word.origin}>
      <StyledCardContent>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="body1">
              <strong>原文:</strong> {word.word.origin}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body1">
              <strong>数量:</strong> {word.num}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              <strong>中文环境翻译:</strong> {word.word.extra_info?.zh}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              <strong>英文环境翻译:</strong> {word.word.extra_info?.en}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <StyledTextField
              fullWidth
              variant="outlined"
              value={word.translation}
              onChange={(e) => updateTranslation(index, e.target.value)}
            />
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <StyledButton
                variant="contained"
                onClick={() => submitTranslation(word.word.origin, index)}
              >
                提交翻译
              </StyledButton>
              <StyledButton
                variant="outlined"
                color="error"
                onClick={() => deleteTranslation(word.word.origin)}
              >
                删除
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </StyledCardContent>
    </StyledCard>
  );
};

export default TranslationCard;

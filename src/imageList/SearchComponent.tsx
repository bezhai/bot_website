import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { StatusMode, ListImageReq } from "../common/types/image";

const SearchComponent: React.FC<{
  onSearch: (filters: ListImageReq) => void;
}> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<ListImageReq>({});
  const theme = useTheme();

  const radiusRate = 2.5;

  const boxStyle = {
    display: "flex",
    gap: 3,
    mb: 4,
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(radiusRate),
  };

  const inputFieldStyle = {
    minWidth: 150,
    maxWidth: 500,
    flexBasis: { xs: "100%", sm: "auto" },
    "& .MuiOutlinedInput-root": {
        borderRadius: theme.spacing(radiusRate),
    },
  };

  const statusSelectStyle = {
    minWidth: 150,
    flexBasis: { xs: "100%", sm: "auto" },
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(radiusRate),
    },
  };

  const searchButtonStyle = {
    backgroundColor: "#7cbace", // 淡蓝色主题按钮
    "&:hover": {
      backgroundColor: "#97c7e4", // 淡蓝色主题按钮悬停颜色
    },
    flexBasis: "100%",
    [theme.breakpoints.up("sm")]: {
      flexBasis: "auto",
      width: "auto",
    },
    minWidth: 90,
    borderRadius: theme.spacing(radiusRate),
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  const handleTagChange = (event: React.SyntheticEvent, value: string[]) => {
    setSearchParams({
      ...searchParams,
      tags: value,
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<StatusMode>) => {
    setSearchParams({
      ...searchParams,
      status: event.target.value as StatusMode,
    });
  };

  const handleSubmit = () => {
    onSearch(searchParams);
  };

  const handleIllustIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 只允许正整数
    if (/^\d*$/.test(value)) {
      setSearchParams({
        ...searchParams,
        illust_id: value ? parseInt(value, 10) : undefined,
      });
    }
  };

  return (
    <Box sx={boxStyle}>
      <TextField
        name="author"
        label="作者名称"
        variant="outlined"
        value={searchParams.author || ""}
        onChange={handleInputChange}
        sx={inputFieldStyle}
      />
      <TextField
        name="author_id"
        label="作者ID"
        variant="outlined"
        value={searchParams.author_id || ""}
        onChange={handleInputChange}
        sx={inputFieldStyle}
      />
      <TextField
        name="illust_id"
        label="作品ID"
        variant="outlined"
        value={searchParams.illust_id || ""}
        onChange={handleIllustIdChange}
        sx={inputFieldStyle}
      />
      <Autocomplete
        multiple
        options={[]} // 替换为你的标签选项
        limitTags={3}
        freeSolo
        value={searchParams.tags || []}
        onChange={handleTagChange}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="标签" />
        )}
        sx={inputFieldStyle}
      />
      <FormControl variant="outlined" sx={statusSelectStyle}>
        <InputLabel>状态</InputLabel>
        <Select
          value={searchParams.status ?? ""}
          onChange={handleStatusChange}
          label="状态"
        >
          <MenuItem value={StatusMode.NotDelete}>未删除</MenuItem>
          <MenuItem value={StatusMode.Visible}>可见</MenuItem>
          <MenuItem value={StatusMode.Delete}>已删除</MenuItem>
          <MenuItem value={StatusMode.All}>全部</MenuItem>
          <MenuItem value={StatusMode.NoVisible}>不可见</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={searchButtonStyle}
      >
        搜 索
      </Button>
    </Box>
  );
};

export default SearchComponent;

import React, { useCallback, useEffect } from "react";
import { Box, Pagination } from "@mui/material";

// 定义组件的 Props 类型
interface PaginationBarProps {
  totalPages: number; // 总页数
  page: number; // 当前页
  setPage: (page: number) => void; // 设置页数的函数
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPages,
  page,
  setPage,
}) => {
  const goToPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page, setPage]);

  const goToNextPage = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, setPage, totalPages]);

  // 处理键盘事件
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPreviousPage();
      } else if (event.key === "ArrowRight") {
        goToNextPage();
      }
    },
    [goToNextPage, goToPreviousPage]
  );

  useEffect(() => {
    // 组件挂载时添加事件监听
    window.addEventListener("keydown", handleKeyDown);

    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_event, value) => setPage(value)}
        color="primary"
        variant="outlined"
      />
    </Box>
  );
};

export default PaginationBar;

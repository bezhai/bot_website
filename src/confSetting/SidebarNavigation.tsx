import {
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { ReactComponent as ListIcon } from "../assets/logo/cloud-done-outline.svg";

interface SidebarNavigationProps {
  keys: string[];
  onKeySelect: (key: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  keys,
  onKeySelect,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "200px",
        ml: -2, // 这里调整以使导航栏更靠近左边
        overflow: "auto",
        background: "linear-gradient(45deg, #F0F8FF 30%, #ADD8E6 90%)", // 蓝白色到淡蓝色渐变
        "& .MuiListItem-root": {
          px: 2,
          py: 1,
          borderRadius: "4px",
          "&:hover": {
            bgcolor: "primary.main", // 悬停时的背景色，可以根据需要调整
            transform: "scale(1.05)", // 添加微妙的缩放效果
            transition: "transform 0.3s ease-in-out",
            "& .MuiListItemIcon-root": {
              color: "#fff", // 将 logo 变成白色
            },
          },
        },
        "& .MuiListItemIcon-root": {
          minWidth: "auto",
          pr: 2,
          "& svg": {
            fill: "#fff", // 将 logo 变成白色
          },
        },
        "& .MuiListItemText-primary": {
          fontWeight: "bold", // 增加字体权重
          fontFamily: '"Your Custom Font", sans-serif', // 使用特色字体
          color: "#fff", // 将文本颜色变成白色
        },
      }}
    >
      <List component="nav" aria-label="key navigation">
        {keys.map((key) => (
          <ListItemButton key={key} onClick={() => onKeySelect(key)}>
            <ListItemIcon sx={{ color: "white" }}>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={key} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default SidebarNavigation;

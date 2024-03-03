import {
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  styled,
  Card,
  Grid,
  Checkbox,
} from "@mui/material";
import { PixivImageInfoWithUrl } from "../common/types/image";
import { ReactComponent as DownloadIcon } from "../assets/logo/download.svg";
import CopyableText from "../common/components/CopyableText";

const PREFIX = "ImagesCard";
const classes = {
  card: `${PREFIX}-card`,
  cardMedia: `${PREFIX}-cardMedia`,
  cardContent: `${PREFIX}-cardContent`,
  downloadIcon: `${PREFIX}-downloadIcon`,
  overlay: `${PREFIX}-overlay`,
  checkbox: `${PREFIX}-checkbox`,
};

const ImageCardRoot = styled("div")(({ theme }) => ({
  [`& .${classes.card}`]: {
    position: "relative", // 为了定位蒙版和复选框
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
  },
  [`& .${classes.cardMedia}`]: {
    paddingTop: "66.67%",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(101, 179, 238, 0.1)", // 这会给卡片添加阴影效果
  },
  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
  },
  [`& .${classes.downloadIcon}`]: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    padding: "3px",
    backgroundColor: "#eff9f5f4",
  },
  [`& .${classes.overlay}`]: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // 蒙版颜色和透明度
    borderRadius: "10px",
  },
  [`& .${classes.checkbox}`]: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 2, // 确保复选框在蒙版之上
  },
}));

interface ImageCardProps extends PixivImageInfoWithUrl {
  isOpenCheckbox: boolean;
  isChecked: boolean;
  onCheckboxChange: (checked: boolean) => void;
  onImageClick: (imageInfo: PixivImageInfoWithUrl) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  isOpenCheckbox,
  isChecked,
  onCheckboxChange,
  onImageClick,
  ...imageInfo
}) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(event.target.checked);
  };

  const handleImageClick = () => {
    if (!isChecked) {
      onImageClick(imageInfo);
    }
  };

  return (
    <ImageCardRoot>
      <Card className={classes.card}>
        {isOpenCheckbox && (
          <Checkbox
            className={classes.checkbox}
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
          />
        )}
        {isOpenCheckbox && isChecked && <div className={classes.overlay} />}

        <CardMedia
          className={classes.cardMedia}
          image={imageInfo.show_url}
          title={imageInfo.pixiv_image_meta_info.title}
          onClick={handleImageClick}
        />
        <Grid container alignItems="center">
          <Grid item>
            {imageInfo.download_url !== "" && (
              <IconButton
                aria-label="download"
                href={imageInfo.download_url}
                download
                className={classes.downloadIcon}
              >
                <DownloadIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs>
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="body1"
                component="h4"
                style={{ fontWeight: "bold" }}
              >
                {imageInfo.pixiv_image_meta_info.title || "无题"}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {imageInfo.pixiv_image_meta_info.author}
              </Typography>
              <CopyableText 
              text={imageInfo.pixiv_image_meta_info.pixiv_addr}
              variant="body2" 
              color="textSecondary" 
              component="p" />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </ImageCardRoot>
  );
};

export default ImageCard;

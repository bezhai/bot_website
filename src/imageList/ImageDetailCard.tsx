import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { PixivImageInfoWithUrl } from "../common/types/image";
import DetailCardMedia from "./DetailCardMedia";
import styles from "./ImageDetailCard.module.css";

interface ImageDetailCardProps extends PixivImageInfoWithUrl {
  onClose: () => void;
}

const ImageDetailCard: React.FC<ImageDetailCardProps> = ({
  onClose,
  ...imageInfo
}) => {
  return (
    <>
      <Box className={styles.backdrop} onClick={onClose} />
      <Card className={styles.detailCardRoot}>
        <Box className={styles.detailCardMediaContainer}>
          <DetailCardMedia url={imageInfo.show_url} title={imageInfo.pixiv_image_meta_info.title} />
        </Box>
        <Box className={styles.detailCardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            {imageInfo.pixiv_image_meta_info.title || "无题"}
          </Typography>
          <Typography variant="body1" component="h2">
            {imageInfo.pixiv_image_meta_info.author || "无题"}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default ImageDetailCard;

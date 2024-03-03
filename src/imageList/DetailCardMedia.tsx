import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";

interface DetailCardMediaProps {
  url: string;
  title: string;
}

const DetailCardMedia: React.FC<DetailCardMediaProps> = ({ ...imageInfo }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      // 最大宽度和高度限制
      const maxWidth = 600;
      const maxHeight = 800;

      // 按比例缩放图片
      const widthRatio = maxWidth / width;
      const heightRatio = maxHeight / height;
      const ratio = Math.min(widthRatio, heightRatio);

      const newWidth = width * ratio;
      const newHeight = height * ratio;

      console.log("width: %d, height: %d, ratio: %f, new_width:%d, new_height:%d",
             width, height, ratio, newWidth, newHeight);

      setDimensions({ width: newWidth, height: newHeight });
    };
    img.src = imageInfo.url;
  }, [imageInfo.url]);

  return (
    <CardMedia
      image={imageInfo.url}
      title={imageInfo.title}
      style={{
        // 应用动态计算的宽高
        width: dimensions.width,
        height: dimensions.height,
      }}
    />
  );
};

export default DetailCardMedia;

import React, { useState, useEffect } from "react";
import { Container, Grid, Box } from "@mui/material";
import {
  ListImageData,
  ListImageReq,
  PixivImageInfoWithUrl,
  StatusMode,
  UpdateImagesStatusReq,
  UpdateStatusMode,
} from "../common/types/image";
import { fetchImages, updateImagesStatus } from "../common/api";
import TopTabs from "../common/components/TopTabs";
import PaginationBar from "../common/components/PaginationBar";
import ImageCard from "./imageCard";
import imagePageLogo from "../assets/logo/image-page-logo.svg";
import useDocumentTitleAndIcon from "../common/utils/titleLogoConf";
import SearchComponent from "./SearchComponent";
import ControlPanel from "./ControlPanel";
import { StringBooleanMap } from "../common/types/basic";
import { deleteKey } from "../common/utils/tools";
import ImageDetailCard from "./ImageDetailCard";
import { useAtom } from "jotai";
import { showMessageAtom } from "../common/snackBar/snackbarAtoms";
import styles from "./ImagePage.module.css";

const ImagesPage: React.FC = () => {
  const [imagesData, setImagesData] = useState<ListImageData>({
    pixiv_image_meta_infos: [],
    total: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(16);
  const [searchParams, setSearchParams] = useState<ListImageReq>({});
  const [isOpenCheckbox, setIsOpenCheckbox] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<UpdateStatusMode>(
    StatusMode.Visible
  );
  const [selectImages, setSelectImages] = useState<StringBooleanMap>({});
  const [selectedImage, setSelectedImage] =
    useState<PixivImageInfoWithUrl | null>(null);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleImageClick = (imageInfo: PixivImageInfoWithUrl) => {
    setSelectedImage(imageInfo);
  };

  const handleCloseDetail = () => {
    setSelectedImage(null);
  };

  useDocumentTitleAndIcon("图库", imagePageLogo);

  useEffect(() => {
    const fetchImagesData = async () => {
      // 使用对象扩展运算符合并 page 和 pageSize 到 searchParams
      const filters: ListImageReq = {
        ...searchParams, // 包含搜索组件中的所有筛选条件
        page, // 添加或覆盖 page
        page_size: pageSize, // 添加或覆盖 pageSize
      };

      try {
        const response = await fetchImages(filters);
        if (
          response.status !== 200 ||
          response.data.code !== 0 ||
          !response.data.data
        ) {
          console.error("Failed to fetch images:", response.data);
          return;
        }
        setImagesData(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImagesData();
  }, [page, pageSize, searchParams, searchTrigger]);

  const handleSearch = (searchReq: ListImageReq) => {
    setSearchParams(searchReq);
    setPage(1);
    updateSearchTrigger();
  };

  const [, showMessage] = useAtom(showMessageAtom);

  const updateSearchTrigger = () => {
    setSearchTrigger((prev) => prev + 1);
  };

  const updateImagesStatusFunc = async (
    filters: UpdateImagesStatusReq
  ): Promise<void> => {
    try {
      const response = await updateImagesStatus(filters);
      const image_len = filters.pixiv_addr_list.length;
      const message = {
        [StatusMode.Visible]: `设置${image_len}张图片可见`,
        [StatusMode.NoVisible]: `隐藏${image_len}张图片`,
        [StatusMode.Delete]: `删除${image_len}张图片`,
      }[filters.status];
      if (response.status !== 200 || response.data.code !== 0) {
        console.error("Failed to update images status:", response.data);
        showMessage({ message: "更新图片状态失败", severity: "error" });
      } else {
        showMessage({ message: `成功${message}`, severity: "success" });
        setSelectImages({});
        updateSearchTrigger();
      }
    } catch (error) {
      console.error("Error updating images status:", error);
    }
  };

  const handleSelectImages = (pixiv_addr: string, checked: boolean) => {
    if (checked) {
      setSelectImages({ ...selectImages, [pixiv_addr]: true });
    } else {
      setSelectImages(deleteKey(selectImages, pixiv_addr));
    }
  };

  return (
    <Box>
      {selectedImage && (
        <ImageDetailCard onClose={handleCloseDetail} {...selectedImage} />
      )}
      <TopTabs />
      <Container className={styles.container} maxWidth="xl">
        <SearchComponent onSearch={handleSearch} />
        <ControlPanel
          isOpenCheckbox={isOpenCheckbox}
          updateIsOpenCheckbox={(isOpen: boolean) => setIsOpenCheckbox(isOpen)}
          currentStatus={currentStatus}
          updateStatus={(status: UpdateStatusMode) => setCurrentStatus(status)}
          submit={() =>
            updateImagesStatusFunc({
              pixiv_addr_list: Object.keys(selectImages),
              status: currentStatus,
            })
          }
          hasSelectedItem={Object.keys(selectImages).length > 0}
        />
        <Grid container spacing={4}>
          {imagesData.pixiv_image_meta_infos.map((imageInfo) => (
            <Grid item key={imageInfo.pixiv_image_meta_info.pixiv_addr} xs={12} sm={6} md={3}>
              <ImageCard
                onImageClick={(imageInfo: PixivImageInfoWithUrl) => {
                  handleImageClick(imageInfo);
                }}
                onCheckboxChange={(checked: boolean) => {
                  handleSelectImages(imageInfo.pixiv_image_meta_info.pixiv_addr, checked);
                }}
                isOpenCheckbox={isOpenCheckbox}
                isChecked={selectImages.hasOwnProperty(imageInfo.pixiv_image_meta_info.pixiv_addr)}
                {...imageInfo}
              />
            </Grid>
          ))}
        </Grid>
        <PaginationBar
          totalPages={Math.ceil(imagesData.total / pageSize)}
          page={page}
          setPage={setPage}
        ></PaginationBar>
      </Container>
    </Box>
  );
};

export default ImagesPage;

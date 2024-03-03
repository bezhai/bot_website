import { Container, Stack, Box, Divider } from "@mui/material";
import TopTabs from "../common/components/TopTabs";
import confIcon from "../assets/logo/settings.png";
import { KEYS, LIST_KEYS } from "./config";
import useDocumentTitleAndIcon from "../common/utils/titleLogoConf";
import TagEditor from "./TagEditor";
import ConfigItem from "./ConfigItem";
import {
  setStringValue,
  fetchStringValue,
  getTagValue,
  updateTagValues,
} from "./appUtil";
import SidebarNavigation from "./SidebarNavigation";
import { useAtom } from "jotai";
import { showMessageAtom } from "../common/snackBar/snackbarAtoms";

function ConfApp() {
  const [, showMessage] = useAtom(showMessageAtom);

  const confShowMessage = (key: string, code: number) => {
    if (code === 0) {
      showMessage({ message: `${key} 设置成功`, severity: "success" });
    } else {
      showMessage({ message: `${key} 设置失败`, severity: "error" });
    }
  };

  useDocumentTitleAndIcon("配置", confIcon);

  // 导航到页面中的指定key位置
  const scrollToKey = (key: string) => {
    // 检查是否是LIST_KEYS中的key，如果是，则添加前缀
    const elementId = LIST_KEYS.includes(key) ? `tag-${key}` : key;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box>
      <TopTabs />
      <Container maxWidth="xl" sx={{ mt: 3, ml: 1 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <SidebarNavigation
            keys={KEYS.concat(LIST_KEYS)}
            onKeySelect={scrollToKey}
          />
          <Divider orientation="vertical" flexItem />
          <Stack spacing={3} sx={{ width: "100%" }}>
            {KEYS.map((key) => (
              <ConfigItem
                key={key}
                keyName={key}
                confShowMessage={confShowMessage}
                onValueChange={setStringValue}
                fetchValue={fetchStringValue}
              />
            ))}
            {LIST_KEYS.map((key) => (
              <TagEditor
                key={key}
                keyName={key}
                confShowMessage={confShowMessage}
                getTagValue={getTagValue}
                updateTagValue={updateTagValues}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default ConfApp;

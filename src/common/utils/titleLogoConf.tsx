import { useEffect } from "react";

function useDocumentTitleAndIcon(title: string, iconHref: string) {
  useEffect(() => {
    // 设置文档标题
    document.title = title;

    // 查找并设置图标链接
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = iconHref;
    }
  }, [title, iconHref]); // 依赖数组包含title和iconHref，当它们变化时重新运行副作用
}

export default useDocumentTitleAndIcon;

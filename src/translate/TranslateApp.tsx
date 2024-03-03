import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Box } from "@mui/material";
import {
  getUntranslatedWords,
  submitTranslation,
  deleteTranslation,
} from "../common/api"; // 导入API函数
import SearchBar from "./SearchBar";
import PaginationBar from "../common/components/PaginationBar";
import TranslationCard, { Word } from "./TranslationCard";
import TopTabs from "../common/components/TopTabs";
import translateIcon from "../assets/logo/translating.png";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../common/types/basic";
import { UnTranslateData } from "../common/types/translate";
import useDocumentTitleAndIcon from "../common/utils/titleLogoConf";
import { useAtom } from "jotai";
import { showMessageAtom } from "../common/snackBar/snackbarAtoms";

function TranslationApp() {
  interface Translation {
    word: Word;
    translation: string;
    num: number;
  }
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page_size] = useState<number>(10);
  const [searchKey, setSearchKey] = useState<string>("");
  const searchKeyRef = useRef<string>(searchKey);

  useDocumentTitleAndIcon("翻译", translateIcon);

  useEffect(() => {
    searchKeyRef.current = searchKey;
  }, [searchKey]);

  // 获取未翻译的词
  const fetchUntranslatedWords = useCallback(() => {
    getUntranslatedWords(page, page_size, searchKeyRef.current).then(
      (response: AxiosResponse<ApiResponse<UnTranslateData>>) => {
        if (
          response.status !== 200 ||
          response.data.code !== 0 ||
          !response.data.data
        ) {
          console.error("Failed to fetch untranslated words:", response.data);
          return;
        }
        const resp_data = response.data.data;
        if (resp_data.total > 0) {
          setTranslations(
            resp_data.list.map((item) => ({
              word: {
                origin: item.word.origin,
                extra_info: {
                  zh: item.word.extra_info?.zh,
                  en: item.word.extra_info?.en,
                },
              },
              translation: item.word.translation || "",
              num: item.num,
            }))
          );
          setTotalPages(Math.ceil(resp_data.total / page_size)); // 更新总页数
        }
      }
    );
  }, [page, page_size, searchKeyRef]);

  useEffect(() => {
    fetchUntranslatedWords();
  }, [fetchUntranslatedWords]);

  const handleSearch = () => {
    setPage(1); // 搜索时重置页码为1
    fetchUntranslatedWords(); // 触发搜索
  };

  // 更新翻译
  const updateTranslation = (index: number, translation: string) => {
    setTranslations(
      translations.map((word, i) =>
        i === index ? { ...word, translation } : word
      )
    );
  };

  const [, showMessage ] = useAtom(showMessageAtom);

  // 提交翻译
  const innerSubmitTranslation = (word: string, index: number) => {
    const translation = translations[index].translation;
    submitTranslation(word, translation).then((response) => {
      if (response.data.code === 0) {
        // 更新未翻译的词列表
        fetchUntranslatedWords();
        showMessage({message: "Translation submitted successfully!", severity: "success"});
      } else {
        showMessage({message: "Translation submitted fail!", severity: "error"});
      }
    });
  };

  // 删除翻译
  const innerDeleteTranslation = (word: string) => {
    deleteTranslation(word).then((response) => {
      if (response.data.code === 0) {
        // 更新未翻译的词列表
        fetchUntranslatedWords();
        showMessage({message: "Translation deleted successfully!", severity: "warning"});
      } else {
        showMessage({message: "Translation deleted fail!", severity: "error"});
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    if (e.target.value === "") {
      handleSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopTabs />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <SearchBar
          searchKey={searchKey}
          handleSearchChange={handleSearchChange}
          handleKeyDown={handleKeyDown}
          handleSearchIconClick={handleSearch}
        />
        {translations.map((word, index) => (
          <TranslationCard
            key={word.word.origin}
            word={word}
            index={index}
            updateTranslation={updateTranslation}
            submitTranslation={innerSubmitTranslation}
            deleteTranslation={innerDeleteTranslation}
          />
        ))}
        <PaginationBar totalPages={totalPages} page={page} setPage={setPage} />
      </Container>
    </Box>
  );
}

export default TranslationApp;

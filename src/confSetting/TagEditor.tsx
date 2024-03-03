import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import { Tag } from "../common/types/conf";
import { useCallback, useEffect, useState } from "react";

interface TagEditorProps {
  keyName: string;
  confShowMessage: (key: string, code: number) => void;
  getTagValue: (keyName: string) => Promise<string[] | undefined>;
  updateTagValue: (keyName: string, values: string[]) => Promise<number>;
}

const TagEditor: React.FC<TagEditorProps> = ({ 
  keyName, 
  confShowMessage,
  getTagValue,
  updateTagValue 
}) => {

  const [tags, setTags] = useState<Tag[]>([]);

  const initTagValue = useCallback(async () => {
    const tagValue = await getTagValue(keyName);
    setTags(
      tagValue
        ? tagValue.map((tag, index) => ({
            id: String(index),
            text: tag,
          }))
        : []
    );
  }, [keyName, setTags, getTagValue]);

  useEffect(() => {
    initTagValue();
  }, [initTagValue]);

  const handleAddition = (
    _event: React.SyntheticEvent,
    newValue: (string | Tag)[],
    key: string
  ) => {
    // 获取新标签的文本值
    const newTag = newValue[newValue.length - 1];
    let newTagText: string;

    // 确保 newTagText 是一个字符串
    if (typeof newTag === "string") {
      newTagText = newTag;
    } else {
      newTagText = newTag.text;
    }

    // 检查是否已经存在该标签，避免重复
    if (!tags.some((tag) => tag.text === newTagText)) {
      const newTagObject = { id: String(tags.length), text: newTagText };
      setTags((prevTags) => ([...prevTags, newTagObject]));
    }
  };

  const handleDelete = (chipToDelete: Tag, key: string) => {
    setTags((prevTags) => (prevTags.filter((chip) => chip.id !== chipToDelete.id)));
  };

  const setTagValue = async (key: string, values: Tag[]) => {
    try {
      const value = values.map((tag) => tag.text);
      const resp_code = await updateTagValue(key, value);
      confShowMessage(key, resp_code);
    } catch (error) {
      console.error("Error setting member value:", error);
    }
  };

  return (
    <Box
      key={keyName}
      sx={{
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
      }}
    >
      <Autocomplete
        id={`tag-${keyName}`}
        multiple
        options={[]}
        freeSolo
        value={tags || []}
        onChange={(event, newValue) => handleAddition(event, newValue, keyName)}
        getOptionLabel={(option) => {
          return typeof option === "string" ? option : option.text;
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.text}
              {...getTagProps({ index })}
              onDelete={() => handleDelete(option, keyName)}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={keyName}
            placeholder="Add new item"
            fullWidth
            sx={{
              transition: "box-shadow .3s",
              "&:hover": { boxShadow: 2 },
            }}
          />
        )}
        sx={{
          width: "calc(100% - 15px)", // 减去左侧导航栏的宽度
          marginLeft: "15px", // 对齐到左侧导航栏的右侧
          // ...
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => setTagValue(keyName, tags)}
      >
        提交
      </Button>
    </Box>
  );
};

export default TagEditor;

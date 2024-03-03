import {
  getRedisValue,
  setRedisValue,
  getRedisMemberValue,
  setRedisMemberValue,
} from "../common/api";

export const fetchStringValue = async (
  key: string
): Promise<string | undefined> => {
  try {
    const response = await getRedisValue(key);
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data?.value;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Error fetching value:", error);
  }
};

export const setStringValue = async (key: string, value: string) => {
  try {
    const response = await setRedisValue(key, value);
    return response.data.code
  } catch (error) {
    console.error("Error setting value:", error);
  }
};

export const getTagValue = async (
  key: string
): Promise<string[] | undefined> => {
  try {
    const response = await getRedisMemberValue(key);
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data?.value;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Error fetching member value:", error);
  }
};

export const updateTagValues = async (
  keyName: string,
  values: string[]
): Promise<number> => {
  try {
    const response = await setRedisMemberValue(keyName, values);
    return response.data.code;
  } catch (error) {
    console.error("Error setting member value:", error);
    return -1;
  }
};

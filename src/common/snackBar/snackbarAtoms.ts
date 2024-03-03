import { atom } from 'jotai';
import { SnackbarMessage, SnackbarSeverityType } from "./types";
import {v4 as uuidv4} from "uuid";

// Snackbar 消息列表
export const snackbarsAtom = atom<SnackbarMessage[]>([]);

// 显示 Snackbar 消息
export const showMessageAtom = atom(
  null,
  (get, set, { message, severity }: { message: string; severity: SnackbarSeverityType }) => {
    const key = uuidv4();
    const newSnackbar: SnackbarMessage = { key, message, severity };
    set(snackbarsAtom, [...get(snackbarsAtom), newSnackbar]);
    
    // 设置6秒后自动关闭
    setTimeout(() => {
      set(snackbarsAtom, (prevSnackbars) => prevSnackbars.filter(snackbar => snackbar.key !== key));
    }, 6000);
  }
);

// 关闭 Snackbar 消息
export const closeSnackbarAtom = atom(
  null,
  (_, set) => {
    set(snackbarsAtom, []);
  }
);
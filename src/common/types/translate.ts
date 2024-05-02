export interface Extra {
  zh: string;
  en: string;
}

export interface TranslateWord {
  origin: string;
  translation: string | null;
  has_translate: boolean;
  extra_info: Extra | null;
}

export interface TranslateWithNum extends TranslateWord {
  num: number;
}

export interface UnTranslateData {
  data: TranslateWithNum[];
  total: number;
}


export interface ConfigValues {
  [key: string]: string;
}

export interface Tag {
  id: string;
  text: string;
}

export interface ConfigTags {
  [key: string]: Tag[];
}

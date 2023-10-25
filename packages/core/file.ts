import { File, Asset } from "db";

export type { File, Asset } from "db";

export type FullFile = File & { assets: Asset[] };

export function getUrl(file: FullFile, label?: string) {
  return file.assets.filter((a) => a.label === label).at(0)?.url || file.url;
}

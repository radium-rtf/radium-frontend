export enum FileType {
  zip = 1,
  jpg = 2,
  jpeg = 4,
  all = ~(~0 << Object.keys(FileType).filter((v) => isNaN(Number(v))).length),
}

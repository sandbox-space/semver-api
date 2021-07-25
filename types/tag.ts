type TagName = string;

export type TagList = Array<TagName>;

export type TagRequestParams = {
  repository: string,
  filter?: string | undefined
  against?: string | undefined
}
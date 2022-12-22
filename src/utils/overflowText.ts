import { css } from "styled-components";

export const overflowOneLineText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * @params
 * lines 몇줄인지 주어야하고
 * line-height가 필수입니다
 *
 */
type Props = {
  lines: number;
};
export const overflowMultiLineText = css<Props>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: normal;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(p) => p.lines};
`;

import type { Column, Header, ColumnDef } from "@tanstack/react-table";
import { columnWidth } from "../model/column.width";
import type { HistoryItem } from "@/entities";
import { TABLE_COLUMN_RIGHT_ALIGN_COLUMNS } from "../model/constant";

/**
 * Column에서 ID 추출
 */
export const getColumnId = (column: Column<HistoryItem, unknown>): string => {
  return column.id;
};

/**
 * Header에서 Column ID 추출
 */
export const getColumnIdFromHeader = (header: Header<HistoryItem, unknown>): string => {
  return header.column.id;
};

/**
 * Column Widths 계산 및 CSS Variables 생성
 * column.width.ts를 활용하여 width 계산
 */
export const calculateColumnWidths = (columns: ColumnDef<HistoryItem>[]) => {
  const columnWidths: Record<string, number> = {};
  const cssVariables: Record<string, string> = {};

  columns.forEach((column) => {
    const columnId = column.id;
    if (!columnId) return;

    // column.width.ts에서 width 가져오기
    const width = columnWidth[columnId as keyof typeof columnWidth] || column.size || column.minSize || 0;

    columnWidths[columnId] = width;
    cssVariables[`--col-${columnId}-width`] = `${width}px`;
  });

  return {
    columnWidths,
    cssVariables,
  };
};

/**
 * 우측 정렬 컬럼 목록 반환
 */
export const getRightAlignColumns = (): string[] => {
  return TABLE_COLUMN_RIGHT_ALIGN_COLUMNS;
}

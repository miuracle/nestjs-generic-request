export class Dto {}

export type GenericClass = new (...args: any[]) => Dto;

export enum BuilerOperator {
  EQUAL = '$eq',
  NOT_EQUAL = '$ne',
  GREATER_THAN = '$gt',
  LOWER_THAN = '$lt',
  GREATER_THAN_OR_EQUAL = '$gte',
  LOWER_THAN_OR_EQUAL = '$lte',
  BETWEEN = '$between',
}

export enum SortDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface FilterBy {
  field: string;

  operator: BuilerOperator;

  value: string;
}

export interface SortBy {
  field: string;

  order: SortDir;
}

export interface RequestBuilderResult {
  field: string;
  filter: string[];
  sort: string[];
  limit: number;
  offset: number;
}

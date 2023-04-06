import {
  FilterBy,
  GenericClass,
  BuilerOperator,
  RequestBuilderResult,
  SortBy,
  SortDir,
} from '../types/client';

export function RequestBuilder<Entity>(Entity: GenericClass) {
  class Builder {
    fields?: (keyof Entity)[];

    filters?: FilterBy[];

    sorts: SortBy[];

    limit: number;

    offset: number;

    constructor() {
      this.fields = [];
      this.filters = [];
      this.sorts = [];
      this.limit = 10;
      this.offset = 0;
    }

    setLimit(limit: number) {
      this.limit = limit;
      return this;
    }

    setOffset(offset: number) {
      this.offset = offset;
      return this;
    }

    setPage(page: number) {
      this.offset = (page - 1) * this.limit;
      return this;
    }

    setFields(fields: (keyof Entity)[]) {
      this.fields = fields;
      return this;
    }

    addFields(fields: (keyof Entity)[]) {
      this.fields.push(...fields);
      return this;
    }

    addField(field: keyof Entity) {
      this.fields.push(field);
      return this;
    }

    setFilters(filters: FilterBy[]) {
      this.filters = filters;
      return this;
    }

    addFilters(filters: FilterBy[]) {
      this.filters.push(...filters);
      return this;
    }

    addFilter(filter: FilterBy) {
      this.filters.push(filter);
      return this;
    }

    setSorts(sorts: SortBy[]) {
      this.sorts = sorts;
      return this;
    }

    addSorts(sorts: SortBy[]) {
      this.sorts.push(...sorts);
      return this;
    }

    addSort(sort: SortBy) {
      this.sorts.push(sort);
      return this;
    }

    build(): RequestBuilderResult {
      return {
        field: this.fields.join(','),
        filter: this.filters.reduce((result, item) => {
          result.push(`${item.field}||${item.operator}||${item.value}`);
          return result;
        }, []),
        limit: this.limit,
        offset: this.offset,
        sort: this.sorts.reduce((result, item) => {
          result.push(`${item.field}||${item.order}`);
          return result;
        }, []),
      };
    }
  }

  return new Builder();
}

export class User {
  username: string;

  createdAt: Date;

  age: number;
}

const query = RequestBuilder<User>(User)
  .addFields(['username', 'age'])
  .addFilter({ field: 'username', operator: BuilerOperator.EQUAL, value: 'john' })
  .setSorts([{ field: 'createdAt', order: SortDir.ASC }])
  .build();

console.log(query);

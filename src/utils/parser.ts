import { GenericClass, RequestBuilderResult } from '../types/client';
import { FindManyOptions, ParserOperator } from '../types/server';
import { User } from './builder';

export function RequestParser<Entity>(Entity: GenericClass) {
  class Parser implements RequestBuilderResult {
    field: string;
    filter: string[];
    sort: string[];
    limit: number;
    offset: number;

    initialize(data: RequestBuilderResult) {
      Object.assign(this, data);
      return this;
    }

    parse(): FindManyOptions {
      const where = this.filter.reduce((obj, item) => {
        const s = item.split('||');

        Object.assign(obj, { [s[0]]: ParserOperator[s[1]](s[2]) });

        return obj;
      }, {});

      return {
        select: this.field.split(','),
        where,
        skip: 0,
        take: 0,
        order: {},
      };
    }
  }

  return new Parser();
}

const ee = RequestParser<User>(User)
  .initialize({
    field: 'username,age',
    filter: ['username||$eq||john'],
    limit: 10,
    offset: 0,
    sort: ['createdAt||ASC'],
  })
  .parse();

console.log(ee);

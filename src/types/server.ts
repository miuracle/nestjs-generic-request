import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { BuilerOperator } from './client';
import { Equal } from 'typeorm/find-options/operator/Equal';
import { Not } from 'typeorm/find-options/operator/Not';
import { MoreThan } from 'typeorm/find-options/operator/MoreThan';
import { LessThan } from 'typeorm/find-options/operator/LessThan';
import { MoreThanOrEqual } from 'typeorm/find-options/operator/MoreThanOrEqual';
import { LessThanOrEqual } from 'typeorm/find-options/operator/LessThanOrEqual';
import { Between } from 'typeorm/find-options/operator/Between';

const ParserOperator = {};

ParserOperator[BuilerOperator.EQUAL] = Equal;
ParserOperator[BuilerOperator.BETWEEN] = Between;
ParserOperator[BuilerOperator.GREATER_THAN] = MoreThan;
ParserOperator[BuilerOperator.GREATER_THAN_OR_EQUAL] = MoreThanOrEqual;
ParserOperator[BuilerOperator.LOWER_THAN] = LessThan;
ParserOperator[BuilerOperator.NOT_EQUAL] = Not;
ParserOperator[BuilerOperator.LOWER_THAN_OR_EQUAL] = LessThanOrEqual;

export { ParserOperator, FindManyOptions };

import { isMap } from 'lodash';
import type { SelectGoProps } from './index';

export const fromValueEnum = (valueEnum: SelectGoProps['valueEnum']) => {
  if (!valueEnum) return [];

  if (isMap(valueEnum)) return Array.from(valueEnum).map(([value, label]) => ({ label, value }));

  return Object.entries(valueEnum).reduce((a: any, [value, label]) => [...a, { label, value }], []);
};

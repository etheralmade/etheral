import { snakeCase } from 'lodash';

export const renderName = (str: string) => snakeCase(str).toUpperCase();

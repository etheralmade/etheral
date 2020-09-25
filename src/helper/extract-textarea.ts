import { snakeCase } from 'lodash';

/**
 * function to extract options from a textarea
 * @param textarea textarea input (e.g sizes: S, M, L)
 */
export const extractTextArea = (textarea: string) =>
    textarea.split(',').map(text => snakeCase(text).toUpperCase());

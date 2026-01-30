import { HttpError } from '@/utils/errors';

export const getParam = (value: string | string[] | undefined): string => {
  const val = Array.isArray(value) ? value[0] : value;

  if (!val) throw new HttpError(400, "Missing route parameter", "MISSING_PARAM");

  return val;
}
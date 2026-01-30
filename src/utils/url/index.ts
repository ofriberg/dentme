import { HttpError } from '@/utils/errors';


// just a simple function since url.params can be both a string or array (or undefined),
// could also have done this in app.ts, since it's only used once
// in this repo in it's current state
export const getParam = (value: string | string[] | undefined): string => {
  const val = Array.isArray(value) ? value[0] : value;

  if (!val) throw new HttpError(400, "Missing route parameter", "MISSING_PARAM");

  return val;
}
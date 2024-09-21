import { isNumber, isString } from 'util';

export const isNotEmptyString = (value: string): boolean => {
  return isString(value) && value.trim() !== '';
};

export const isPositiveInteger = (value: string | number): boolean => {
  if (isNumber(value)) {
    return value > 0 && Number.isInteger(value);
  }
  if (isString(value)) {
    return /^[1-9]\d*$/.test(value);
  }
  return false;
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};
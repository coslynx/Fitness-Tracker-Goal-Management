import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date, formatString?: string) => {
  if (!date) return '';

  return formatString
    ? format(date, formatString)
    : format(date, 'MMMM do, yyyy');
};

export const formatTime = (date: Date) => {
  if (!date) return '';

  return format(date, 'h:mm a');
};

export const formatDateTime = (date: Date) => {
  if (!date) return '';

  return format(date, 'MMMM do, yyyy, h:mm a');
};

export const formatDistance = (date: Date) => {
  if (!date) return '';

  return formatDistanceToNow(date, { addSuffix: true });
};
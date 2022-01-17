export const sanitizeHtmlTags = string => string.replace(/<[^>]*>/g, '');

import { CodeErrorsEnum } from '@/protocols/code-errors.type';

export const formatResponseError = (data: {
  code: CodeErrorsEnum;
  message: string;
}) => {
  return {
    error_code: data.code,
    error_description: data.message,
  };
};

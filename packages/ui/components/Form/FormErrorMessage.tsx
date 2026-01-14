import { type ComponentProps } from 'react';

import { useFormField } from './FormField.context';

export type FormErrorMessageProps = ComponentProps<'p'>;

export const FormErrorMessage = ({
  children,
  ...restProps
}: FormErrorMessageProps) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <div id={formMessageId}>
      <p {...restProps}>{body}</p>
    </div>
  );
};

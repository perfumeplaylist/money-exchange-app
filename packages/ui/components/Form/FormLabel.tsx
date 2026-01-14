import { type ComponentProps } from 'react';

import { useFormField } from './FormField.context';

export type FormLabelProps = ComponentProps<'label'> & {
  required?: boolean;
};

export const FormLabel = ({
  children,
  className,
  required,
  ...restProps
}: FormLabelProps) => {
  const { formItemId } = useFormField();
  return (
    <label {...restProps} htmlFor={formItemId} className={className}>
      {children}
      {/* TODO: RequiredIcon 컴포넌트 추가 */}
      {required && <span>*</span>}
    </label>
  );
};

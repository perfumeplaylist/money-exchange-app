import { type ComponentProps, useId } from 'react';

import { FormItemContext } from './FormField.context';

export type FormItemProps = ComponentProps<'div'>;
export const FormItem = ({
  children,
  className,
  ...restProps
}: FormItemProps) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div {...restProps} className={className}>
        {children}
      </div>
    </FormItemContext.Provider>
  );
};

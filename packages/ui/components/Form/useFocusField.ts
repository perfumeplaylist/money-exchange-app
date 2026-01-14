import { useState } from 'react';

export default function useFocusField() {
  const [focusField, setFocusField] = useState<string | null>(null);

  const getFocusProps = (name: string) => ({
    onFocus: () => setFocusField(name),
    onBlur: () => setFocusField(null),
  });

  return { focusField, getFocusProps };
}

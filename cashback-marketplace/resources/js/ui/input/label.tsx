import type { LabelHTMLAttributes, ReactNode } from 'react';

import { clsx } from 'clsx';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    className?: string;
}

export const InputLabel = ({ className, children, ...props }: Props) => (
    <label {...props} className={clsx('block font-medium text-sm text-white', className)}>
        {children}
    </label>
);

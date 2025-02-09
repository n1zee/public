import type { InputHTMLAttributes, MutableRefObject } from 'react';
import React, { forwardRef, useEffect } from 'react';

import { clsx } from 'clsx';

import { InputError } from '@/ui/input/error';
import { InputLabel } from '@/ui/input/label';

interface Props<T> extends InputHTMLAttributes<T> {
    isFocused?: boolean;
    className?: string;
    containerClassName?: string;
    label?: string;
    errorMessage?: string;
    rows?: number;
}

const useFocus = <T extends HTMLElement>(isFocused: boolean, ref: MutableRefObject<T | null>) => {
    useEffect(() => {
        if (isFocused && ref && ref.current) {
            ref.current.focus();
        }
    }, [isFocused]);
};

export const TextInput = forwardRef<HTMLInputElement, Props<HTMLInputElement>>(
    (
        {
            className,
            containerClassName,
            label,
            isFocused = false,
            errorMessage,
            ...props
        }: Props<HTMLInputElement>,
        ref,
    ) => {
        useFocus(isFocused, ref as MutableRefObject<HTMLInputElement | null>);

        return (
            <div className={containerClassName}>
                {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
                <input
                    {...props}
                    className={clsx(
                        'bg-black px-4 py-2.5 focus:outline-none rounded-md shadow-sm',
                        className,
                    )}
                    ref={ref}
                />
                <InputError message={errorMessage} className="mt-2" />
            </div>
        );
    },
);

export const TextArea = forwardRef<HTMLTextAreaElement, Props<HTMLTextAreaElement>>(
    (
        {
            className,
            containerClassName,
            label,
            isFocused = false,
            errorMessage,
            ...props
        }: Props<HTMLTextAreaElement>,
        ref,
    ) => {
        useFocus(isFocused, ref as MutableRefObject<HTMLTextAreaElement | null>);

        return (
            <div className={containerClassName}>
                {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
                <textarea
                    {...props}
                    className={clsx(
                        'bg-black px-4 py-2 focus:outline-none rounded-md shadow-sm',
                        className,
                    )}
                    ref={ref}
                />
                <InputError message={errorMessage} className="mt-2" />
            </div>
        );
    },
);

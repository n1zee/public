import type { ChangeEvent } from 'react';

export const createSetInertiaInputDataHandler =
    <T extends Record<string, any>>(setData: (key: keyof T, value: T[keyof T]) => void) =>
    (inputName: keyof T) =>
    (e: ChangeEvent<any>) =>
        setData(
            inputName,
            e.target.type === 'checkbox'
                ? (e.target.checked as T[keyof T])
                : (e.target.value as T[keyof T]),
        );

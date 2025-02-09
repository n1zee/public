import { clsx } from 'clsx';

interface Props {
    message?: string;
    className?: string;
}

export const InputError = ({ message, className }: Props) => {
    if (!message) return null;

    return <p className={clsx('text-sm text-red-600', className)}>{message}</p>;
};

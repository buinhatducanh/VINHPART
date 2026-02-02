'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="light"
            position="bottom-left"
            richColors
            duration={3000}
            gap={10}
            visibleToasts={3}
            dir="ltr"
            toastOptions={{
                classNames: {
                    toast:
                        'sonner-toast bg-white text-[var(--color-text)] font-medium text-sm py-3 px-4 shadow-lg border border-[var(--color-border)]',
                    success:
                        'sonner-toast-success bg-emerald-50 text-emerald-700 border-emerald-200',
                    error:
                        'sonner-toast-error bg-red-50 text-red-700 border-red-200',
                    warning:
                        'sonner-toast-warning bg-amber-50 text-amber-700 border-amber-200',
                    info:
                        'sonner-toast-info bg-blue-50 text-blue-700 border-blue-200',
                    loading:
                        'sonner-toast-loading bg-blue-50 text-blue-700 border-blue-200',
                },
            }}
            {...props}
        />
    );
};

export { Toaster };

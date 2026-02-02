'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    fullWidth?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            loading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            className = '',
            ...props
        },
        ref
    ) => {
        const baseStyles = `
            inline-flex items-center justify-center gap-2
            font-semibold rounded-xl
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
        `

        const variants = {
            primary: `
                bg-gradient-to-r from-blue-500 to-purple-600 text-white
                hover:from-blue-600 hover:to-purple-700
                focus:ring-blue-500/50
                shadow-lg shadow-blue-500/25
            `,
            secondary: `
                bg-white/10 text-white border border-white/20
                hover:bg-white/20
                focus:ring-white/50
            `,
            outline: `
                bg-transparent border-2 border-blue-500 text-blue-400
                hover:bg-blue-500/10
                focus:ring-blue-500/50
            `,
            ghost: `
                bg-transparent text-slate-300
                hover:bg-white/10 hover:text-white
                focus:ring-white/50
            `
        }

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2.5 text-base',
            lg: 'px-6 py-3 text-lg'
        }

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={`
                    ${baseStyles}
                    ${variants[variant]}
                    ${sizes[size]}
                    ${fullWidth ? 'w-full' : ''}
                    ${className}
                `}
                {...props}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>Đang xử lý...</span>
                    </>
                ) : (
                    <>
                        {leftIcon}
                        {children}
                        {rightIcon}
                    </>
                )}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }

import { ReactNode, HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    children: ReactNode
}

const Card = ({
    variant = 'glass',
    padding = 'lg',
    children,
    className = '',
    ...props
}: CardProps) => {
    const variants = {
        default: 'bg-white border border-gray-200 shadow-lg',
        glass: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl'
    }

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    }

    return (
        <div
            className={`
                rounded-2xl
                ${variants[variant]}
                ${paddings[padding]}
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    )
}

export { Card }

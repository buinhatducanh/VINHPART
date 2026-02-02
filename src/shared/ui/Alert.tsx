import { ReactNode, HTMLAttributes } from 'react'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'error' | 'success' | 'warning' | 'info'
    icon?: boolean
    children: ReactNode
}

const Alert = ({
    type = 'error',
    icon = true,
    children,
    className = '',
    ...props
}: AlertProps) => {
    const types = {
        error: {
            bg: 'bg-red-500/10 border-red-500/20',
            text: 'text-red-400',
            iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        success: {
            bg: 'bg-green-500/10 border-green-500/20',
            text: 'text-green-400',
            iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        warning: {
            bg: 'bg-yellow-500/10 border-yellow-500/20',
            text: 'text-yellow-400',
            iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        },
        info: {
            bg: 'bg-blue-500/10 border-blue-500/20',
            text: 'text-blue-400',
            iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
    }

    const config = types[type]

    return (
        <div
            className={`
                p-4 border rounded-xl
                ${config.bg} ${config.text}
                text-sm flex items-center gap-3
                ${className}
            `}
            role="alert"
            {...props}
        >
            {icon && (
                <svg
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={config.iconPath}
                    />
                </svg>
            )}
            <span>{children}</span>
        </div>
    )
}

export { Alert }

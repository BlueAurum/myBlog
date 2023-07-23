import { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import s from './button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    ...props
}) => {

    return (
        <button
            {...props}
            className={cn(
                s.btn,
                s[variant],
                s[size],
                { [s.disabled]: disabled },
                props.className
            )}
        >
            {children}
        </button>
    )
}

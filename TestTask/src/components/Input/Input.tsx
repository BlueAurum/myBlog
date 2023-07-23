import { FC, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import s from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean
}

//для Input с типом password можно было бы добавить глазик который делает пароль видимым
export const Input: FC<InputProps> = ({ isError, ...props }) => {
    return <input {...props} className={cn(s.input, { [s.error]: isError }, props.className)} />
}
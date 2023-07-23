import { FC } from 'react'
import s from './error.module.scss'

export const Error: FC = () => {
    return (
        <div className={s.error}>
            <h1 className={s.title}>Такой страницы нет !!!</h1>
            <span className={s.icon}>☹️</span>
        </div>
    )
}

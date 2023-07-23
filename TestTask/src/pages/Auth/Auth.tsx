import { FC, useState } from 'react'
import { RegistrationForm, SignInForm } from '../../features'
import cn from 'classnames'
import s from './auth.module.scss'

export const Auth: FC = () => {
    const [isActiveForm, setIsActiveForm] = useState('registration')

    return (
        <div className={s.auth}>
            <h1 className={s.title}>
                <span onClick={() => setIsActiveForm('registration')} className={cn({ [s.active]: isActiveForm === 'registration' })}>
                    Зарегистрироваться
                </span>
                /
                <span onClick={() => setIsActiveForm('signin')} className={cn({ [s.active]: isActiveForm === 'signin' })}>
                    Войти
                </span>
            </h1>
            {
                isActiveForm === 'registration' ? <RegistrationForm /> : <SignInForm />
            }
        </div>
    )
}

import { FC } from 'react'
import { useNavigate } from 'react-router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { signInUser, selectUser } from '../../store/slices/auth'
import { IUserAuth } from '../../shared/types/auth'
import { Input, Button } from '../../components'
import s from './signIn.module.scss'

export const SignInForm: FC = () => {

    const dispatch = useAppDispatch()

    const { isAuth } = useAppSelector(selectUser)

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUserAuth>({
        defaultValues: {
            email: 'yibragimov555@gmail.com',
            password: '123123123',
        },
    })

    const submitHandler: SubmitHandler<IUserAuth> = async data => {

        dispatch(signInUser(data))

        reset()
    }

    if (isAuth) {
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
            <label className={s.label}>
                <span className={s.labelText}>Email</span>
                <Controller
                    name='email'
                    control={control}
                    rules={{ required: 'Email required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            type='email'
                            isError={!!errors.email}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.email && (
                    <div className={s.errorMessage}>{errors.email.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>Password</span>
                <Controller
                    name='password'
                    control={control}
                    rules={{ required: 'Password required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            type='password'
                            isError={!!errors.password}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.password && (
                    <div className={s.errorMessage}>{errors.password.message}</div>
                )}
            </label>
            <Button type='submit' variant='primary'>
                Войти
            </Button>
        </form>
    )
}

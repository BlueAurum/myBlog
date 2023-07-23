import { FC } from 'react'
import { useNavigate } from 'react-router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { IUserAuth } from '../../shared/types/auth'
import { Input, Button } from '../../components'
import { registerUser, selectUser } from '../../store/slices/auth'
import s from './registrationForm.module.scss'

interface RegistrationFormProps extends IUserAuth {
    confirmPassword: string
}

export const RegistrationForm: FC = () => {

    const { isAuth } = useAppSelector(selectUser)

    const navigate = useNavigate()

    const dispath = useAppDispatch()

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<RegistrationFormProps>({
        defaultValues: {
            name: 'yakub',
            email: 'yibragimov555@gmail.com',
            password: '123123123',
            confirmPassword: '123123123',
        },
    })

    const submitHandler: SubmitHandler<RegistrationFormProps> = async data => {
        const registrationData = {
            name: data.name,
            email: data.email,
            password: data.password,
        }

        dispath(registerUser(registrationData))

        reset()
    }

    if (isAuth) {
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
            <label className={s.label}>
                <span className={s.labelText}>Name</span>
                <Controller
                    name='name'
                    control={control}
                    rules={{ required: 'Name required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            isError={!!errors.name}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.name && (
                    <div className={s.errorMessage}>{errors.name.message}</div>
                )}
            </label>
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
                    rules={{ required: 'Password required', min: 8 }}
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
            <label className={s.label}>
                <span className={s.labelText}>Confirm password</span>
                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{ required: 'Confirm password required', min: 8 }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            type='password'
                            isError={!!errors.confirmPassword}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.confirmPassword && (
                    <div className={s.errorMessage}>{errors.confirmPassword.message}</div>
                )}
                {errors.confirmPassword
                    ? ''
                    : getValues('password') !== getValues('confirmPassword') && (
                        <div className={s.errorMessage}>Пароли не совпадают</div>
                    )}
            </label>
            <Button type='submit' variant='secondary'>
                Зарегистрироваться
            </Button>
        </form>
    )
}

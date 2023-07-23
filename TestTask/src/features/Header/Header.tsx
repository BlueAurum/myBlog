import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../shared/hooks/redux'
import { Navbar, Button } from '../../components'
import { selectUser } from '../../store/slices/auth'
import { logOut } from '../../store/slices/auth'
import s from './header.module.scss'
import { Link } from 'react-router-dom'

export const Header: FC = () => {

    const dispatch = useAppDispatch()

    const { isAuth } = useAppSelector(selectUser)

    const navigate = useNavigate()

    const logOutUser = () => {
        dispatch(logOut())
    }

    return (
        <header className={s.header}>
            <div className={s.logo}>
                <Link to={'/'}>Brains.com</Link>
            </div>
            <div className={s.wrapper}>
                <Navbar />
                <Button onClick={() => isAuth ? logOutUser() : navigate('/auth')} size='small'>{isAuth ? 'Выйти' : 'Войти'}</Button>
            </div>
        </header>
    )
}

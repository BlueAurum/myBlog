import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks/redux";
import { selectUser } from "../../store/slices/auth";
import s from './navbar.module.scss'

import { NavLinks } from "./models";

const navLinks: NavLinks[] = [
    {
        title: 'Главная',
        path: '/'
    }
]

export const Navbar: FC = () => {

    const { isAuth } = useAppSelector(selectUser)

    return <nav className={s.nav}>
        {
            navLinks.map(link => <Link className={s.navLink} key={link.path} to={link.path}>{link.title}</Link>)
        }
        {
            isAuth && <Link className={s.navLink} to={'/profile'}>Профиль</Link>
        }
    </nav>
}
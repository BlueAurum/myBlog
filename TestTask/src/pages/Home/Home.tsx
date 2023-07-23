import { FC } from 'react'
import { ArticlesList } from '../../features'
import s from './home.module.scss'

export const Home: FC = () => {
    return (
        <div className={s.home}>
            <ArticlesList />
        </div>
    )
}

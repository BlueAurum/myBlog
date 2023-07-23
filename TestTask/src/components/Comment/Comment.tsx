import { FC } from 'react'
import { IComments } from '../../shared/types/comments'
import s from './comment.module.scss'

export const Comment: FC<IComments> = ({ id, author, date, description }) => {
    return (
        <div className={s.comment}>
            <div className={s.date}>{date}</div>
            <div className={s.author}>
                {author.name} {author.surname}
            </div>
            <p className={s.description}>{description}</p>
        </div>
    )
}

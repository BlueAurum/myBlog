import { FC } from 'react'
import { Comment } from '../../components'
import { IPosts } from '../../shared/types/posts'
import s from './commentsList.module.scss'

type CommentsProps = Pick<IPosts, 'comments'>

export const CommentsList: FC<CommentsProps> = ({ comments }) => {
    return (
        <div className={s.comments}>
            {
                comments.map(comment => <Comment key={comment.id} {...comment} />)
            }
        </div>
    )
}

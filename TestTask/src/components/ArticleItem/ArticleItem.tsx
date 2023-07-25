import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../shared/hooks/redux'
import { IPosts } from '../../shared/types/posts'
import { AddCommentForm, EditingForm } from './components'
import { selectUser } from '../../store/slices/auth'
import { deletePost } from '../../shared/api/routes/posts'
import { fetchPosts } from '../../store/slices/postsSlices'
import GlassIcon from '../../../public/icons/glass.png'
import EditIcon from '../../../public/icons/edit.png'
import TrashIcon from '../../../public/icons/trash.png'
import s from './articleItem.module.scss'

type ArticleItemProps = Omit<IPosts, 'category' | 'comments'>

export const ArticleItem: FC<ArticleItemProps> = ({
    views,
    id,
    image,
    title,
    description,
}) => {

    const [isShowComment, setIsShowComment] = useState<boolean>(false)
    const [isShowImageEditor, setIsShowImageEditor] = useState<boolean>(false)
    const [isShowTitleEditor, setIsShowTitleEditor] = useState<boolean>(false)

    const { isAuth, authData } = useAppSelector(selectUser)

    //прекрасно понимаю что так делать не безопасно и так делать нельзя
    const isAdmin = authData?.name === 'admin' && authData.email.includes('admin')

    const dispatch = useAppDispatch()

    //тут тоже можно было бы сделать обработку ошибок в try catch 
    const deleteOnePost = async () => {
        const response = await deletePost(id)
        if (response.status === 200 || response.statusText === 'OK') {
            dispatch(fetchPosts())
        }
    }

    return (
        <article className={s.article}>
            <img className={s.image} src={image} alt={title} />
            {isShowImageEditor && <EditingForm imageEdit id={id} />}
            {isAdmin && (
                <div className={s.iconWrapper}>
                    <img
                        onClick={deleteOnePost}
                        className={s.icon}
                        src={TrashIcon}
                        alt='delete'
                    />
                    <img
                        onClick={() => setIsShowImageEditor(prev => !prev)}
                        className={s.icon}
                        src={EditIcon}
                        alt='edit'
                    />
                </div>
            )}
            <div className={s.wrapper}>
                <h4 className={s.title}>{title}</h4>
                <div className={s.views}>
                    <span className={s.glassCount}>{views}</span>
                    <img src={GlassIcon} alt='glass' />
                </div>
            </div>
            {isShowTitleEditor && <EditingForm id={id} />}
            {isAdmin && (
                <div className={s.titleEditorIcon}>
                    <img
                        onClick={() => setIsShowTitleEditor(prev => !prev)}
                        className={s.icon}
                        src={EditIcon}
                        alt='edit'
                    />
                </div>
            )}
            <p className={s.description}>{description}</p>
            <Link className={s.more} to={`/article/${id}`}>
                больше
            </Link>
            {isAuth && (
                <span
                    onClick={() => setIsShowComment(prev => !prev)}
                    className={s.commentText}
                >
                    добавить комментарий
                </span>
            )}
            {isShowComment && <AddCommentForm id={String(id)} />}
        </article>
    )
}

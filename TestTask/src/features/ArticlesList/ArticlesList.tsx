import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { fetchPosts } from '../../store/slices/postsSlices'
import { selectPosts } from '../../store/slices/postsSlices'
import { ArticleItem, ArticleLoader } from '../../components'
import s from './articlesList.module.scss'

export const ArticlesList: FC = () => {
    const { isLoading, data, isError } = useAppSelector(selectPosts)

    const loaderArray = new Array(3).fill('')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    if (isError) {
        return (
            <div className={s.errorText}>
                <h1>Произошла ошибка при получении постов: </h1>
                <p>{isError}</p>
            </div>
        )
    }

    return (
        <div className={s.articles}>
            {isLoading
                ? loaderArray.map((_, index) => <ArticleLoader key={index} />)
                : data.map(article => <ArticleItem key={article.id} {...article} />)}
        </div>
    )
}

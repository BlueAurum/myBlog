import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CommentsList } from '../../features'
import { ArticleLoader } from '../../components'
import { IPosts } from '../../shared/types/posts'
import { getPostById, updatePostViews } from '../../shared/api/routes/posts'
import s from './article.module.scss'

export const Article: FC = () => {

    // запросы я специально решил сделать тут а не в rtk

    const [post, setPost] = useState<IPosts>({} as IPosts)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<string | null>(null)
    const [views, setViews] = useState(post.views)

    const { id } = useParams()

    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true)
            try {
                const response = await getPostById(id!)
                const data = response.data
                setIsLoading(false)
                setPost(data)
                setViews(data.views + 1)
            } catch (error: unknown) {
                setIsLoading(false)
                setIsError(error.message)
            }
        }
        getPost()
    }, [])

    //views можно было бы увеличивать на сервере но сделал тут , так как нет нормального сервера , с помощью json server это не возможно

    useEffect(() => {
        const increatePostViews = async () => {
            const response = await updatePostViews(id!, { "views": views })
        }
        increatePostViews()
    }, [views])


    if (isError) {
        return (
            <div className={s.errorText}>
                <h1>Произошла ошибка при получении постов: </h1>
                <p>{isError}</p>
            </div>
        )
    }


    return (
        <>
            {
                isLoading ? <ArticleLoader /> : <div className={s.wrapper}>
                    <article className={s.article}>
                        <img className={s.image} src={post.image} alt={post.title} />
                        <h4 className={s.title}>{post.title}</h4>
                        <p>{post.description}</p>
                        {
                            // катигориям можно было сделать как массив объектов , катигориям можно было добавить id , но я сделал как массив и поэтому в 
                            // мапинге у span в key category , а не category.id
                            post.category && post.category.map(category => <span key={category} className={s.category}>#{category}</span>)
                        }
                    </article>
                    {
                        post.comments && <div className={s.commentText}>комментарии</div>
                    }
                    {
                        post.comments && <CommentsList comments={post.comments} />
                    }
                </div>
            }
        </>
    )
}

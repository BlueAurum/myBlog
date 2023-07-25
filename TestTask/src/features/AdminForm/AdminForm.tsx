import { FC, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Input, Button } from '../../components'
import { IPosts } from '../../shared/types/posts'
import { addNewPost } from '../../shared/api/routes/posts'
import s from './adminForm.module.scss'

type IAdminForm = Omit<IPosts, 'comments' | 'id' | 'category'> & {
    category: string
}

interface IResponseInfo {
    isLoading: boolean
    data: IPosts | null,
    error: string | null
}

export const AdminForm: FC = () => {

    //тут я в этот раз сделал именно объект , но лучше во всех местах придерживаться одного стиля
    // можно было бы сделать как в компоненте ArticleItem, но просто решил показать и этот подход
    const [responseInfo, setResponseInfo] = useState<IResponseInfo>({
        isLoading: false,
        data: null,
        error: null
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IAdminForm>({
        defaultValues: {
            //в идеале просмотры должен установить сервер но json сервер этого не делает
            views: 0,
            image: '',
            title: '',
            category: '',
            description: '',
        },
    })

    // эту часть можно было бы сделать в слайсе постов 
    const submitHandler: SubmitHandler<IAdminForm> = async data => {
        setResponseInfo(prev => ({ ...prev, isLoading: true }))
        try {
            const category: string[] = data.category.trim().split(' ')
            const newPostData = {
                ...data,
                category
            }
            const response = await addNewPost(newPostData)
            if (response.status === 200 || response.statusText === 'Created') {
                setResponseInfo(prev => ({ ...prev, isLoading: false, data: response.data }))
                reset()
            }
        } catch (err: unknown) {
            setResponseInfo(prev => ({ ...prev, isLoading: false, error: err.message! }))
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
            <label className={s.label}>
                <span className={s.labelText}>Image</span>
                <Controller
                    name='image'
                    control={control}
                    rules={{ required: 'Image required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            isError={!!errors.image}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.image && (
                    <div className={s.errorMessage}>{errors.image.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>Title</span>
                <Controller
                    name='title'
                    control={control}
                    rules={{ required: 'Title required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            isError={!!errors.title}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.title && (
                    <div className={s.errorMessage}>{errors.title.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>Category</span>
                <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'Category required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            isError={!!errors.category}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.category && (
                    <div className={s.errorMessage}>{errors.category.message}</div>
                )}
            </label>
            <label className={s.label}>
                <span className={s.labelText}>Description</span>
                <Controller
                    name='description'
                    control={control}
                    rules={{ required: 'Description required' }}
                    render={({ field: { onChange, value } }) => (
                        //тут вместо инпута лучше было бы использовать textarea
                        <Input
                            isError={!!errors.description}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.description && (
                    <div className={s.errorMessage}>{errors.description.message}</div>
                )}
            </label>
            {
                responseInfo.error && <div className={s.errorMessage}>что то пошло не так !!!</div>
            }
            {
                //у других кнопок тоже можно было бы сделать дисаблед пока идет запрос
            }
            <Button disabled={responseInfo.isLoading} size='medium' variant='secondary' type='submit'>создать статью</Button>
        </form>
    )
}

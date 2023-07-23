import { FC } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useAppSelector } from '../../../../shared/hooks/redux'
import { selectUser } from '../../../../store/slices/auth'
import { addComments } from '../../../../shared/api/routes/posts'
import { Input, Button } from '../../..'
import s from './addCommentForm.module.scss'

interface IAddCommentFormProps {
    id: string
}

interface IAddCommentForm {
    comment: string
}

export const AddCommentForm: FC<IAddCommentFormProps> = ({ id }) => {

    const { authData } = useAppSelector(selectUser)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IAddCommentForm>({
        defaultValues: {
            comment: '',
        },
    })

    const submitHandler: SubmitHandler<IAddCommentForm> = async data => {
        const newComment = {
            date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
            author: {
                name: authData?.name,
                email: authData?.email
            },
            description: data.comment
        }
        // const response = await addComments(id, newComment)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
            <label className={s.label}>
                <Controller
                    name='comment'
                    control={control}
                    rules={{ required: 'Comment required' }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            isError={!!errors.comment}
                            className={s.input}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.comment && (
                    <div className={s.errorMessage}>{errors.comment.message}</div>
                )}
            </label>
            <Button type='submit'>комментировать</Button>
        </form>
    )
}

import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../../shared/hooks/redux'
import { Input, Button } from '../../..'
import { updatePostImage, editTitle } from '../../../../shared/api/routes/posts'
import { fetchPosts } from '../../../../store/slices/postsSlices'
import s from './editingForm.module.scss'

interface IEditingFormProps {
    imageEdit?: boolean
    id: string
}

export const EditingForm: FC<IEditingFormProps> = ({ id, imageEdit }) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>('')

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await (imageEdit ? updatePostImage(id, { image: value }) : editTitle(id, { title: value }))
        if (response.status === 200 || response.statusText === 'OK') {
            dispatch(fetchPosts())
        }
    }

    return (
        <form className={s.form}>
            <Input onChange={(e) => setValue(e.target.value)} value={value} className={s.input} />
            <Button onClick={onSubmit} type='submit'>редактировать</Button>
        </form>
    )
}

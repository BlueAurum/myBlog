import { FC } from 'react'
import { AdminForm } from '../../features'
import s from './admin.module.scss'

export const Admin: FC = () => {
    return <div className={s.admin}>
        <AdminForm />
    </div>
}
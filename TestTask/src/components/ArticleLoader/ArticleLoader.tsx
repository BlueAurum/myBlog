import { FC } from 'react'
import ContentLoader from 'react-content-loader'

export const ArticleLoader: FC = props => (
    <ContentLoader
        width={1200}
        height={674}
        viewBox='0 0 1200 674'
        backgroundColor='#f0f0f0'
        foregroundColor='#dedede'
        {...props}
    >
        <rect x='0' y='520' rx='' ry='' width='50%' height='9' />
        <rect x='0' y='540' rx='' ry='' width='100%' height='100' />
        <rect x='0' y='0' rx='0' ry='0' width='100%' height='500' />
    </ContentLoader>
)

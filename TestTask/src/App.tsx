import { useEffect } from 'react'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { lazily } from 'react-lazily'
import { useAppDispatch } from './shared/hooks/redux'
import { Header } from './features'
import { getUser } from './store/slices/auth'
import cn from 'classnames'
import s from './app.module.scss'

const { Admin } = lazily(() => import('./pages'))
const { Article } = lazily(() => import('./pages'))
const { Auth } = lazily(() => import('./pages'))
const { Home } = lazily(() => import('./pages'))
const { Profile } = lazily(() => import('./pages'))
const { Error } = lazily(() => import('./pages'))

export function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getUserId = localStorage.getItem('userId')
    if (getUserId) {
      dispatch(getUser(getUserId))
    }
  }, [])

  return (
    <div className={cn(s.container, s.app)}>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<h1 className={s.loader}>Loading...</h1>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='/article/:id'
          element={
            <Suspense fallback={<h1 className={s.loader}>Loading...</h1>}>
              <Article />
            </Suspense>
          }
        />
        <Route
          path='/auth'
          element={
            <Suspense fallback={<h1 className={s.loader}>Loading...</h1>}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path='/profile'
          element={
            <Suspense fallback={<h1 className={s.loader}>Loading...</h1>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path='/admin'
          element={
            <Suspense fallback={<h1 className={s.loader}>Loading...</h1>}>
              <Admin />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<h1 className={s.loader}>Loading...</h1>}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}

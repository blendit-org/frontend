import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/index.ts'
import { Provider as ReduxProvide} from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvide store={store}>
      <RouterProvider router={router} />
      <Toaster richColors/>
    </ReduxProvide>
  </StrictMode>,
)

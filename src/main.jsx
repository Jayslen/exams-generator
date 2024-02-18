import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './routes/Root.jsx'
import './index.css'
import { QuestionsProvider } from './context/QuestionsContext.jsx'
import { Exam } from './routes/Exam.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/exam/:id',
    element: <Exam />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuestionsProvider>
      <RouterProvider router={router} />
    </QuestionsProvider>
  </React.StrictMode>
)

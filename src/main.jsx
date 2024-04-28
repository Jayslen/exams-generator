import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Root } from './routes/Root.jsx'
import { Exam } from './routes/Exam.jsx'
import { ExamGenerator } from './routes/ExamGenerator.jsx'
import { ExamRevision } from './routes/ExamRevision.jsx'
import { ReviewQuestionsProvider } from './context/ReviewQuestionsContext.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/exam-generator',
    element: <ExamGenerator />
  },
  {
    path: '/exam/:id',
    element: <Exam />
  },
  {
    path: '/review/:id',
    element: <ExamRevision />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReviewQuestionsProvider>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </ReviewQuestionsProvider>
  </React.StrictMode>
)

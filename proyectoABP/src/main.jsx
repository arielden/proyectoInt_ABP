import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstComponent from './FirstComponent'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstComponent />
  </StrictMode>,
)

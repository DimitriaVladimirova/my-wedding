import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { WeddingSelectionProvider } from './context/WeddingSelectionContext.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <WeddingSelectionProvider>
            <App />
        </WeddingSelectionProvider>
    </BrowserRouter>
)

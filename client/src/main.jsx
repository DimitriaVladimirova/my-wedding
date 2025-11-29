import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { WeddingSelectionProvider } from './context/WeddingSelectionContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <UserProvider>
            <WeddingSelectionProvider>
                <App />
            </WeddingSelectionProvider>
        </UserProvider>
    </BrowserRouter>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SocketProvider from './context/socketContext.tsx'
import CreateRoom from './components/createRoom.tsx'

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <App />
    <CreateRoom/>
</SocketProvider>
)

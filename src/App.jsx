import './App.css'
import { ContextStoreProvider } from './context/ContextStore'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <ContextStoreProvider>
      <div dir='rtl' className="p-0 m-0 min-h-screen w-full bg-secoundary flex dark:bg-dark_secoundary">
        <AppRoutes />
      </div>
    </ContextStoreProvider>
  )
}

export default App

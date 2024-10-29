import TanstackProvider from "./provider/TanstackProvider"
import AppRoutes from "./router/Router"


function App() {
  return (
    <TanstackProvider>
      <AppRoutes />
    </TanstackProvider>
  )
}

export default App

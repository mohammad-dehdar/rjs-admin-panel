import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function TanstackProvider({children}) {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}
export default TanstackProvider
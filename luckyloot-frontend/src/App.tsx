import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black text-white">
      <nav className="bg-black bg-opacity-70 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-300">🎰 Tem's Casino</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/casino" className="hover:underline">Casino</Link>
          <Link to="/history" className="hover:underline">History</Link>
        </div>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

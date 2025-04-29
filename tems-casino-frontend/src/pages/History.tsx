import { useEffect, useState } from 'react'
import axios from 'axios'

interface Spin {
  outcome: string
  isWin: boolean
  amount: number
  date: string
}

export default function History() {
  const [history, setHistory] = useState<Spin[]>([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/history').then((res) => {
      setHistory(res.data)
    })
  }, [])

  return (
    <div className="max-w-3xl mx-auto bg-white text-black rounded-lg p-6 shadow">
      <h1 className="text-2xl font-bold mb-4">Game History</h1>
      <ul>
        {history.map((spin, index) => (
          <li key={index} className="mb-2 border-b pb-2">
            <span className="font-mono">{spin.date.slice(0, 10)}</span> - {spin.outcome} - <strong>{spin.isWin ? 'Win' : 'Loss'}</strong> - {spin.amount > 0 ? '+' : ''}{spin.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}

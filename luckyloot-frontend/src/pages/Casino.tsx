import { useState } from 'react'
import axios from 'axios'

const icons = ['🍒', '🍋', '🔔', '🍀', '⭐']

export default function Casino() {
  const [reels, setReels] = useState<string[]>(['', '', ''])
  const [result, setResult] = useState('')
  const [balance, setBalance] = useState(100)
  const [isSpinning, setIsSpinning] = useState(false)

  const spin = async () => {
    if (isSpinning) return // prevent spam
  
    setIsSpinning(true)
    setResult('')
  
    setTimeout(async () => {
      const newReels = [
        icons[Math.floor(Math.random() * icons.length)],
        icons[Math.floor(Math.random() * icons.length)],
        icons[Math.floor(Math.random() * icons.length)],
      ]
      setReels(newReels)
  
      const isWin = newReels.every((val) => val === newReels[0])
      const payout = isWin ? 50 : -10
      setBalance(balance + payout)
      setResult(isWin ? '🎉 JACKPOT! 🎉' : 'Try Again!')
  
      await axios.post('http://localhost:3001/api/history', {
        outcome: newReels.join(' '),
        isWin,
        amount: payout,
        date: new Date(),
      })
  
      setIsSpinning(false)
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white text-black rounded-xl p-6 shadow-xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Slot Machine</h1>
      <div className="flex justify-center mb-6 space-x-4 text-6xl">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className={`transition-transform duration-500 ease-in-out ${
              isSpinning ? 'animate-pulse' : ''
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
      <button
        disabled={isSpinning}
        className={`bg-purple-600 text-white text-xl font-semibold px-6 py-3 rounded transition 
          ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
        onClick={spin}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
      <p className="mt-4 text-center text-xl font-bold text-green-700">{result}</p>
      <p className="mt-2 text-center text-lg">Balance: ${balance}</p>
    </div>
  )
}
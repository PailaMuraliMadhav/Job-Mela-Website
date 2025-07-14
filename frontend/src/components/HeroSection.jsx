import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const quotes = [
  "Success doesn’t come to you – you go to it.",
  "Push yourself, because no one else is going to do it for you.",
  "Opportunities don’t happen. You create them.",
  "Dream big. Start small. Act now.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones."
]

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const [quoteIndex, setQuoteIndex] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 4000) // change quote every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
          No. 1 Job Searching Website
        </span>
        <h1 className='text-5xl font-bold'>
          Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
        </h1>

        {/* Motivational Quote */}
        <p className="italic text-purple-900 transition-opacity duration-10s text-2xl">
          "{quotes[quoteIndex]}"
        </p>

        {/* Search input */}
<div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
  <input
    type="text"
    placeholder="Find your dream jobs"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") searchJobHandler();
    }}
    className="outline-none border-none w-full"
  />
  <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
    <Search className="h-5 w-5" />
  </Button>
</div>

      </div>
    </div>
  )
}

export default HeroSection

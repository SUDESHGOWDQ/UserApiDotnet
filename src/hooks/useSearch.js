import { useState, useEffect } from 'react'
import axios from 'axios'

const useSearch = (debouncedKeyword) => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedKeyword.trim().length > 0) {
        setLoading(true)
        setError(null)
        try {
          const response = await axios.get(
            `https://localhost:7027/api/Users/search?keyword=${debouncedKeyword}`
          )
          setSuggestions(response.data)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
          setError(error.message)
          setSuggestions([])
        } finally {
          setLoading(false)
        }
      } else {
        setSuggestions([])
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [debouncedKeyword])

  return { suggestions, loading, error }
}

export default useSearch

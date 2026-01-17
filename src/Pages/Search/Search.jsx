import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'
import useDebounce from '../../hooks/useDebounce'
import useSearch from '../../hooks/useSearch'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  
  const debouncedKeyword = useDebounce(keyword, 300)
  
  
  const { suggestions, loading } = useSearch(debouncedKeyword)

  const handleInputChange = (e) => {
    setKeyword(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (user) => {
    setKeyword(user.name)
    setShowSuggestions(false)
  }

  const handleClearSearch = () => {
    setKeyword('')
    setShowSuggestions(false)
  }

  return (
    <div className='Search'>
      <div className='search-container'>
        <h1>Search Users</h1>
        
        <div className='search-input-wrapper'>
          <input
            type='text'
            placeholder='Search by name, email, or any keyword...'
            value={keyword}
            onChange={handleInputChange}
            className='search-input'
          />
          {keyword && (
            <button className='clear-btn' onClick={handleClearSearch}>
              ✕
            </button>
          )}
          
          {loading && <div className='loading-spinner'>Searching...</div>}
          
          {showSuggestions && suggestions.length > 0 && (
            <div className='suggestions-dropdown'>
              {suggestions.map((user) => (
                <div
                  key={user.id}
                  className='suggestion-item'
                  onClick={() => handleSuggestionClick(user)}
                >
                  <div className='suggestion-content'>
                    <div className='suggestion-name'>{user.name}</div>
                    <div className='suggestion-details'>
                      {user.email} • Age: {user.age}
                    </div>
                  </div>
                  <Link to={`/edit/${user.id}`} className='suggestion-edit-btn'>
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          {showSuggestions && suggestions.length === 0 && !loading && keyword && (
            <div className='suggestions-dropdown'>
              <div className='no-results'>No users found matching "{keyword}"</div>
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className='search-results'>
            <h2>Search Results ({suggestions.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link to={`/edit/${user.id}`}>
                        <button className='edit-btn'>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

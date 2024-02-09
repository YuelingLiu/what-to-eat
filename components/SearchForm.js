// components/SearchForm.js
'use client';
import Image from 'next/image';

import { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: searchQuery,
        number: '100',
        ignorePantry: 'true',
        ranking: '1',
      },
      headers: {
        'X-RapidAPI-Key': '895f20bb7dmsh914c3d60fd5eb25p1ee91bjsnd14fd948399d',
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white">
      <h1 className="text-3xl font-bold text-black mb-4">What to Eat</h1>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Input ingredients"
          className="border border-gray-300 rounded-l px-4 py-2 outline-none text-black focus:border-blue-500"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {searchResults && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((recipe) => (
              <li key={recipe.id}>
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={300}
                  height={200}
                />
                <p>{recipe.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default SearchForm;

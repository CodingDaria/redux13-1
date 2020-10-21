import React from 'react'
// import { useSelector } from 'react-redux'

const Card = () => {
  return (
    <div className="flex flex-col card max-w-xs rounded overflow-hidden shadow-lg">
      <img
        className="card__image w-full object-cover h-40"
        src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/social-twitter-icon.png"
        alt="some-product"
      />
      {/* src={data.image} alt={data.title} */}
      <div className="px-6 py-4">
        <div className="card__title font-bold text-xl mb-2">title</div>
        <div className="flex justify-evenly">
          <div className="card__price text-gray-700 text-base">100</div>
          <div className="currency text-gray-700 text-base">USD</div>
        </div>
        <div className="card__product-amount text-gray-700 text-base">card__product-amount</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default Card

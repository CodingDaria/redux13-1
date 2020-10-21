import React from 'react'
import Head from './head'

const Logs = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          This is Logs component
        </div>
      </div>
    </div>
  )
}

Logs.propTypes = {}

export default React.memo(Logs)

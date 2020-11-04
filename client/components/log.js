import React from 'react'

const Log = (props) => {
  const { log } = props
  return <div>
    <div>{JSON.stringify(log)}</div>
    <div>{log.date}</div>
  </div>
}

Log.propTypes = {}

export default Log

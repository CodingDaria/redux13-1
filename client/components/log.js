import React from 'react'

const Log = (props) => {
  const { log } = props
  return <div>
    <div>{log.date}</div>
    <div>{log.logs}</div>
  </div>
}

Log.propTypes = {}

export default Log

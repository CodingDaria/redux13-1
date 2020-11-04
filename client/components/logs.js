import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Log from './log'
import { setLogs } from '../redux/reducers/products'

const Logs = () => {
  const logs = useSelector((store) => store.products.logs)
  const dispatch = useDispatch()
  const onClick = () => {
    axios.delete('/api/v1/logs')
    dispatch(setLogs())
  }
  useEffect(() => {
    dispatch(setLogs())
    return () => {}
  }, [])
  return (
    <div>
      <div className="flex flex-col items-stretch">
        {logs.map((log) => {
          return (
            <div key={log.id}>
              <Log log={log} />
            </div>
          )
        })}
      </div>
      <button type="button" onClick={onClick}>Delete logs</button>
    </div>
  )
}

Logs.propTypes = {}

export default React.memo(Logs)

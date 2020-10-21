import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Head from './head'
import Header from './header'
import Shop from './shop'
import Cart from './cart'
import Logs from './logs'

const Home = () => {
  return (
    <div>
      <Head title="Hello" />
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Shop />} />
        <Route exact path="/cart" component={() => <Cart />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default Home

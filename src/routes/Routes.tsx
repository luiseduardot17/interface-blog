import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Routes as Switch} from 'react-router-dom'
import Home from '../pages/Home/Home'
import PagePost from '../pages/PagePost/PagePost'

const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
        <Route path='/' element={<Home/>}/>
        <Route path='post/:id' element={<PagePost/>}/>
    </Switch>
    </BrowserRouter>
  )
}

export default Routes
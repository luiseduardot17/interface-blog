import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Navbar from '../../components/Navbar/Navbar'
import IPost from '../../interfaces/IPost'
import http from '../../service/api'

const Home = () => {

  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    http.get<IPost[]>('posts')
      .then(resposta => setPosts(resposta.data.slice(0, 2)))
  }, [])

  return (
    <div className="container-sm">
      <Navbar />
      <div className="container-sm text-center p-5">
        <h1 className="light-300">The Food Ninja Blog</h1>
        <p className="roboto">A blog about food, experiences, and recipes.</p>
      </div>
      <div className="container-sm d-flex justify-content-center">
        <Input />
      </div>
      <section className='container-sm pt-5 pb-5'>
        <div className="row row-cols-1 row-cols-md-2 g-5 justify-content-around">
          {posts.map(post => {
            return (
              <Link to={`/post/${post.id}`} className="react-link"><Card key={post.id} title={post.title} body={post.body.slice(0, 100)} /></Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Home
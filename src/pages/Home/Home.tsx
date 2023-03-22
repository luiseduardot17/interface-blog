import React, { useEffect, useState } from 'react'
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
      <section>
        {posts.map(post => {
          return (
            <div key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Home
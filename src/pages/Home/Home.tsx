import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import Input from '../../components/Input/Input'
import Navbar from '../../components/Navbar/Navbar'
import Pagination from '../../components/Pagination/Pagination'
import IPost from '../../interfaces/IPost'
import IUsers from '../../interfaces/IUsers'
import http from '../../service/api'

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [searchText, setSearchText] = useState("")
  const [users, setUsers] = useState<IUsers[]>([])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 4;

  useEffect(() => {
    http.get<IPost[]>('posts')
      .then(resposta => setPosts(resposta.data))
    http.get<IUsers[]>(`users`)
      .then(resposta => setUsers(resposta.data)
      )
  }, [])

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 150);
    };
    setTimeout(scrollToTop, 100);
  }, [currentPage]);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
  };

  const filteredPosts = posts.filter(post => post.title.includes(searchText));
  const filteredPostsPerPage = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);


  return (
    <>
      <div className="container-sm">
        <Navbar />
        <div className="container-sm text-center p-5">
          <h1 className="light-300">The Food Ninja Blog</h1>
          <p className="roboto">A blog about food, experiences, and recipes.</p>
        </div>
        <div className="container-sm d-flex justify-content-center">
          <Input value={searchText} onChange={handleSearchChange} />
        </div>
        <section className='container-sm pt-5 pb-5'>
          <div className="row row-cols-1 row-cols-md-2 g-5 justify-content-around">
            {filteredPostsPerPage.map(post => {
              const author = users.find(user => user.id === post.userId);
              const authorName = author ? author.name : 'Anonymous author';
              return (
                <Link to={`/post/${post.id}`} className="react-link" key={post.id}>
                  <Card title={post.title} body={post.body.slice(0, 100)} id={post.id} authorName={authorName} />
                </Link>
              )
            })}
          </div>
        </section>

        <Pagination
          totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="container-fluid">
        <Footer />
      </div>
    </>
  )
}

export default Home
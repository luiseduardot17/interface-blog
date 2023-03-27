import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import IUsers from '../../interfaces/IUsers'
import http from '../../service/api'
import person from '../../assets/svg/person.svg'
import IPost from '../../interfaces/IPost'

const PagePeople = () => {
  const parametro = useParams()

  const [users, setUsers] = useState<IUsers | undefined>(undefined);
  const [postsPerUser, setPostsPerUser] = useState<IPost[]>()

  useEffect(() => {
    if (parametro.id) {
      http.get<IUsers>(`users/${parametro.id}`)
        .then(resposta => setUsers(resposta.data)
        )
      http.get<IPost[]>(`users/${parametro.id}/posts`)
        .then(resposta => setPostsPerUser(resposta.data)
        )
    }
  }, [parametro])

  return (
    <div className="container-sm">
      <Navbar />
      <div className="container-sm p-5">
        <div className="col h-100">
          <div className="card text-center">
            <div className="card-header regular-body bg-tertiary text-light mb-3">
              <img src={person} className="img-fluid" alt="icone de perfil" />
              <h3 className='bold-700'>{users?.name}</h3>
              <p>Username: {users?.username}</p>
              <p>Email: {users?.email}</p>
              <p>Phone: {users?.phone}</p>
              <p>Website: {users?.website}</p>
            </div>
            <div className="card-body regular-body">
              <h6 className='h6'>Address:</h6>
              <p>Zipcode: {users?.address.zipcode}</p>
              <p>City: {users?.address.city}</p>
              <p>Street: {users?.address.street}</p>
              <p>Suite: {users?.address.suite}</p>
              <h6 className='h6'>Geo:</h6>
              <p>Lat: {users?.address.geo.lat}</p>
              <p>Lng: {users?.address.geo.lng}</p>
              <div className="card-footer regular-body rounded-bottom-5">
                <h6 className='h6'>Company</h6>
                <p>Name: {users?.company.name}</p>
                <p>Catch Phrase: {users?.company.catchPhrase}</p>
                <p>Bs: {users?.company.bs}</p>
              </div>
            </div>
          </div>
        </div>
        <section className='container-sm p-0 pt-5'>
          <h3 className='body'>Posts created:</h3>
          <div className="row row-cols-1 row-cols-md-1 g-2 justify-content-around">
            {postsPerUser?.map(item => {
              return (
                <div className="col h-100" key={item.id}>
                  <Link to={`/post/${item.id}`}>
                    <div className="card">
                      <div className="card-body">
                        <h3 className='bold-700'>{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default PagePeople
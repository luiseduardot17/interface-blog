import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import IUsers from '../../interfaces/IUsers'
import http from '../../service/api'
import person from '../../assets/svg/person.svg'

const People = () => {

    const [users, setUsers] = useState<IUsers[]>([])

    useEffect(() => {
        http.get<IUsers[]>('users')
            .then(resposta => setUsers(resposta.data))
    }, [])

    return (
        <div className="container-sm">
            <Navbar />
            <div className="container-sm text-center p-5">
                <h2 className="light-300">Meet our collaborators</h2>
                <p className="roboto">Users, Members and Authors</p>
            </div>
            <section className='container-sm pt-5 pb-5'>
                <div className="row row-cols-1 row-cols-md-5 g-5 justify-content-around">
                    {users.map(user => {
                        return (
                            <div className="col h-100 text-center" key={user.id}>
                                <Link to={`/users/${user.id}`} className="react-link">
                                    <img src={person} className="img-fluid" alt="icone de perfil"/>
                                    <div className="card-body">
                                        <h5 className="card-title bold-700">{user.username}</h5>
                                        <p className="card-text regular-body">{user.website}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section>
            <div className="container-sm text-center p-5">
                <h2 className="light-300">Be part of you too!</h2>
                <p className="roboto">Whether you are a reader or an author</p>
            </div>
            <div className="d-grid gap-2 col-4 mx-auto p-3 justify-content-md-center">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="text-center p-3">
                        <button type="submit" className="btn btn-primary w-50">Subscribe</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default People
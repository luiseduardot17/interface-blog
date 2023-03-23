import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import IUsers from '../../interfaces/IUsers'
import http from '../../service/api'

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
                <h2 className="light-300">Conheça nossos colaboradores</h2>
                <p className="roboto">Usuários, Membros e Autores</p>
            </div>
            <section className='container-sm pt-5 pb-5'>
                <div className="row row-cols-1 row-cols-md-5 g-5 justify-content-around">
                    {users.map(user => {
                        return (
                            <div className="col h-100 text-center" key={user.id}>
                                <Link to={`/user/${user.id}`} className="react-link">
                                    <i className="bi bi-person-circle" style={{ fontSize: 10 + "rem", color: "#F39C12" }}></i>
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
                <h2 className="light-300">Faça parte você também!</h2>
                <p className="roboto">Seja você um leitor ou um autor</p>
            </div>
            <div className="d-grid gap-2 col-4 mx-auto p-3">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="text-center p-3">
                        <button type="submit" className="btn btn-primary w-50">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default People
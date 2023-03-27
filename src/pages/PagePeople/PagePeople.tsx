import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import IUsers from '../../interfaces/IUsers'
import http from '../../service/api'
import person from '../../assets/svg/person.svg'

const PagePeople = () => {
  const parametro = useParams()

  const [users, setUsers] = useState<IUsers | undefined>(undefined);

  useEffect(() => {
    if (parametro.id) {
      http.get<IUsers>(`users/${parametro.id}`)
        .then(resposta => setUsers(resposta.data)
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
              <p>E-mail: {users?.email}</p>
              <p>Telefone: {users?.phone}</p>
              <p>WebSite: {users?.website}</p>
            </div>
            <div className="card-body regular-body">
              <h6 className='h6'>Endereço:</h6>
              <p>CEP: {users?.address.zipcode}</p>
              <p>Cidade: {users?.address.city}</p>
              <p>Rua: {users?.address.street}</p>
              <p>Apartamento: {users?.address.suite}</p>
              <h6 className='h6'>Coordenadas geográficas:</h6>
              <p>Latitude: {users?.address.geo.lat}</p>
              <p>Longitude: {users?.address.geo.lng}</p>
              <div className="card-footer regular-body rounded-bottom-5">
                <h6 className='h6'>Empresa</h6>
                <p>Nome: {users?.company.name}</p>
                <p>Bordão: {users?.company.catchPhrase}</p>
                <p>Bs: {users?.company.bs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PagePeople
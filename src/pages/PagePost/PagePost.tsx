import Navbar from "../../components/Navbar/Navbar"
import image from "../../assets/images/1.jpg"
import IPost from "../../interfaces/IPost"
import { useEffect, useState } from "react"
import http from "../../service/api"
import { useParams } from "react-router-dom"
import IComments from "../../interfaces/IComments"


const PagePost = () => {
  const parametro = useParams()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [post, setPost] = useState<IPost[]>([])
  const [comentarios, setComentarios] = useState<IComments[]>()

  useEffect(() => {
    if (parametro.id) {
    http.get<IPost>(`posts/${parametro.id}/`)
      .then(resposta => setTitle(resposta.data.title)
      )
      http.get<IPost>(`posts/${parametro.id}/`)
      .then(resposta => setBody(resposta.data.body)
      )
      http.get<IComments[]>(`https://jsonplaceholder.typicode.com/posts/${parametro.id}/comments`)
      .then(resposta => setComentarios(resposta.data)
      )
    }
  }, [parametro])

  return (
    <div className="container-sm">
      <Navbar />
      <div className="container-sm p-5">
              <h2 className="card-title bold-700-title">{title}</h2>
              <img src={image} className="img-fluid rounded" alt="..."/>
              <p className="card-text body">{body}</p>
      </div>
      <section className='container-sm pt-5 pb-5'>
      <div>
        <h3>Comentários:</h3>
        {comentarios?.map(item => {
                return (
                  <div className="bg-success">
                    <h3>usuário: {item.name}</h3>
                    <h4>email: {item.email}</h4>
                    <p>comentário: {item.body}</p>
                  </div>
                )
            })}
      </div>
      </section>
    </div>
  )
}

export default PagePost
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
  const [showForm, setShowForm] = useState(false);

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

  function handleAddComment() {
    setShowForm(!showForm);
  }

  return (
    <div className="container-sm">
      <Navbar />
      <div className="container-sm p-5">
        <h2 className="card-title bold-700-title">{title}</h2>
        <img src={image} className="img-fluid rounded" alt="..." />
        <p className="card-text body">{body}</p>
      </div>
      <section className='container-sm pt-5 pb-5'>
        <div>
          <h3>Opinião dos leitores</h3>
          <div className="row row-cols-1 row-cols-md-1 g-2 justify-content-around">
            {comentarios?.map(item => {
              return (
                <div className="col h-100">
                  <div className="card">
                    <div className="card-body">
                      <h3><i className="bi bi-person-circle" style={{ color: "#F39C12" }}></i> {item.name}</h3>
                      <h6>{item.email}</h6>
                      <p>{item.body}</p>
                      <a className="nav-link" href="#">Responder</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="d-grid gap-2 col-4 mx-auto p-3">
          
                <button type="button" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                  Fazer um comentário
                </button>
                <form className="dropdown-menu p-4">
                  <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="comment">Comentário:</label>
                    <textarea className="form-control" id="comment"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
              
            {/* <button className="btn btn-primary" type="button" onClick={handleAddComment}>Fazer um comentário</button>
            {showForm && (
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nome:</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comentário:</label>
                  <textarea className="form-control" id="comment"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            )} */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PagePost
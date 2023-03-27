import Navbar from "../../components/Navbar/Navbar"
import IPost from "../../interfaces/IPost"
import { useEffect, useState } from "react"
import http from "../../service/api"
import { useParams } from "react-router-dom"
import IComments from "../../interfaces/IComments"
import Footer from "../../components/Footer/Footer"

type URL = string;
const IMAGES_PATH: URL = '/src/assets/images/'

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
      http.get<IComments[]>(`posts/${parametro.id}/comments`)
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
        <img src={IMAGES_PATH + `${parametro.id}.jpg`} className="img-fluid rounded" alt="..." />
        <p className="card-text body">{body}</p>
      </div>
      <section className='container-sm pt-5 pb-5'>
        <div>
          <h3>Comments:</h3>
          <div className="row row-cols-1 row-cols-md-1 g-2 justify-content-around">
            {comentarios?.map(item => {
              return (
                <div className="col h-100">
                  <div className="card">
                    <div className="card-body">
                      <h3><i className="bi bi-person-circle" style={{ color: "#F39C12" }}></i> {item.name}</h3>
                      <h6>{item.email}</h6>
                      <p>{item.body}</p>
                      <a className="nav-link" href="#">To respond</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="d-grid gap-2 col-4 mx-auto p-3">
            <button className="btn btn-primary" type="button" onClick={handleAddComment}>Leave a comment</button>
            {showForm && (
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group pb-3">
                  <label htmlFor="comment">Commentary:</label>
                  <textarea className="form-control" id="comment"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-50">Send</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default PagePost
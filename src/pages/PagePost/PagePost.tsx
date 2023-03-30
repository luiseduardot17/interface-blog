import Navbar from "../../components/Navbar/Navbar"
import IPost from "../../interfaces/IPost"
import { useEffect, useState } from "react"
import http from "../../service/api"
import { Link, useParams } from "react-router-dom"
import IComments from "../../interfaces/IComments"
import Footer from "../../components/Footer/Footer"
import IUsers from "../../interfaces/IUsers"
import { format } from 'date-fns';

type URL = string;
const IMAGES_PATH: URL = '/src/assets/images/'

const PagePost = () => {
  const parametro = useParams()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState(Number)
  const [date, setDate] = useState(Date)
  const [post, setPost] = useState<IPost[]>([])
  const [users, setUsers] = useState<IUsers[]>([])
  const [comentarios, setComentarios] = useState<IComments[]>()
  const [showForm, setShowForm] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  const startDate = new Date('2022-12-01');
  const endDate = new Date();
  const randomDate = getRandomDate(startDate, endDate);
  const formattedDate = format(randomDate, 'MMM d, yyyy');

  const author = users.find(user => user.id === userId);
  const authorName = author ? author.name : 'Anonymous author';

  useEffect(() => {
    if (parametro.id) {
      http.get<IPost>(`posts/${parametro.id}/`)
        .then(resposta => setTitle(resposta.data.title)
        )
      http.get<IPost>(`posts/${parametro.id}/`)
        .then(resposta => setBody(resposta.data.body)
        )
      http.get<IPost>(`posts/${parametro.id}/`)
        .then(resposta => setUserId(resposta.data.userId)
        )
      http.get<IUsers[]>(`users`)
        .then(resposta => setUsers(resposta.data)
        )
      http.get<IComments[]>(`posts/${parametro.id}/comments`)
        .then(resposta => setComentarios(resposta.data)
        )
      setDate(formattedDate);
      calculateReadingTime();
    }
    window.scrollTo(0, 0);
  }, [parametro])

  function getRandomDate(startDate: Date, endDate: Date): Date {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    const randomDate = new Date(randomTimestamp);
    return randomDate;
  }

  function calculateReadingTime() {
    const content = body
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(content.split(' ').length / wordsPerMinute);
    setReadingTime(readingTime);
  }

  function handleAddComment() {
    setShowForm(!showForm);
  }

  return (
    <div className="container-sm">
      <Navbar />
      <div className="container-sm p-5">
        <h2 className="card-title bold-700-title">{title}</h2>
        <p className="regular-body">{formattedDate} • <span>{readingTime} min read</span></p>
        <img src={IMAGES_PATH + `${parametro.id}.jpg`} className="img-fluid rounded" alt="..." />
        <div className="d-flex justify-content-start">
          <i className="bi bi-person-circle" style={{ color: "#F39C12", fontSize: 3 + "rem", paddingRight: 10 }}></i><Link to={`/users/${userId}`} className="nav-link d-flex align-items-center"> {authorName}</Link>
        </div>
        <p className="card-text body">{body}</p>
      </div>
      <section className='container-sm pt-5 pb-5'>
        <div>
          <h3>Comments:</h3>
          <div className="row row-cols-1 row-cols-md-1 g-2 justify-content-around">
            {comentarios?.map(item => {
              return (
                <div className="col h-100" key={item.id}>
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
      <Footer />
    </div>
  )
}

export default PagePost
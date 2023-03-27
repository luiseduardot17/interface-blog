import { Link } from "react-router-dom";

interface DadosCard {
    id: number
    title: string
    body: string
    authorName: string
    link: number
}
type URL = string;
const IMAGES_PATH: URL = '/src/assets/images/'

const Card = ({title, body, id, authorName, link}: DadosCard) => {

    return (
        <div className="col h-100">
            <div className="card h-100">
                <img src={IMAGES_PATH + `${id}.jpg`} className="img-fluid" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title bold-700">{title}</h5>
                    <p className="card-text regular-body">{body}... <strong>Read more!</strong></p>
                    <div className="d-flex">
                    <Link to={`/users/${link}`} className="nav-link position-absolute bottom-0 start-0"><i className="bi bi-person-circle" style={{ color: "#F39C12", paddingLeft: 15 + "px"}}></i> {authorName}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card

interface DadosCard {
    id: number
    title: string
    body: string
    authorName: string
}
type URL = string;
const IMAGES_PATH: URL = '/images/'

const Card = ({title, body, id, authorName}: DadosCard) => {

    return (
        <div className="col h-100">
            <div className="card h-100">
                <img src={IMAGES_PATH + `${id}.jpg`} className="img-fluid" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title bold-700">{title}</h5>
                    <p className="card-text regular-body">{body}... <strong>Read more!</strong></p>
                    <div className="d-flex align-items-center position-absolute bottom-0 start-0">
                    <i className="bi bi-person-circle" style={{ color: "#F39C12", paddingLeft: 15 + "px", paddingRight: 10}}></i><p className="regular-body mb-0"> {authorName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
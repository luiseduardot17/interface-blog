
interface DadosCard {
    id: number
    title: string
    body: string
}
type URL = string;
const IMAGES_PATH: URL = '/src/assets/images/'

const Card = ({title, body, id}: DadosCard) => {

    return (
        <div className="col h-100">
            <div className="card h-100">
                <img src={IMAGES_PATH + `${id}.jpg`} className="img-fluid" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title bold-700">{title}</h5>
                    <p className="card-text regular-body">{body}... <strong>Read more!</strong></p>
                </div>
            </div>
        </div>
    )
}

export default Card
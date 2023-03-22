import image from '../../assets/images/1.jpg'

interface DadosCard {
    title: string
    body: string
}

const Card = ({title, body}: DadosCard) => {
    return (
        <div className="col h-100">
            <div className="card h-100">
                <img src={image} className="img-fluid" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title bold-700">{title}</h5>
                    <p className="card-text regular-body">{body}... <strong>Leia mais!</strong></p>
                </div>
            </div>
        </div>
    )
}

export default Card
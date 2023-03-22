import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary pt-5 pb-5">
            <div className="container-fluid">
                <a className="navbar-brand bold-700" href="#">Food Ninja</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav w-100 justify-content-end">
                        <a className="nav-link active" aria-current="page" href="#">Blog</a>
                        <a className="nav-link" href="#">About</a>
                        <a className="nav-link" href="#">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
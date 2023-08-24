import React, { Component } from 'react'
export class Newsitem extends Component {
    render() {
        let {title,description,imageURL,newsUrl,author,date}=this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageURL?imageURL:"https://static.tnn.in/thumb/msid-100606923,updatedat-1685409030914,width-1280,height-720,resizemode-75/100606923.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {date}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem

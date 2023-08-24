import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
    static defaultProps={
        country : 'in',
        pageSize : 8,
        category :'general'
    }
    static propTypes={
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles:[],
            loading: false,
            page : 1
        }
    }

     handleNextClick= async () =>{
        console.log("Entered")
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a9fd9de155f4e87997397dcd4b677f4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data=await fetch(url)
        let parseData= await    data.json();
        this.setState({loading:false})
        console.log(parseData);
        this.setState({
            page : this.state.page+1,
            articles:parseData.articles
        })
    }

     handlePreviousClick = async () => {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a9fd9de155f4e87997397dcd4b677f4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data=await fetch(url)
        let parseData= await    data.json();
        this.setState({loading : false})
        console.log(parseData);
        this.setState({
            page : this.state.page-1,
            articles:parseData.articles
        })
    }


    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a9fd9de155f4e87997397dcd4b677f4&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data=await fetch(url)
        let parseData= await data.json();
        this.setState({loading : false})

        console.log(parseData);
        this.setState({articles:parseData.articles,totalResults : parseData.totalResults})
    }
    render() {
        return (
            <div className=' container my-2 '>
                <h2 className='text-center'>Top Headlines</h2>
                {this.state.loading&&<Spinner/>}
                <div className="row">
                    {!this.state.loading&&this.state.articles.map((element) => {
                        return <div className="col-md-4 my-1" key={element.url}>
                            <Newsitem title={element.title} description={element.description} imageURL={element.urlToImage}  newsUrl={element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News

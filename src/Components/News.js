import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
    constructor(){
        super();
        this.state={
           articles:[],
           loading: true,
           page:1
        }
      }
      async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=caf464da92324b90a915aa5292ff2438&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false});
      }
      handlePrevClick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=caf464da92324b90a915aa5292ff2438&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({
          page:this.state.page-1,
          articles: parsedData.articles,
          loading:false
        })
        
         
      }
      handlleNextClick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=caf464da92324b90a915aa5292ff2438&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json()
        this.setState({
          page:this.state.page+1,
          articles: parsedData.articles,
          loading:false
        })
      }
  render() {
    return (
      <div className='container my-2'>
        <h1 className='text-center'>NEWS CAT - Top Headlines</h1>
        {this.state.loading && <Spinner/>} {/*if loading is true then the spinner will run */}
        <div className="row">
        {!this.state.loading && this.state.articles.map((e)=>{
         return <div className="col md-2 my-1" key={e.url}>
                  <NewsItem key={e.url} title={e.title?e.title:""} description={e.description?e.description:""} imageUrl={e.urlToImage} newsUrl={e.url}/>
                </div>
              }
            )
        }
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1}type="button" className="btn btn-primary " onClick={this.handlePrevClick}>&larr; Previos</button>
        <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-primary " onClick={this.handlleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
 export default News
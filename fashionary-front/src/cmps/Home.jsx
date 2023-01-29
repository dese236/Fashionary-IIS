import React, { Component } from 'react'
import {ImgList} from './ImgList';
import {RelatedImages} from './RelatedImages';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { getImages , getRelatedImages , getConcept , updateQuery , openPopover} from '../store/actions/app.actions'
import { connect } from 'react-redux';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { SketchPicker } from 'react-color';
import { ScreenOverlay } from './ScreenOverlay'

class _Home extends Component {

    state = {
        text: '' ,
        concept : '' ,
        conceptImages: [],
        currImg : '' ,
        concepts : [],
        images : [],
        openFilter : false,
        openColor : false,
        color : "#fff",
        top: '',
        left : '', 
        width : ''
    }

    componentDidMount() {
        const { getImages, getRelatedImages , query , images} = this.props
        this.setState({ images})
        const {text} = this.state
        if(text)
            this.props.history.push('/search?' + text)

    }

    componentDidMount() {
        this.onSetPopoverPos()
    }
    
    handleChange = (ev , field = null) => {
        const { value } = ev.target;
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSearch(field)
            return;
        }
        if (!field) this.setState({ text: value });
        else this.setState({ concept: value });

    }

    async onSearch (e){
        const { text } = this.state
        if (!text) {
            return;
        }
        try{
            await this.props.updateQuery(text)
        }
        catch(err){
            console.log(err);
        }
        const {query} = this.props
        const curr_query = {"query" : query} 
        try{
            await this.props.getImages(curr_query)
            const {images } = this.props
            this.setState({images:images , conceptImages:[] , relatedImages:[]})
        }
        catch (err) {
            console.error(err)
        }
        this.setState({...this.state , concept: '', concepts: [] , currImg:''})
    }


    async onConcept (e){
        const {concepts, concept , text} = this.state
        if (concept) {
            concepts.unshift(concept)
        }
        try{
            await this.props.updateQuery(text + ' ' + concept)
        }
        catch(err){
            console.log(err);
        }
        const curr_query = {"query" : text , "concept" : concepts.join(' ')} 
        try{
            await this.props.getConcept(curr_query)
            const {conceptImages } = this.props
            this.setState({conceptImages:conceptImages , relatedImages:[]})
        }
        catch (err) {
            console.error(err)
        }
        this.setState({...this.state  , concept: '', currImg:'' })
    }

    updataConcept = (e) => {
        const {concepts} = this.state
        concepts.splice(e.target.id, 1)
        this.setState({...this.state , concepts: concepts})
        if (concepts.length > 0) this.onConcept(e)
        else this.setState({...this.state , conceptImages: []})
    }
    
    async onSetImage(e){
        e.preventDefault()
        const query = { 'query' : e.target.id }
        try{
            await this.props.getRelatedImages(query)
            const {relatedImages } = this.props
            this.setState({relatedImages:relatedImages , conceptImages:[]})
        }
        catch (err) {
            console.error(err)
        }
        this.setState({...this.state , currImg:e.target.id, concept: '', concepts: [] , text : this.props.query})
    }
    
    toggleFilter = () => {
        this.setState({...this.state , openFilter: !this.state.openFilter})
    }
    toggleColor = () => {
        this.setState({...this.state , openColor: !this.state.openColor})
    }
    setColor = (color) => {
        this.setState({...this.state , color:color.hex})
    }

    onOpenPopover = (e, popoverName) => {
        const elPos = e.target.getBoundingClientRect()
        this.props.openPopover(popoverName, elPos)
    }

    onSetPopoverPos = () => {
        const {elPos} = this.props
        if (!elPos) return 
        if (this.props.currPopover.elPos && this.props.currPopover.elPos.top && this.props.currPopover.elPos.left && this.props.currPopover.elPos.top.width){
            const { top, left, width } = this.props.currPopover.elPos
            this.setState({ top, left, width })
        }
    }

    render() {
        const {color , openColor, openFilter , currImg ,text , concept, concepts , url , images , conceptImages ,relatedImages } = this.state
        return (
            <div className="container main-container ">
                <div className="search flex">
                            <input  type="search" placeholder="What are you looking for?" value={text} onChange={this.handleChange} onKeyDown={this.handleChange}/>
                            <button className="btn btn-primary" onClick={(e) => this.onSearch(e)}>Search</button>
                            <button className="filter-btn btn btn-primary"  onClick={(ev) => this.onOpenPopover(ev, 'Filter')}>Filters</button>
                </div>
                <div className="image-container">
                    <div className="image-list"  onClick={(e) =>this.onSetImage(e)}>
                        {images && (images.length > 0 ) && images.map((image , index) => {
                            return <div class="card" className= {`image-card card ${image.id === currImg ? 'active' : '' }`} style={{width: "200px" , height:"200px" ,marginBottom:"20px", marginLeft:"20px"}}>
                                <img class="card-img-top" className="img card-img-top" id={image.id} src={image.url}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className="search concept flex">
                    <input  type="search" placeholder="Add Concepts" value={concept} onChange={(e) => this.handleChange(e, 'concept')} onKeyDown={(e) => this.handleChange(e , 'concept')}/>
                    <button className="btn btn-primary" onClick={(e) => this.onConcept(e)}>Add</button>
                    {concepts.length > 0 && concepts.map((concept,index) =>{
                        return <butten className="btn concept-btn" id={index} onClick={(e) => this.updataConcept(e)}>{concept}</butten>
                    })}
                </div>
                <div className="image-container">
                    <div className="image-list" >
                        {relatedImages && (relatedImages.length > 0 ) && relatedImages.map((image , index) => {
                            return <div class="card" className="image-card card" style={{width: "200px" , height:"200px" ,marginBottom:"20px", marginLeft:"20px"}}>
                                <img class="card-img-top" className="img card-img-top" id={image.id} src={image.url}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className="image-container">
                    <div className="image-list" >
                        {conceptImages && (conceptImages.length > 0 ) && conceptImages.map((image , index) => {
                            return <div class="card" className="image-card card" style={{width: "200px" , height:"200px" ,marginBottom:"20px", marginLeft:"20px"}}>
                                <img class="card-img-top" className="img card-img-top" id={image.id} src={image.url}/>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        query: state.appModule.query,
        image: state.appModule.image,
        images: state.appModule.images,
        relatedImages: state.appModule.relatedImages,
        conceptImages: state.appModule.conceptImages,
    }
}

const mapDispatchToProps = {
    getImages,
    getRelatedImages,
    getConcept, 
    updateQuery,
    openPopover
}

export const Home = connect(mapStateToProps ,mapDispatchToProps)(_Home)
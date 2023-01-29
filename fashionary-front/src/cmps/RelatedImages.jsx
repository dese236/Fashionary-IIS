import React, { Component } from 'react'
import { setImgId , getRelatedImages } from '../store/actions/app.actions'
import { connect } from 'react-redux'

class  _RelatedImages extends Component {
    state = {
        image : '',
        paths : [],
        ids : [],
        relatedImages : [],
        conceptImages : [],
    }
    componentDidMount() {
        const {relatedImages , conceptImages , images} = this.props
        this.setState({...this.state , conceptImages:conceptImages ,relatedImages:relatedImages , images:images}) 
    }
    componentDidMount() {
        const {relatedImages , conceptImages , images} = this.props
        this.setState({...this.state , conceptImages:conceptImages ,relatedImages:relatedImages , images:images}) 

    }

    getImages = () => {
        const { relatedImages , conceptImages} = this.props
        if (conceptImages["best_photo_ids"] && conceptImages["best_photo_ids"].length > 0)
            return conceptImages["best_photo_ids"]
        else{
            return relatedImages
        }
    }

    render(){
        const images = this.getImages()
        return (
            <div className="img-list related" >
                {images && (images.length > 0 ) && images.map((path , index) => {
                    return <img className="img-card" id={index} src={'/images_new/'+ path + '.png'}/>
                })}
            </div>
        )}
    }

function mapStateToProps(state) {
    return {
        query: state.appModule.query,
        image: state.appModule.image,
        relatedImages: state.appModule.relatedImages,
        conceptImages : state.appModule.conceptImages 
    }
}

const mapDispatchToProps = {
    setImgId,
    getRelatedImages
}
export const RelatedImages = connect(mapStateToProps ,mapDispatchToProps)(_RelatedImages)


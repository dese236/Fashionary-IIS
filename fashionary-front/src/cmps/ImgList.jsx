import React, { Component } from 'react'
import { setImgId , getRelatedImages } from '../store/actions/app.actions'
import { connect } from 'react-redux'

class  _ImgList extends Component {
    state = {
        image : '',
        paths : [],
        ids : [],
        relatedImages : [],
    }
    componentDidMount() {
        const {images} = this.props
        this.setState({ ...this.state, paths : images['paths'] , ids : images['ids'] })
    }

    async onSetImage(e){
        e.preventDefault()
        this.props.onSetImage(e)
        this.setState({...this.state , image : e.target.id})
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

    render(){
        const {paths , ids , relatedImages} = this.state
        const {images} = this.props
        return (
            <div className="img-list"  onClick={(e) =>this.onSetImage(e)}>
                {paths && (paths.length > 0 ) && paths.map((path , index) => {
                    return <img className="img-card" id={path} src={'/images_new/'+ path + '.png'}/>
                })}
            </div>
        )}
    }

function mapStateToProps(state) {
    return {
        query: state.appModule.query,
        image: state.appModule.image,
        images: state.appModule.images,
        relatedImages: state.appModule.relatedImages,
        conceptImages: state.appModule.relatedImages
    }
}

const mapDispatchToProps = {
    setImgId,
    getRelatedImages
}
export const ImgList = connect(mapStateToProps ,mapDispatchToProps)(_ImgList)



import { Component } from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { openPopover } from '../store/actions/app.actions'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { SketchPicker } from 'react-color';

class _PopoverFilter extends Component {

    state = {
        color: "#fff",
        filters : { 
            "brand": false ,
             "color" :false , 
             "size":false ,
             "rating":false 
        },
        brands:[
        {key:'123' , label: "Brand1"},
        {key:'456' , label: "Brand2"},
        {key:'789' , label: "Brand3"},
        {key:'012' , label: "Brand4"},
        {key:'345' , label: "Brand5"},
        {key:'647' , label: "Brand6"},
        ],
        fields:{ text: 'Brand', value: 'id' }
    }

    onOpenPopover = (ev, PopoverName) => {
        if(PopoverName === "COLOR"){

        }
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        this.props.openPopover(PopoverName, elPos, props)
    }
    get activities() {
        return this.props.board.activities
    }

    setColor = (color) => {
    }

    setFilter = (ev ,filter) => {
        switch (filter) {
            case "brand":
                this.setState({...this.state , filters : { "brand": true , "color" :false , "size":false ,"rating":false }})
            case ("color") :
                this.setState({...this.state , filters : { "brand": false , "color" :true , "size":false ,"rating":false }})
            case ("size") :
                this.setState({...this.state , filters : { "brand": false , "color" :false , "size":true ,"rating":false }})
            case ("rating") :
                this.setState({...this.state , filters : { "brand": false , "color" :false , "size":false ,"rating":true }})
            default:
                return 
        }
    }
   
    render() {
        const { board } = this.props
        const {color , filters , fields , brands} = this.state
        return <div className="board-menu-wrapper">
            <Popover displayMode="menu" title="Filters" className="pop-over-header">
            <div className="pop-over-content">
                <div className="pop-over-label" onClick={(ev) =>{   
                    this.setFilter(ev, "brand")}}>
                    <h3>Brand</h3>    
                </div> 
                {filters.brand &&
                <div className="pop-over-label">
                       <DropdownMultiselect options={brands} name="Brands" />          
                </div> }                          
                <div className="pop-over-label" onClick={(ev) =>{   
                    this.setFilter(ev, "color")}}>
                        <h3>Color </h3>
                   {
                    filters.color &&
                    <div className="pop-over-label">
                            <SketchPicker
                                color={color}
                            onChangeComplete={ this.setColor }
                            />        
                    </div> 
                   } 
                </div>                            
                <div className="pop-over-label">
                    <h3>Size</h3>    
                </div>                            
                <div className="pop-over-label">
                    <h3>Rating</h3>    
                </div> 
            </div>
            </Popover>
        </div>
    }
}


const mapDispatchToProps = {
    openPopover
}


export const PopoverFilter = connect(null, mapDispatchToProps)(_PopoverFilter)
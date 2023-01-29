import { Component } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Popover } from "./Popover"

import { openPopover } from '../store/actions/app.actions'
import { SketchPicker } from 'react-color';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

class _PopoverBrand extends Component {
    state = {
        color : "#fff",

        brands:[
            {id:'123' , Brand: "Brand1"},
            {id:'456' , Brand: "Brand2"},
            {id:'789' , Brand: "Brand3"},
            {id:'012' , Brand: "Brand4"},
            {id:'345' , Brand: "Brand5"},
            {id:'647' , Brand: "Brand6"},
        ],
        fields:{ text: 'Brand', value: 'id' }
    }

    setColor = (color) => {
    }

    onOpenPopover = (ev, PopoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        this.props.openPopover(PopoverName, elPos, props)
    }
    get activities() {
        return this.props.board.activities
    }
    render() {
        const { board } = this.props
        const { color , brands ,fields} = this.state
        return <div className="board-menu-wrapper">
            <Popover displayMode="menu" title="Brand">
            {/* <div className="pop-over-content ">
                <div  style={{display: 'flex', flexDirection: 'column' , alignItems:"baseline"}}>
                <div className="pop-over-label"> 
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label class="form-check-label" for="exampleRadios3"> Brand OPT 1</label>
                </div>   

                <div className="pop-over-label"> 
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label class="form-check-label" for="exampleRadios3"> Brand OPT 2</label>
                </div>   

                <div className="pop-over-label"> 
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label class="form-check-label pop-over-label" for="exampleRadios3"> Brand OPT 3</label>
                </div>   

                <div className="pop-over-label"> 
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label class="form-check-label" for="exampleRadios3"> Brand OPT 4</label>
                </div>   
                </div>
            </div>  */}
        <MultiSelectComponent id="checkbox" dataSource={brands} fields={fields} placeholder="Select Brands" mode="CheckBox" maximumSelectionLength={3}>
            <Inject services={[CheckBoxSelection]}/>
        </MultiSelectComponent>

            </Popover>
        </div>
    }
}

const mapDispatchToProps = {
    openPopover
}


export const PopoverBrand = connect(null, mapDispatchToProps)(_PopoverBrand)
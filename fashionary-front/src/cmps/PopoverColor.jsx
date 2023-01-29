import { Component } from "react"
import { connect } from 'react-redux'
import { Popover } from "./Popover"
import { openPopover } from '../store/actions/app.actions'
import { SketchPicker } from 'react-color';

class _PopoverColor extends Component {
    state = {
        color : "#fff"
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
        const { color } = this.state
        return <div className="board-menu-wrapper">
            <Popover displayMode="menu" title="Color">
                   <SketchPicker
                                color={color}
                            onChangeComplete={ this.setColor }
                            />
            </Popover>
        </div>
    }
}

const mapDispatchToProps = {
    openPopover
}


export const PopoverColor = connect(null, mapDispatchToProps)(_PopoverColor)
// import { userService } from '../../services/user.service.js'

const initialState = {
    image: '',
    images: [],
    relatedImages: [],
    conceptImages: [],
    query: '',
    concepts: [],
    currPopover: {
        elPos: null,
        name: '',
        props: null
    },
    isOverlayOpen: false,
    elPos: null,
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_IMAGES':
            return { ...state, images: action.images }
        case 'GET_IMAGE':
            return { ...state, relatedImages: action.relatedImages }
        case 'GET_RELATED':
            return { ...state, relatedImages: action.relatedImages}
        case 'GET_CONCEPT':
            return { ...state, conceptImages: action.conceptImages}
        case 'UPDATE_QUERY':
            return { ...state, query: action.query}
        case 'SET_POPOVER':
            return { ...state, currPopover: { name: action.popoverName, elPos: action.elPos, props: action.props }, isOverlayOpen: true }
        case 'CLOSE_POPOVER':
            return { ...state, currPopover: { name: '', elPos: null, props: null }, isOverlayOpen: false }
        default:
            return state
    }
}
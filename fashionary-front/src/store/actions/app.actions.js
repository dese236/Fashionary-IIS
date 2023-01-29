import { httpService } from "../../services/http.ser"
import { apiService } from "../../services/http.service"
import { middleService } from "../../services/middle.service"
export function getImages(query) {
    return async dispatch => {
        try {
            const images_dict = await middleService.getImages(query)
            const images_json = JSON.parse(images_dict)
            const brands = images_json.brands
            const images = images_json.best_photo_ids
            dispatch({ type: 'GET_IMAGES', images })
        } catch (err) {
            console.log('UserActions: err in GET_IMAGES', err)
        }
    }
}

export function setImgId(image){
    return dispatch =>{
        try{
            dispatch({type : 'SET_IMAGE' , image})

        }
        catch(err){
            console.log('UserActions: err in SET_IMAGE', err)

        }
    }
}

export function getRelatedImages(image) {
    return async dispatch => {
        try {
            const images = await middleService.getRelatedImages(image)
            const related_json = JSON.parse(images)
            const relatedImages = related_json.best_photo_ids
            dispatch({ type: 'GET_RELATED', relatedImages })
        } catch (err) {
            console.log('UserActions: err in GET_RELATED', err)
        }
    }
}

export function getConcept(query) {
    return async dispatch => {
        try {
            const images = await middleService.getConcept(query)
            const concept_json = JSON.parse(images)
            const conceptImages = concept_json.best_photo_ids
            dispatch({ type: 'GET_CONCEPT', conceptImages })
        } catch (err) {
            console.log('UserActions: err in GET_RELATED', err)
        }
    }
}

export function updateQuery(query) {
    return async dispatch => {
        try {
            dispatch({ type: 'UPDATE_QUERY', query })
        } catch (err) {
            console.log('UserActions: err in GET_RELATED', err)
        }
    }
}

export function openPopover(popoverName, elPos, props ) {
    return dispatch => {
        const action = {
            type: 'SET_POPOVER',
            popoverName,
            elPos,
            props
        }
        dispatch(action)
    }
}

export function closePopover(popoverType=null , user , board) {
    return dispatch => {
        const action = {
            type: 'CLOSE_POPOVER',
        }
        dispatch(action)
    }
}





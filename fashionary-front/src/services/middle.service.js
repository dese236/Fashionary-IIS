import { apiService } from "./http.service"

export const middleService = {

    getImages,
    getRelatedImages,
    getConcept,
    setPopoverPos

}

async function getImages(query) {
   try {
    query = JSON.stringify(query)
    const images = await apiService('/search',"POST" , query)
    const image_dict = await images.text()
    return image_dict

} catch (err) {
    return err
}
}
async function getRelatedImages(image) {
   try {
    image = JSON.stringify(image)
    const images = await apiService('/similar',"POST" , image)
    const image_list = await images.text()
    return image_list

} catch (err) {
    return err
}
}

async function getConcept(query) {
   try {
    query = JSON.stringify(query)
    const images = await apiService('/concept',"POST" , query)
    const image_list = await images.text()
    return image_list

} catch (err) {
    return err
}
}


function setPopoverPos(pos, elRect, diff = 38) {
    let { left, top } = pos
    top += diff
    const { height, width } = elRect
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    if (left + width > viewportWidth) left = viewportWidth - width - 10
    if (top + height > viewportHeight) top = viewportHeight - height - 10
    return { left, top, width }
}
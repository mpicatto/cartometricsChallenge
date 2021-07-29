export const SET_FEATURE = 'SET_FEATURE'
export const CLEAN_FEATURE = 'CLEAN_FEATURE'

export function setFeature(properties){
    return{type:SET_FEATURE, payload:properties}
}

export function cleanFeature(){
    return {type:CLEAN_FEATURE}
}
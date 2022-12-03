export default function(state={},action){
    switch(action.type){
        case 'GET_ADS':
            return { ...state,list:action.payload }
        case 'GET_GARDENING':
            return {...state,gardening:action.payload}
        case 'GET_BABYSITTER':
            return {...state,babysitter:action.payload}
        case 'GET_DIY':
            return {...state,diy:action.payload}
        case 'GET_PRIVATELESSONS':
            return {...state,PrivateLessons:action.payload}
        case 'GET_HOUSEWORK':
            return {...state,HouseWork:action.payload} 
        case 'GET_ESTHETICIAN':
            return {...state,esthetician:action.payload} 
        case 'GET_DETAILSAD':
            return {...state,adDetails:action.payload.adDetails,userDetails:action.payload.userDetails}  
        case 'CLEAR_ADS':
                return {
                    ...state,
                    adDetails:action.payload.adDetails,
                   
                }  
        case 'ADD_AD':
            return {...state,ad:action.payload.ad}
        case 'GET_USER_ADS':
            return{...state,login:action.payload.login,userAds:action.payload.userAds}  
        case'CLEARUSER_ADS':
             return{...state,userAds:action.payload.userAds}
        case 'UPDATE_AD':
            return {
                ...state,
                 updateAd:action.payload.success,
                 ade:action.payload.doc
                           }
                           case 'GET_AD_ID':
                            return {
                                         ...state,
                                       upDate:action.payload }

        default:
            return state;
    }
}
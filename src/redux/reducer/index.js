/*jshint esversion: 9 */

import * as types from "../actions/actionTypes"


const initialState={
  currentUser:null,
  error:null
}

const userReducer = (state=initialState,action)=>{
  switch (action.type) {
        case "setLoginResponse": {
          state = { ...action.payload };
          return state;
        }


        case types.SET_USER:
          return{
                ...state,
                currentUser: action.payload
          }

        case types.GOOGLE_SIGN_IN_START:
          case types.FACEBOOK_SIGN_IN_START:
            case types.LOGOUT_START:
          return{
            ...state
          }


          case types.GOOGLE_SIGN_IN_SUCCESS:
          case types.FACEBOOK_SIGN_IN_SUCCESS:
            return{
              ...state,
              currentUser: action.payload
            }

            
            case types.GOOGLE_SIGN_IN_FAIL:
            case types.FACEBOOK_SIGN_IN_FAIL:
              case types.LOGOUT_FAIL:
              return{
                ...state,
                error:action.payload
              }

          case types.LOGOUT_SUCCESS:
            return{
              ...state,
              currentUser:null
            }

         


        default:
          return state;
      }
}

export default userReducer


// const reducer = (state = {},action ={}) => {
//   switch (action.type) {
//     case "setLoginResponse": {
//       state = { ...action.payload };
//       return state;
//     }
//     default:
//       return state;
//   }
// };
//  export default reducer;

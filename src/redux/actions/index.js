/*jshint esversion: 6 */
import * as types from "./actionTypes"
import {auth,googleAuthProvider,facebookAuthProvider} from "../../firebase/firebaseConfig"
import { error } from "jquery"

const googleSignInStart=()=>({
type: types.GOOGLE_SIGN_IN_START
})

const googleSignInSuccess=(user)=>({
type: types.GOOGLE_SIGN_IN_SUCCESS,
payload: user
})

const googleSignInFail=(error)=>({
type: types.GOOGLE_SIGN_IN_FAIL,
payload: error
})

const facebookSignInStart=()=>({
   type: types.FACEBOOK_SIGN_IN_START
   })
   
   const facebookSignInSuccess=(user)=>({
   type: types.FACEBOOK_SIGN_IN_SUCCESS,
   payload: user
   })
   
   const facebookSignInFail=(error)=>({
   type: types.FACEBOOK_SIGN_IN_FAIL,
   payload: error
   })
   


   const logoutStart=()=>({
      type: types.LOGOUT_START
      })
      
      const logoutSuccess=(user)=>({
      type: types.LOGOUT_SUCCESS
      })
      
      const logoutFail=(error)=>({
      type: types.LOGOUT_FAIL,
      payload: error
      })
      



export const setUser= (user)=>({
   type: types.SET_USER,
   payload: user
})

export function setLoginResponse(data) {
   return {
      type: 'setLoginResponse',
      payload: data
   };
}

export const googleSignInInitiate=()=>{
   return function (dispatch){
      dispatch(googleSignInStart())
      auth
      .signInWithPopup(googleAuthProvider)
      .then(({user})=>{
         dispatch(googleSignInSuccess(user))
      })
      .catch((error)=>dispatch(googleSignInFail(error.message)));
   }
}
export const facebookSignInInitiate=()=>{
   return function (dispatch){
      dispatch(facebookSignInStart())
      auth
      .signInWithPopup(facebookAuthProvider.addScope("email"))
      .then(({user})=>{
         dispatch(facebookSignInSuccess(user))
      })
      .catch((error)=>dispatch(facebookSignInFail(error.message)));
   }
}

export const logoutInitiate=()=>{
   return function (dispatch){
      dispatch(logoutStart())
      auth
      .signOut()
      .then((res)=>
         dispatch(logoutSuccess())
      )
      .catch((error)=>dispatch(logoutFail(error.message)));
   }
}





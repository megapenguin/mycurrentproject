import React, { createContext, useEffect, useReducer } from "react"
import AuthReducer from "../GlobalReducer/AuthReducer"
import axios from "axios"

const AuthContext = createContext()

let initialState = {
  secureToken: "",
  isAuthenticated: false,
  userData: {},
  isLoading: true,
}
console.log(initialState)
function AuthContextProvider({ children }) {
  let [state, dispatch] = useReducer(AuthReducer, initialState)

  const reAuthenticate = async () => {
    let token = localStorage.getItem("token")

    // console.log(token, "TOKEN")

    let res = await axios
      .post(
        "/api/v1/auths/",
        { token },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        console.log(error)
        localStorage.removeItem("token")
      })

    console.log(res)

    if (res) {
      dispatch({
        type: "LOAD_TOKEN",
        secureToken: res.data.token,
        userData: res.data.userData,
      })
    } else {
      dispatch({ type: "LOADING" })
    }
  }
  useEffect(() => {
    reAuthenticate()
  }, [])

  const authenticate = async (userInfo) => {
    console.log(userInfo)
    let res = await axios
      .post("/api/v1/auths/auth_login", {
        ...userInfo,
      })
      .catch((error) => error.response)

    if (res.status === 422) {
      return { success: false, errorMassage: "Invalid email or password" }
    } else if (res.status === 200) {
      localStorage.setItem("token", res.data.token)

      dispatch({
        type: "LOAD_TOKEN",
        secureToken: res.data.secureToken,
        userData: res.data.userData,
      })

      return { success: true }
    }
  }

  return (
    <AuthContext.Provider value={{ state, authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, AuthContext }

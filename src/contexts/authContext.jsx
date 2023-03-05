import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [reqInfo, setReqInfo] = useState(false);

  /**
   * Login
   * @param {*} username
   * @param {*} password
   * @param {*} cb
   */
  const signin = (username, password, cb = null) => {
    axios
      .get(
        "user/auth",
        {
          username: username,
          password: password,
        },
        {},
        false
      )
      .then((resp) => {
        localStorage.setItem(
          "login_data",
          JSON.stringify({
            username: username,
            password: password,
          })
        );
        localStorage.setItem("auth_data", JSON.stringify(resp.user));
        setUser(resp.user);
        setReqInfo(true);
        if (cb) {
          cb({
            success: true,
          });
        }
      })
      .catch((err) => {
        if (cb) {
          cb({
            success: false,
            ...err.responseJSON,
          });
        }
        setReqInfo(true);
      });
  };

  /**
   * Logout
   */
  const signout = () => {
    localStorage.removeItem("auth_data");
    localStorage.removeItem("login_data");
    setUser(null);
  };

  /**
   * First Open Page
   */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("login_data"));
    if (data) {
      signin(data.username, data.password);
    } else {
      setReqInfo(true);
    }
  }, []);

  /**
   * Return
   */
  return {
    user,
    reqInfo,
    signin,
    signout,
  };
}

export function useAuth() {
  return useContext(authContext);
}

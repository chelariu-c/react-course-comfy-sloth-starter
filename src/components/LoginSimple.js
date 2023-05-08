import { useEffect, useState, useRef } from "react";
import { useUserContext } from "../context/user_context";
import axios from "axios";

const Login = () => {
    const { url } = useUserContext();
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //axios apis
        try {
            const response = await axios.post(
                url,
                JSON.stringify({ user, pwd })
            );
            const setUserData = response.data;
            console.log("i have the object", setUserData);
            console.log(user, pwd);
            setUser(user);
            setPwd(pwd);
            setSuccess(true);
        } catch (err) {
            console.log(err);
            console.log("Some issue, naspaaa", errMsg);
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in {user.firstName}!</h1>
                    <br />
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account? <br />
                        <span className="line"></span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;

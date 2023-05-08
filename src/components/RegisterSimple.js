// import { useEffect, useRef, useState } from "react";
// import { user_url as url } from "../utils/constants";
// import axios from "axios";
// import styled from "styled-components";

// const Register = () => {
//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         password: "",
//         email: "",
//         address: "",
//         contact: "",
//         role: "USER",
//     });

//     const [errMsg, setErrMsg] = useState("");
//     const [success, setSuccess] = useState(false);

//     const userRef = useRef();
//     const errRef = useRef();

//     const registerUser = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(url, user);
//             console.log(JSON.stringify(response?.data));
//             setSuccess(true);

//             setUser({
//                 firstName: "",
//                 lastName: "",
//                 password: "",
//                 email: "",
//                 address: "",
//                 contact: "",
//                 role: "USER",
//             });
//         } catch (err) {
//             setErrMsg("Internal server error", err);
//         }
//     };

//     useEffect(() => {
//         userRef.current?.firstName.focus();
//         userRef.current?.lastName.focus();
//         userRef.current?.address.focus();
//         userRef.current?.contact.focus();
//         userRef.current?.password.focus();
//         userRef.current?.role.focus();
//     }, []);

//     return (
//         <Wrapper>
//             {success ? (
//                 <section>
//                     <h1>You created a new account!</h1>
//                     <br />
//                 </section>
//             ) : (
//                 <section>
//                     <p
//                         ref={errRef}
//                         className={errMsg ? "errmsg" : "offscreen"}
//                         aria-live="assertive"
//                     >
//                         {errMsg}
//                     </p>

//                     <div className="AuthFormContainer">
//                         <form className="AuthForm" onSubmit={registerUser}>
//                             <div className="Auth-form-content">
//                                 <h3 className="Auth-form-title">Sign Up</h3>

//                                 <div className="form-group mt-3">
//                                     <label htmlFor="firstName">
//                                         First Name:
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="firstName"
//                                         autoComplete="off"
//                                         className="form-control mt-1"
//                                         placeholder="e.g Chelariu"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 firstName: e.target.value,
//                                             })
//                                         }
//                                         value={user.firstName}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="form-group mt-3">
//                                     <label htmlFor="lastName">Last Name:</label>
//                                     <input
//                                         type="text"
//                                         id="lastName"
//                                         autoComplete="off"
//                                         className="form-control mt-1"
//                                         placeholder="e.g Cosmin"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 lastName: e.target.value,
//                                             })
//                                         }
//                                         value={user.lastName}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group mt-3">
//                                     <label htmlFor="password">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className="form-control mt-1"
//                                         placeholder="Password"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 password: e.target.value,
//                                             })
//                                         }
//                                         value={user.password}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="form-group mt-3">
//                                     <label htmlFor="email">Email:</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         autoComplete="off"
//                                         className="form-control mt-1"
//                                         placeholder="email"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 email: e.target.value,
//                                             })
//                                         }
//                                         value={user.email}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="form-group mt-3">
//                                     <label htmlFor="address">Address:</label>
//                                     <input
//                                         type="text"
//                                         id="address"
//                                         autoComplete="off"
//                                         className="form-control mt-1"
//                                         placeholder="e.g Iasi, Copou"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 address: e.target.value,
//                                             })
//                                         }
//                                         value={user.address}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group mt-3">
//                                     <label htmlFor="contact">Mobile:</label>
//                                     <input
//                                         type="phone"
//                                         id="contact"
//                                         autoComplete="off"
//                                         className="form-control mt-1"
//                                         placeholder="phone number"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 contact: e.target.value,
//                                             })
//                                         }
//                                         value={user.contact}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="form-group mt-3">
//                                     <input
//                                         type="hidden"
//                                         id="role"
//                                         onChange={(e) =>
//                                             setUser({
//                                                 ...user,
//                                                 role: e.target.value,
//                                             })
//                                         }
//                                         defaultValue="USER"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="btnm">
//                                     <button type="submit">Register</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </section>
//             )}
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     .AuthForm {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100vh;
//     }

//     .Auth-form-content {
//         background-color: white;
//         width: 400px;
//         padding: 30px;
//         border-radius: 5px;
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//     }

//     .Auth-form-title {
//         font-size: 1.5rem;
//         text-align: center;
//         margin-bottom: 30px;
//     }

//     .form-group {
//         margin-bottom: 15px;
//     }

//     label {
//         display: block;
//         font-size: 0.8rem;
//         margin-bottom: 5px;
//     }

//     input[type="text"],
//     input[type="password"],
//     input[type="email"],
//     input[type="phone"] {
//         display: block;
//         width: 100%;
//         padding: 8px;
//         font-size: 0.9rem;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//         background-color: #f7f7f7;
//     }

//     .btnm button {
//         text-align: center;
//         margin-top: 20px;
//         background-color: #4caf50;
//         color: white;
//         border: none;
//         padding: 10px 15px;
//         border-radius: 5px;
//         cursor: pointer;
//         justify-content: center;
//     }

//     .btnm button:hover {
//         background-color: #3e8e41;
//     }
// `;

// export default Register;

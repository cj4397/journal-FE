'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './components/auth';
import { useDatabase } from './components/api';
import { useState } from "react";
import "./login.css"


export default function Home() {
  const route = useRouter();
  const { token, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slide, setSlide] = useState(false);
  const { sign_in, sign_up } = useDatabase();

  if (token !== null) {
    return route.push('/dashboard')
  }

  async function signin() {
    const result = await sign_in(email, password)
    if (result) {
      login(
        result.user,
        result.token
      )
      route.push('/dashboard')
    } else {
      console.log("invalid email or password")
    }
  }

  async function signup() {
    const result = await sign_up(name, email, password)
    console.log(result)
    if (result) {
      login(
        result.user,
        result.token
      )
      route.push('/dashboard')
    } else {
      console.log("invalid email or password")
    }
  }

  const handleSubmit_sign_in = (e: any) => {
    e.preventDefault();
    signin()
  }

  const handleSubmit_sign_up = (e: any) => {
    e.preventDefault();
    signup()
  }

  const slide_animation = () => {
    setSlide(slide ? false : true)
  }

  return (
    <main id='body'>

      <div className={`container , ${slide ? 'right-panel-active' : ''}`} id="sidebar">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit_sign_up} autoComplete="on">
            <h1>Create Account</h1>

            <input id="new_name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input id="new_email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input id="new_password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button className="ghost">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">




          <form onSubmit={handleSubmit_sign_in}>
            <h1>Sign in</h1>


            <input id="user_email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input id="user_password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button className="ghost">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button onClick={slide_animation} className="ghost"
                id="signIn">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={slide_animation}

                className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

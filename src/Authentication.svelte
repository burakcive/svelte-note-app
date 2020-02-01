<script>
  import { auth, googleProvider } from "./data/firebase";
  import { authState } from "rxfire/auth";

  let email;
  let password;
  let registerName;
  let registerEmail;
  let registerPassword;
  let isRegisterFormActive = false;
  const onRegister = () => {
    auth.createUserWithEmailAndPassword(registerEmail, registerPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  };

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");

    auth.signInWithPopup(googleProvider);
  };

  const toggleRegisterForm = () => {
    isRegisterFormActive = !isRegisterFormActive;
  };
</script>

<style>
  .register-form-active {
    display: block !important;
  }

  .authContainer {
    grid-column: 2;
  }

  .login-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }
  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: rgb(186, 97, 97);
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    margin-bottom: 1em;
  }
  .form button:hover,
  .form button:active,
  .form button:focus {
    background: rgb(133, 53, 53);
  }
  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }

  .form .register-form {
    display: none;
  }

  .form .login-form {
    display: none;
  }

  b{
      color: rgb(186, 97, 97);
      cursor: pointer;
  }
</style>

<!-- <div class="authContainer">
  <input bind:value={email} type="email" placeholder="Email" />
  <br />
  <input bind:value={password} type="password" placeholder="Password" />
  <br />
  <button on:click={onGoogleSignIn}>SignIn by Google</button>
  <button on:click={onRegister}>Register</button>
  <button on:click={signIn}>SignIn</button>
</div> -->

 <div class="authContainer login-page">
  <div class="form">
    <div
      class="register-form"
      class:register-form-active={isRegisterFormActive === true}>
      <input  bind:value={registerName} type="text" placeholder="name" />
      <input bind:value={registerEmail} type="text" placeholder="email address" />
      <input bind:value={registerPassword} type="password" placeholder="password" />
      <button on:click={onRegister}>Register</button>
      <p class="message">
        Already registered?
        <b on:click={toggleRegisterForm}>Sign In</b>
      </p>
    </div>

    <div class="login-form"  class:register-form-active={isRegisterFormActive !== true}>
      <input bind:value={email} type="text" placeholder="Email" />
      <input  bind:value={password} type="password" placeholder="password" />
      <button on:click={signIn}>Log In</button>

      <button on:click={onGoogleSignIn}>SignIn by Google</button>
      <p class="message">
        Not registered?
        <b on:click={toggleRegisterForm}>Create an account</b>
      </p>
    </div>
  </div>
</div> 

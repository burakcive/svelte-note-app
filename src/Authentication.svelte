<script>
  import { auth, googleProvider } from "./data/firebase";
  import { authState } from "rxfire/auth";

  let email;
  let password;

  const onRegister = () => {
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
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
</script>

<style>
  .authContainer {
    grid-column: 2;
  }
</style>

<div class="authContainer">
  <input bind:value={email} type="email" placeholder="Email" />
  <br />
  <input bind:value={password} type="password" placeholder="Password" />
  <br />
  <button on:click={onGoogleSignIn}>SignIn by Google</button>
  <button on:click={onRegister}>Register</button>
  <button on:click={signIn}>SignIn</button>
</div>

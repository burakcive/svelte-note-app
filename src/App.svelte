<script>
  import NavBar from "./NavBar.svelte";
  import NoteContainer from "./NoteContainer.svelte";
  import { onMount, setContext } from "svelte";

  import DateBar from "./DateBar.svelte";
  import SettingsBar from "./SettingsBar.svelte";

  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";

  let user;
  $: authenticated = user != null;
  // Query requires an index, see screenshot below
  const unsubscribe = authState(auth).subscribe(u => (user = u));

  const userClicked = e => {
    if (!user) {
      auth.signInWithPopup(googleProvider);
    } else {
      auth.signOut();
    }
  };
</script>

<style>
  .navigation {
    background-color: rgb(90, 96, 102);
    height: 25px;
    z-index: 100;
    display: grid;
    grid-template-columns: 5fr auto;
    font-family: poor richard regular;
    font-size: 16px;

    grid-area: navigation;
  }

  .note-container {
    grid-area: container;
    background-color: #fcfbf5;
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(40em, 40em);
    grid-gap: 1em;*/
    overflow: auto;
    padding: 1em;
    display: flex;
    flex-wrap: wrap;
  
   justify-content:space-around;
  /* justify-content:space-around;
    justify-content:space-between; */
  }

  .main-grid {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr;

    grid-template-areas:
      "navigation  navigation navigation"
      "container container container";
  }

  h3 {
    color: #343a40;
    grid-column: 2;
  }
</style>

{#if user != null}
  <h2>User is logged in {user.uid}</h2>
{/if}

<div class="main-grid">

  <DateBar />
  <SettingsBar {authenticated} on:userClicked={userClicked} />

  <div class="navigation">
    <NavBar />
  </div>
  <div class="note-container">
    {#if user != null}
      <NoteContainer userId={user.uid} />
    {:else}
      <h3>You are note logged in. Click on user icon to login!</h3>
    {/if}
  </div>

</div>

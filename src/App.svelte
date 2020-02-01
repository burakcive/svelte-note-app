<script>
  import NavBar from "./NavBar.svelte";
  import NoteContainer from "./NoteContainer.svelte";
  import { onMount } from "svelte";

  import DateBar from "./DateBar.svelte";
  import SettingsBar from "./SettingsBar.svelte";
  import AuthenticationForm from "./Authentication.svelte";
  import { auth } from "./data/firebase";
  import { authState } from "rxfire/auth";

  let user;
  $: authenticated = user != null;
  // Query requires an index, see screenshot below
  const unsubscribe = authState(auth).subscribe(u => (user = u));

  const userClicked = e => {
    auth.signOut();
  };

  const getAllNotes = () => {
    console.log("getAllNotes");
  };

  const getFavoriteNotes = () => {
    console.log("getFavoriteNotes");
  };
</script>

<style>
  .navigation {
    /* background-color: rgb(90, 96, 102); */
    background-color: rgb(89, 89, 89);
    height: 25px;
    z-index: 100;
    display: grid;
    grid-template-columns: 5fr auto;
    font-family: "Lora", serif;
    font-size: 16px;

    grid-area: navigation;
  }

  .note-container {
    grid-area: container;
    background-color: #fcfbf5;
    overflow: auto;
    padding: 1em;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-around; */
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

  .auth-cover {
    background: url(https://c.wallhere.com/photos/d4/ec/books_vintagebooks_coffee_espresso_music_pointofview_fromabove_musicnotes-661420.jpg!d);
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

{#if user != null}
  <h2>User is logged in {user.uid}</h2>
{/if}

<div class="main-grid" class:auth-cover={user === null}>

  {#if user != null}
    <SettingsBar {authenticated} on:userClicked={userClicked} />
  {/if}

  <div class="navigation">
    <NavBar />
  </div>

  {#if user != null}
    <DateBar
      on:getfavoritenotes={getFavoriteNotes}
      on:getallnotes={getAllNotes} />

    <div class="note-container">
      <NoteContainer userId={user.uid} />
    </div>
  {:else}
    <AuthenticationForm />
  {/if}

</div>

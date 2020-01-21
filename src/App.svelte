<script>
  import { fade, fly } from "svelte/transition";
  import NavBar from "./NavBar.svelte";
  import Footer from "./Footer.svelte";
  import NoteItem from "./NoteItem.svelte";
  import ToolBar from "./ToolBar.svelte";
    import DateBar from "./DateBar.svelte";

  import { activeItem } from "./store.js";

  let notes = [
    // { id: 1, header: "Item 1", text: "Lorem ipsum dor sit amet!" },
    // { id: 2, header: "Item 2", text: "hore more" }
  ];

  if(window.localStorage.getItem("notes")){
     notes = JSON.parse(window.localStorage.getItem("notes"));
  }

  let activeNote = {};
  let backgroundActive = false;
  if(window.localStorage.getItem("bgactive")){
    backgroundActive = JSON.parse(window.localStorage.getItem("bgactive"));
  }

  const addNewNoteItem = () => {
    let id = notes.length + 1;
    notes = [...notes, { id: id, header: "", text: "" }];
  };

  const deleteActiveNoteItem = () => {
    if (activeNote && activeNote.length > 0) {
      notes = notes.filter(n => n.id !== activeNote[0].id);
    }
  };

  const onNoteItemSelected = e => {
    let idToSelect = e.detail;
    activeNote = notes.filter(n => n.id === idToSelect);

    console.log("active item ", activeNote);
    updateActiveItem(activeNote);
  };

  const updateNoteItem = e => {
    var updatedItem = e.detail;
    var index = notes.findIndex(n => n.id === updatedItem.id);
    notes[index] = updatedItem;

    window.localStorage.setItem("notes", JSON.stringify(notes));
  };

  const userClicked = e => {
    backgroundActive = !backgroundActive;

    window.localStorage.setItem("bgactive", JSON.stringify(backgroundActive));
  };

  function updateActiveItem(active) {
    activeItem.update(val => {
      return (val = active);
    });

    activeNote = active;
  }
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

  .background-active {
    background: url(https://i2.wp.com/www.iamabiker.com/wp-content/uploads/2018/04/Royal-Enfield-Thunderbird-350X-HD-wallpapers-1.jpg) !important;
    background-size: cover !important;
  }

  .text-container {
    grid-area: container;
    background-color: #fcfbf5;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(40em, 40em);
    grid-gap: 1em;
    overflow: auto;
    padding: 1em;
    padding-right: 3em;
  }

  .main-grid {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 2fr;

    grid-template-areas:
      "navigation  navigation navigation"
      "container container container"
      /* "footer footer footer"; */
  }

  .footer {
    grid-area: footer;
    background-color: #343a40 !important;
    height: 35px;
    z-index: 100;
  }

  h3 {
    color: #343a40;
    grid-column: 2;
  }
</style>

<div class="main-grid">

<DateBar />
  <ToolBar
    on:deleteNoteItem={deleteActiveNoteItem}
    on:addNewNoteItem={addNewNoteItem}
    on:userClicked={userClicked} />

  <div class="navigation">
    <NavBar />
  </div>
  <div
    on:click={e => updateActiveItem(null)}
    class="text-container"
    class:background-active={backgroundActive === true}>
    {#if notes.length > 0}
      {#each notes as note}
        <NoteItem
          {...note}
          on:onupdate={updateNoteItem}
          on:onselected={onNoteItemSelected} />
      {/each}
    {:else}
      <h3>Hello there, howdy? Click + sign to create a new note for Today</h3>
    {/if}
  </div>
  <!-- <div class="footer">
    <Footer />
  </div> -->

</div>

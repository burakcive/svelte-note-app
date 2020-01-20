<script>
  import NavBar from "./NavBar.svelte";
  import Footer from "./Footer.svelte";
  import NoteItem from "./NoteItem.svelte";
  import ToolBar from "./ToolBar.svelte";

  import { activeItem } from "./store.js";

  let notes = [
    { id: 1, header: "Item 1", text: "Lorem ipsum dor sit amet!" },
    { id: 2, header: "Item 2", text: "hore more" }
  ];

  let activeNote = {};

  const addNewNoteItem = () => {
    let id = notes.length + 1;
    notes = [...notes, { id: id, header: "", text: "" }];
  };

  const removeNoteItem = e => {
    let idToRemove = e.detail;
    notes = notes.filter(n => n.id !== idToRemove);
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
  };

  function updateActiveItem(activeNote) {
    activeItem.update(val => {
      return (val = activeNote);
    });
  }
</script>

<style>
  .navigation {
    grid-area: navigation;
    background-color: #5f5f5f;
    height: 25px;
    z-index: 100;
    display: grid;
    grid-template-columns: 5fr auto;
  }

  .text-container {
    grid-area: container;
    background-color: #efefef;
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
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 1fr;
    grid-template-rows: auto 2fr 2fr 2fr 2fr 2fr auto;

    grid-template-areas:
      "navigation navigation navigation navigation navigation navigation navigation"
      "container container container container container container container"
      "container container container container container container container"
      "container container container container container container container"
      "container container container container container container container"
      "container container container container container container container"
      "footer footer footer footer footer footer footer";
  }

  .footer {
    grid-area: footer;
    background-color: #343a40 !important;
    height: 35px;
    z-index: 100;
  }
</style>

<div class="main-grid">
  <ToolBar on:addNewNoteItem={addNewNoteItem} />

  <div class="navigation">
    <NavBar />
  </div>
  <div on:click={e => updateActiveItem(null)} class="text-container">
    {#each notes as note}
      <NoteItem
        {...note}
        on:onupdate={updateNoteItem}
        on:removenote={removeNoteItem}
        on:onselected={onNoteItemSelected} />
    {/each}

  </div>
  <div class="footer">
    <Footer />
  </div>

</div>

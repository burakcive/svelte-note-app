<style>
  .navigation {
    grid-area: navigation;
    background-color: #5f5f5f;
    height: 35px;
    z-index: 100;
  }

  .text-container {
    grid-area: container;
    background-color: #a8a8a8;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: minmax(500px, 700px);
    grid-gap: 1em;
    overflow: auto;
    padding: 1em;
    padding-right: 2em;
  }

  .main-grid {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 10fr auto;

    grid-template-areas:
      "navigation navigation navigation"
      "container container container"
      "footer footer footer";
  }

  .footer {
    grid-area: footer;
    background-color: #343a40 !important;
    height: 35px;
    z-index: 100;
    display: none;
  }
</style>

<script>
  import NavBar from "./NavBar.svelte";
  import Footer from "./Footer.svelte";
  import NoteItem from "./NoteItem.svelte";
  import ToolBar from "./ToolBar.svelte";

  let notes = [{id:1, header: "Item 1", text: "Lorem ipsum dor sit amet!" }, {id:2,header: "Item 2", text: "hore more" }]

  const addNewNoteItem = () => {
    let id = notes.length + 1;
	  notes = [...notes, {id: id, header: "", text: "" }]
  };

  const removeNoteItem = (e) => {
    let idToRemove = e.detail;
	  notes = notes.filter(n=> n.id !== idToRemove);
  };

</script>

<div class="main-grid">
  <ToolBar on:addNewNoteItem={addNewNoteItem} />

  <div class="navigation">
    <NavBar />
  </div>
  <div class="text-container">
  {#each notes as note}
    <NoteItem {...note}  on:removenote={removeNoteItem}/>
  {/each}	

  </div>
  <div class="footer">
    <Footer />
  </div>

</div>

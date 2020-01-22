<script>
  import ToolBar from "./ToolBar.svelte";
  import NoteItem from "./NoteItem.svelte";
  import { activeItem } from "./store.js";

  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let userId;
  let activeNote = {};

  let query = db
    .collection("todos")
    .where("uid", "==", userId)
    .orderBy("created");

  const notes = collectionData(query, "id").pipe(startWith([]));

  const addNewNoteItem = () => {
    db.collection("todos").add({
      uid: userId,
      header: "",
      text: "",
      created: Date.now()
    });
  };

  const deleteActiveNoteItem = () => {
    console.log("deleteActiveNoteItem");
    if (activeNote && activeNote.length > 0) {
      db.collection("todos")
        .doc(activeNote[0].id)
        .delete();
    }
  };

  const onNoteItemSelected = e => {
    console.log("onNoteItemSelected");
    let idToSelect = e.detail;
    activeNote = $notes.filter(n => n.id === idToSelect);

    console.log("active item ", activeNote);
    updateActiveItem(activeNote);
  };

  const updateNoteItem = e => {
    var updatedItem = e.detail;

    db.collection("todos")
      .doc(updatedItem.id)
      .update(updatedItem);
  };

  function updateActiveItem(active) {
    activeItem.update(val => {
      return (val = active);
    });
  }
</script>

<style>
  * {
    color: black;
  }

  h3{
    grid-column: 2;
  }
</style>

<svelte:body
  on:click={() => {
    updateActiveItem(null);
  }} />

<ToolBar
  on:deleteNoteItem={deleteActiveNoteItem}
  on:addNewNoteItem={addNewNoteItem} />

{#if $notes.length > 0}
  {#each $notes as note}
    <NoteItem
      {...note}
      on:onupdate={updateNoteItem}
      on:onselected={onNoteItemSelected} />
  {/each}
{:else}
  <h3>Hello there, howdy? Click + sign to create a new note for Today</h3>
{/if}

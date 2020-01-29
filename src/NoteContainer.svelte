<script>
  import ToolBar from "./ToolBar.svelte";
  import NoteItem from "./NoteItem.svelte";
  import { activeItem, selectedDateStore } from "./store.js";
  import { beforeUpdate, afterUpdate, onMount } from "svelte";

  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let userId;
  let activeNote = {};

  var grid;
  afterUpdate(() => {
    if (document.querySelector(".grid")) {
      var grid = new Muuri(".grid", {
        dragEnabled: false,    
        layout: {
          fillGaps: true
        }
      });

      
    }
    scrollDown();
  });

  let query = db
    .collection("todos")
    .where("uid", "==", userId)
    .orderBy("created");

  let notes = collectionData(query, "id").pipe(startWith([]));

  const addNewNoteItem = () => {
    db.collection("todos").add({
      uid: userId,
      header: "",
      text: "",
      created: Date.now(),
      dateString : new Date().toDateInputValue()
    });
  };

  function scrollDown() {
    var noteContainerElem = document.getElementsByClassName(
      "note-container"
    )[0];
    noteContainerElem.scrollTo(0, noteContainerElem.scrollHeight);
  }

  const deleteActiveNoteItem = () => {
    if (activeNote && activeNote.length > 0) {
      db.collection("todos")
        .doc(activeNote[0].id)
        .delete();
    }
  };

  const onNoteItemSelected = e => {
    let idToSelect = e.detail;
    activeNote = $notes.filter(n => n.id === idToSelect);

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

  selectedDateStore.subscribe(val => {
    if (val) {
      console.log("Selected Date is ", val);
      //get notes for this date
       let query = db
        .collection("todos")
        .where("uid", "==", userId)
         .where("dateString", "==", val)
        .orderBy("created");

      notes = collectionData(query, "id").pipe(startWith([]));
    }
  });

   Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

</script>

<style>
  * {
    color: black;
  }

  h3 {
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
  <div class="grid">
    {#each $notes as note}
      <NoteItem
        {...note}
        on:onupdate={updateNoteItem}
        on:onselected={onNoteItemSelected} />
    {/each}
  </div>
{:else}
  <h3>Hello there, howdy? Click + sign to create a new note for Today</h3>
{/if}

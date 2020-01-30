<script>
  import ToolBar from "./ToolBar.svelte";
  import NoteItem from "./NoteItem.svelte";
  import {
    activeItem,
    selectedDateStore,
    dateBarExpandedState
  } from "./store.js";

  import { beforeUpdate, afterUpdate, onMount } from "svelte";

  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let userId;

  Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  let activeNote = {};
  let today = new Date().toDateInputValue();
  let selectedDate;

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

  let notes = [];

  const addNewNoteItem = () => {
    db.collection("todos").add({
      uid: userId,
      header: "",
      text: "",
      created: Date.now(),
      dateString: new Date().toDateInputValue()
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
    activeNote = notes.filter(n => n.id === idToSelect);

    updateActiveItem(activeNote);
  };

  const updateNoteItem = e => {
    var updatedItem = e.detail;

    db.collection("todos")
      .doc(updatedItem.id)
      .update(updatedItem);
  };

  const addToFavorites = e => {
    if (activeNote && activeNote.length > 0) {
      let idToUpdate = activeNote[0].id;
      let isFavorite = !activeNote[0].isFavorite;

      db.collection("todos")
        .doc(idToUpdate)
        .update({ isFavorite: isFavorite });
    }
  };

  function updateActiveItem(active) {
    activeItem.update(val => {
      return (val = active);
    });
  }

  selectedDateStore.subscribe(val => {
    if (val) {
      selectedDate = val;
      console.log("Selected Date is ", val);
      //get notes for this date
      let query = db
        .collection("todos")
        .where("uid", "==", userId)
        .where("dateString", "==", val)
        .orderBy("created");

      var observable = collectionData(query, "id").pipe(startWith([]));

      observable.subscribe(val => {
        console.log(val);
        notes = val;
      });
    }
  });
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
    dateBarExpandedState.update(val => {
      return (val = false);
    });
  }} />

<ToolBar
  on:deleteNoteItem={deleteActiveNoteItem}
  on:addNewNoteItem={addNewNoteItem}
  on:addToFavorites={addToFavorites} />

{#if notes.length > 0}
  <div class="grid">
    {#each notes as note}
      <NoteItem
        {...note}
        on:onupdate={updateNoteItem}
        on:onselected={onNoteItemSelected} />
    {/each}
  </div>
{:else if selectedDate == today}
  <h3>Hello there, howdy? Click + sign to create a new note for Today</h3>
{:else}
  <h3>You do not have any notes for {selectedDate}</h3>
{/if}

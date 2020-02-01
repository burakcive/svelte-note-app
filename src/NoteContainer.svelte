<script>
  import ToolBar from "./ToolBar.svelte";
  import NoteItem from "./NoteItem.svelte";
  import {
    activeItem,
    selectedDateStore,
    dateBarExpandedState
  } from "./store.js";

  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  import { notesRepository } from "./data/noterepo";
  import { FirebaseResults } from "./data/firebaseresults";

  export let userId;

  Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  let activeNote = {};
  let today = new Date().toDateInputValue();
  let selectedDate;
  let notes = [];

  $: retrieveNotes(selectedDate);

  function parseQueryResult(docs) {
    var items = FirebaseResults.map(docs);
    notes = items;
    console.log("items:", items);
  }

  const retrieveNotes = selectedDate => {
    if(selectedDate === "all"){
      notesRepository
        .retrieveAll(userId)
        .onSnapshot(docs => parseQueryResult(docs));
    }
    else if (selectedDate) {
      notesRepository
        .retrieveByDate(selectedDate, userId)
        .onSnapshot(docs => parseQueryResult(docs));
    } 
  };

  afterUpdate(() => {
    if (document.querySelector(".grid")) {
      var grid = new Muuri(".grid", {
        dragEnabled: false,
        // layout: {
        //   fillGaps: true
        // }
      });
    }
    scrollDown();
  });

  const addNewNoteItem = () => {
    var newNoteItem = {
      uid: userId,
      header: "",
      text: "",
      created: Date.now(),
      dateString: new Date().toDateInputValue()
    };
    notesRepository.add(newNoteItem);
  };

  function scrollDown() {
    var noteContainerElem = document.getElementsByClassName(
      "note-container"
    )[0];
    noteContainerElem.scrollTo(0, noteContainerElem.scrollHeight);
  }

  const deleteActiveNoteItem = () => {
    if (activeNote && activeNote.length > 0) {
      notesRepository.remove(activeNote[0].id);
    }
  };

  const onNoteItemSelected = e => {
    let idToSelect = e.detail;
    activeNote = notes.filter(n => n.id === idToSelect);

    updateActiveItem(activeNote);
  };

  const updateNoteItem = e => {
    var updatedItem = e.detail;
    notesRepository.update(updatedItem.id, updatedItem);
  };

  const addToFavorites = e => {
    if (activeNote && activeNote.length > 0) {
      let idToUpdate = activeNote[0].id;
      let isFavorite = !activeNote[0].isFavorite;

      notesRepository.update(idToUpdate, { isFavorite: isFavorite });
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

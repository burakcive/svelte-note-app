<script>
  import { createEventDispatcher } from "svelte";
  import { activeItem } from "./store.js";

  let activated=false;
  activeItem.subscribe(val => {
    console.log("item activated", val);
    activated = val && val.length > 0;
  });

  const dispatch = createEventDispatcher();

  const addNewNoteItem = () => {
    dispatch("addNewNoteItem");
  };

  const deleteNoteItem = () => {
    dispatch("deleteNoteItem");
  };

  const userClicked = () => {
    dispatch("userClicked");
  };
</script>

<style>
  .side-bar {
    padding-top: 40px;
    position: absolute;
    width: 2em;
    height: 100%;
    border: 1px solid #343a40;
    background-color: #501f1fed;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(36, 1.3em);
  }

  .side-bar-right {
    right: 0px;
  }

  .fa {
    padding-left: 8px;
    cursor: pointer;
  }
  .fa:hover {
    font-size: 20px;
    padding-left: 7px;
  }

  .disabled {
    pointer-events: none;
    color: gray;
  }

  .disabled:hover {
    font-size: 16px !important;
    padding-left: 8px;
  }
</style>

<div class="side-bar side-bar-right">

  <i on:click={userClicked}  class="fa fa-user" />
  <i class="fa fa-cog" />
  <i on:click={addNewNoteItem} class="fa fa-plus" />
  <i class:disabled="{activated !== true}" on:click={deleteNoteItem} class="fa fa-trash-o" />
</div>

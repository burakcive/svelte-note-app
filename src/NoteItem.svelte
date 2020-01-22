<script>
  import { fade, fly } from "svelte/transition";

  import { createEventDispatcher } from "svelte";

  import { activeItem } from "./store.js";

  const dispatch = createEventDispatcher();

  export let header;
  export let text;
  export let id;

  let activated = false;
  activeItem.subscribe(val => {
    console.log("item activated", val);
    activated = val && val.length > 0 && val[0].id === id;
  });

  const removeNote = () => {
    dispatch("removenote", id);
  };

  const onSelected = e => {
    e.stopPropagation();
    dispatch("onselected", id);
  };

  const onChange = e => {
    var updatedItem = { header: header, text: text, id: id };
    dispatch("onupdate", updatedItem);
  };
</script>

<style>
  .activated {
    border: 2px solid rgba(215, 150, 150, 0.77) !important;
  }

  .note-item {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-template-rows: 1fr 20fr;

    grid-template-areas:
      "header header"
      "textarea textarea";

    border: 2px solid #b4aaaa7d;
  }
  textarea {
     background-color: rgba(255, 253, 250, 0.884);
    font: normal 14px verdana;
    line-height: 26px;
    padding: 16px 15px;
    border: 0;
    border-style: none;
    border-color: transparent;
    outline: none;
    outline-offset: 0;
    box-shadow: none;
    resize: none;
    grid-area: textarea;
    background-size: auto auto;
    /* background-color: rgba(255, 255, 255, 1); */
    background-image: repeating-linear-gradient(0deg, transparent, transparent 25px, rgba(184, 184, 184, 1) 25px, rgba(184, 184, 184, 1) 26px );

    grid-area: textarea;
  }

 
  .input-title {
    background: transparent;
    border: 0;
    border-style: none;
    border-color: transparent;
    outline: none;
    outline-offset: 0;
    box-shadow: none;
    text-align: center;
    font-size: 1em;
    color: #617373;
    background-color: rgba(255, 253, 250, 0.884);
    text-align: center;

    grid-area: header;
  }

  /* .note-toolbar {
    grid-area: toolbar;
    background-color: rgb(113, 113, 113);
  }

  .note-toolbar > .fa {
    cursor: pointer;
    padding-left: 3px;
    padding-top: 7px;
  }

  .fa:hover {
    color: rgb(235, 229, 196);
  } */
</style>

<div
  class:activated
  on:click={onSelected}
  in:fly={{ x: -500, duration: 500 }}
  class="note-item">
  <input
    on:change={onChange}
    bind:value={header}
    class="input-title"
    type="text"
    name="input-title"
    placeholder="/Type your title/"
    onfocus="this.placeholder = ''"
    onblur="this.placeholder = '/Type your title/'" />
  <textarea on:change={onChange} bind:value={text} />
  <!-- <footer class="note-toolbar">
    <i class="fa fa-arrow-left" />
    <i class="fa fa-arrow-right" />
    <i on:click={removeNote} class="fa fa-trash-o" />
  </footer> -->
</div>

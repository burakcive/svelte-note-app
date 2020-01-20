<script>
  import { fade, fly } from "svelte/transition";
  
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let header;
  export let text;
  export let id;

  const removeNote = () => {
    dispatch("removenote", id);
  }

  console.log("Generated", id);
</script>

<style>
  .note-item {
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-template-rows: 1fr 20fr;

    grid-template-areas:
      "header toolbar"
      "textarea textarea";
  }
  textarea {
    background-color: rgb(235, 229, 196);
    font: normal 14px verdana;
    line-height: 25px;
    padding: 2px 10px;
    border: 0;
    border-style: none;
    border-color: transparent;
    outline: none;
    outline-offset: 0;
    box-shadow: none;
    resize: none;

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
    background-color: rgb(241, 238, 234);
    text-align: center;

    grid-area: header;
  }

  .note-toolbar {
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
  }
</style>
<!-- 
<div in:fly={{ x: -500, duration: 500 }} 
      out:fade={{ duration: 500 }} -->



<div in:fly={{ x: -500, duration: 500 }} 
      out:fade={{ duration: 500 }}
class="note-item">
  <input
    bind:value={header}
    class="input-title"
    type="text"
    name="input-title"
    id="input-title"
    placeholder="/Type your title/"
    onfocus="this.placeholder = ''"
    onblur="this.placeholder = '/Type your title/'" />
  <textarea bind:value={text} />
  <footer class="note-toolbar">
    <i class="fa fa-arrow-left" />
    <i class="fa fa-arrow-right" />
    <i on:click={removeNote} class="fa fa-trash-o" />
  </footer>
</div>

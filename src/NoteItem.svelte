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
    margin: 1em;
    border: 2px solid #b4aaaa7d;
    height: max-content;
    min-width: 27em;
    /* max-width: 30em; */
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
    width: 100%;
    height: 30em;
   
    background-size: auto auto;

    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 25px,
      rgba(184, 184, 184, 1) 25px,
      rgba(184, 184, 184, 1) 26px
    );

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
    width: 100%;
  }
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
</div>

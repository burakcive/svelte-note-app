<script>
  import { createEventDispatcher } from "svelte";

  import { onMount, onDestroy } from "svelte";

  import { activeItem } from "./store.js";

  const dispatch = createEventDispatcher();

  export let header;
  export let text;
  export let id;
  export let isFavorite;
  export let index;

  let textAreaElement;
  let richTextControl;
  onMount(() => {
    console.log(header, text);
    // richTextControl = new nicEditor({
    //   buttonList: [
    //     "save",
    //     "bold",
    //     "italic",
    //     "underline",
    //     // "left",
    //     // "center",
    //     // "right",
    //     // "justify",
    //     "ol",
    //     "ul",
    //     "image",
    //     "forecolor",
    //     "bgcolor"
    //   ]
    // }).panelInstance(id, { hasPanel: true });
    // textAreaElement.previousSibling.addEventListener("focusout", function() {
    //   let content = new nicEditors.findEditor(id).getContent();
    //   var updatedItem = {
    //     header: header,
    //     text: content,
    //     id: id,
    //     isFavorite: isFavorite === true
    //   };

    //   console.log(header + " will be updated.");
    //   dispatch("onupdate", updatedItem);
    // });
  });

  onDestroy(() => {
    console.log("destroyed ", id);
    // richTextControl.removeInstance(id);
    // richTextControl = null;
  });

  let activated = false;
  activeItem.subscribe(val => {
    activated = val && val.length > 0 && val[0].id === id;
  });

  const removeNote = () => {
    dispatch("removenote", id);
  };

  const onSelected = e => {
    e.stopPropagation();
    dispatch("onselected", id);
  };
</script>

<style>
  * {
    font-family: "Yanone Kaffeesatz", sans-serif;
  }
  .activated {
    border: 2px solid rgba(215, 150, 150, 0.77) !important;
  }

  .note-item {
    margin: 1em;
    border: 2px solid #b4aaaa7d;
    height: max-content;
    max-width: 25em;
  }

  .favorite {
    background-color: rgba(226, 162, 162, 0.884) !important;
  }

  textarea {
    width: 100%;
    min-height: 10em;
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

<div class="note-item" class:activated on:click={onSelected}>
  <input
    class:favorite={isFavorite === true}
    bind:value={header}
    class="input-title"
    type="text"
    name="input-title"
    placeholder="/Type your title/"
    onfocus="this.placeholder = ''"
    onblur="this.placeholder = '/Type your title/'" />

  <textarea {id} bind:this={textAreaElement} bind:value={text} />
</div>

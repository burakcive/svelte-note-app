<script>
  import { fade, fly } from "svelte/transition";

  import { createEventDispatcher } from "svelte";

  import { onMount } from "svelte";

  import { activeItem } from "./store.js";

  const dispatch = createEventDispatcher();

  export let header;
  export let text;
  export let id;
  // export let dateString;
  let textAreaElement;
  onMount(() => {
    // autosize(textAreaElement);
    var richTextControl = new nicEditor({
      buttonList: [
        "save",
        "bold",
        "italic",
        "underline",
        "left",
        "center",
        "right",
        "justify",
        "ol",
        "ul"
      ]
    }).panelInstance(id);
    textAreaElement.previousSibling.addEventListener("focusout", function() {
      let content = new nicEditors.findEditor(id).getContent();
      console.log(content);
      var updatedItem = { header: header, text: content, id: id };
      dispatch("onupdate", updatedItem);
    });

    // richTextControl.addEvent("blur", function() {
    //   let content = new nicEditors.findEditor(id).getContent();
    //   console.log(content);
    //   var updatedItem = { header: header, text: content, id: id };
    //   dispatch("onupdate", updatedItem);
    // });
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

  const onChange = e => {};
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
    min-width: 27em;
    /* max-width: 30em; */
  }

  textarea {
    width: 100%;
    min-height: 10em;

    /* 
     background-color: rgba(255, 253, 250, 0.884);
    font-size: 1em;
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
    min-height: 10em;

    background-size: auto auto;

    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 25px,
      rgba(184, 184, 184, 1) 25px,
      rgba(184, 184, 184, 1) 26px
    );  */
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

<div class:activated on:click={onSelected} class="item note-item">

  <div class="item-content">
    <input
      on:change={onChange}
      bind:value={header}
      class="input-title"
      type="text"
      name="input-title"
      placeholder="/Type your title/"
      onfocus="this.placeholder = ''"
      onblur="this.placeholder = '/Type your title/'" />

    <textarea
      {id}
      bind:this={textAreaElement}
      on:change={onChange}
      bind:value={text} />
  </div>

</div>

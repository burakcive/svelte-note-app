<script>
  import { fade, fly } from "svelte/transition";

  export let header;
  export let text;
</script>

<style>
  textarea {
    background-color: rgb(235, 229, 196);
    width: 100%;
    height: 90%;
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
    height: 5%;
    width: 100%;
  }
  
</style>

<div in:fly={{ x: -500, duration: 500 }} class="note-item">
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

</div>

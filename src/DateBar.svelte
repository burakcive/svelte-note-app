<script>
  import { createEventDispatcher } from "svelte";

  let date = new Date();
  date.setDate(date.getDate() + 2);

  let expanded = false;

  const dispatch = createEventDispatcher();

  const addNewNoteItem = () => {
    dispatch("addNewNoteItem");
  };

  const onExpand = () => {
    expanded = !expanded;
  };
</script>

<style>
  .side-bar {
    padding-top: 40px;
    position: absolute;
    width: 14em;
    height: 100%;
    border: 1px solid rgb(89, 89, 89);
    background-color: rgb(89, 89, 89);
    z-index: 10;

    transition: left 1s;

    display: grid;

    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;

     padding: 2em;
  }

  .side-bar-left {
    left: -210px;
  }

  .expanded {
    left: 0px;
  }

</style>

<div
  class:expanded={expanded === true}
  on:click={onExpand}
  class="side-bar side-bar-left">

 
</div>

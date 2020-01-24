<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const userClicked = () => {
    dispatch("userClicked");
  };

  export let authenticated = false;
</script>

<style>
  .side-bar {
    padding-top: 40px;
    position: absolute;
    width: 2em;
    height: 20%;
    background-color: rgb(186, 97, 97);
    z-index: 100;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(36, 1.3em);
  }

  .cover-full-page {
    height: 100%;
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

<div
  class:cover-full-page={authenticated !== true}
  class="side-bar side-bar-right">

  <!-- Subscribe to a user store -->
  <i on:click={userClicked} class="fa fa-user" />
  <i class="fa fa-cog" />

</div>

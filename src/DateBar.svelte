<script>
  import { createEventDispatcher } from "svelte";
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  import { selectedDateStore } from "./store.js";

  let expanded = false;
  let datepicker;
  let selectedDate;

  const dispatch = createEventDispatcher();

  const onExpand = () => {
    expanded = !expanded;
  };


  Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  onMount(() => {
    selectedDate = new Date().toDateInputValue();
    // calendar.value = selectedDate;

    let jDatePicker = jQuery(datepicker);

    jDatePicker.datepicker({
      inline: true,
      dateFormat: "yy-mm-dd",
      onSelect: function(dateText) {
        selectedDate = dateText;
        console.log(
          "Selected date: " +
            dateText +
            "; input's current value: " +
            this.value
        );
      }
    });
  });

  $: if (selectedDate) {
    selectedDateStore.update(val => {
      return (val = selectedDate);
    });
  }
</script>

<style>
  .side-bar {
    padding-top: 40px;
    position: absolute;
    width: 20em;
    height: 100%;
    border: 1px solid rgb(89, 89, 89);
    background-color: rgb(89, 89, 89);
    z-index: 10;

    transition: left 1s;

    display: flex;
    flex-direction: column;
    /* padding: 2em; */
  }

  .side-bar-left {
    left: -19em;
  }

  .expanded {
    left: 0px;
  }

  #date-container
  {
    padding-left: 1em
  }
</style>

<div
  class:expanded={expanded === true}
  on:click={onExpand}
  class="side-bar side-bar-left">

  <div id="date-container">
    <!-- <input
      bind:value={selectedDate}
      bind:this={calendar}
      on:click={onDateClick}
      id="calendar"
      type="date" /> -->

    <div  bind:this={datepicker} id="datepicker" />

  </div>

</div>

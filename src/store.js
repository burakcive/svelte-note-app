import { writable } from "svelte/store";

export const activeItem = writable(null);

export const selectedDateStore = writable(null);

export const dateBarExpandedState = writable(false);
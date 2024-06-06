import { configureStore, createReducer } from "@reduxjs/toolkit";
import { toggleModal } from "./Actions";

export interface ModalState {
  openModal: string;
}

const initState: ModalState = {
  openModal: "",
};

const modalReducer = createReducer(initState, (builder) => {
  builder.addCase(toggleModal, (state, action) => {
    state.openModal = state.openModal === action.payload ? "" : action.payload;
    console.log(state.openModal);
  });
});

export const modalStore = configureStore({
  reducer: modalReducer,
});

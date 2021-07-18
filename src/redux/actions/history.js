import { CREATE_RECORD, DELETE_RECORD, DELETE_HISTORY } from "./types";

export const createRecord = ({ record }) => ({
  type: CREATE_RECORD,
  payload: record,
});

export const deleteRecord = ({ id }) => ({
  type: DELETE_RECORD,
  payload: { id },
});

export const deleteHistory = () => ({ type: DELETE_HISTORY });

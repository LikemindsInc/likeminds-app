import { IConnectionReceivedDTO, IThunkAPIStatus, IUserData } from "@app-model";
import { createSlice } from "@reduxjs/toolkit";

import {
  acceptConnectionRequestAction,
  getConnections,
  getRequestConnectionStatus,
  getSingleUserAction,
  getUsers,
  requestConnection,
} from "../actions/connection";

export interface IConnectionState {
  getUsersStatus: IThunkAPIStatus;
  getUsersSuccess: string;
  getUsersError: string;

  requestConnectionStatus: IThunkAPIStatus;
  requestConnectionSuccess: string;
  requestConnectionError: string;

  getSingleUserStatus: IThunkAPIStatus;
  getSingleUserSuccess: string;
  getSingleUserError: string;

  getConnectionReceivedStatus: IThunkAPIStatus;
  getConnectionReceivedSuccess: string;
  getConnectionReceivedError: string;

  connectionRespondStatus: IThunkAPIStatus;
  connectionRespondSuccess: string;
  connectionRespondError: string;

  getConnectionStatus: IThunkAPIStatus;
  getConnectionSuccess: string;
  getConnectionError: string;

  users: IUserData[];
  profileId: string;
  profile: IUserData | null;

  connectionStatus: string | null;

  connectionRequests: IConnectionReceivedDTO[];
}

const initialState: IConnectionState = {
  getUsersStatus: "idle",
  getUsersSuccess: "",
  getUsersError: "",
  users: [],
  profileId: "",
  profile: null,

  requestConnectionStatus: "idle",
  requestConnectionSuccess: "",
  requestConnectionError: "",

  getSingleUserStatus: "idle",
  getSingleUserSuccess: "",
  getSingleUserError: "",

  getConnectionReceivedStatus: "idle",
  getConnectionReceivedSuccess: "",
  getConnectionReceivedError: "",

  connectionRespondStatus: "idle",
  connectionRespondSuccess: "",
  connectionRespondError: "",

  getConnectionStatus: "idle",
  getConnectionSuccess: "",
  getConnectionError: "",

  connectionStatus: null,

  connectionRequests: [],
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    clearSearchedUsers(state: IConnectionState) {
      state.users = [];
    },
    getProfile(state: IConnectionState, action) {
      state.profileId = action.payload;
    },

    clearRequestConnection(state: IConnectionState) {
      state.requestConnectionStatus = "idle";
      state.requestConnectionError = "";
      state.requestConnectionSuccess = "";
    },

    clearConnectionStatus(state: IConnectionState) {
      state.connectionStatus = "";
    },

    clearConnectionsReceived(state: IConnectionState) {
      state.connectionRequests = [];
    },

    clearConnectionRespondStatus(state: IConnectionState) {
      state.connectionRespondStatus = "idle";
      state.connectionRespondError = "";
      state.connectionRespondSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.getUsersStatus = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.getUsersStatus = "completed";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.getUsersStatus = "failed";
      state.getUsersError = action.payload?.message as string;
    });

    builder.addCase(requestConnection.pending, (state) => {
      state.requestConnectionStatus = "loading";
    });
    builder.addCase(requestConnection.fulfilled, (state, action) => {
      state.requestConnectionStatus = "completed";
    });
    builder.addCase(requestConnection.rejected, (state, action) => {
      state.requestConnectionStatus = "failed";
      state.requestConnectionError = action.payload?.message as string;
    });

    builder.addCase(getRequestConnectionStatus.pending, (state) => {
      state.getConnectionStatus = "loading";
    });
    builder.addCase(getRequestConnectionStatus.fulfilled, (state, action) => {
      state.getConnectionStatus = "completed";
      state.connectionStatus = action.payload.data.status;
    });
    builder.addCase(getRequestConnectionStatus.rejected, (state, action) => {
      state.getConnectionStatus = "failed";
      state.getConnectionError = action.payload?.message as string;
      state.connectionStatus = null;
    });

    builder.addCase(getConnections.pending, (state) => {
      state.getConnectionReceivedStatus = "loading";
    });
    builder.addCase(getConnections.fulfilled, (state, action) => {
      state.getConnectionReceivedStatus = "completed";
      state.connectionRequests = action.payload.data;
    });
    builder.addCase(getConnections.rejected, (state, action) => {
      state.getConnectionReceivedStatus = "failed";
      state.getConnectionReceivedError = action.payload?.message as string;
      state.connectionRequests = [];
    });

    builder.addCase(getSingleUserAction.pending, (state) => {
      state.getSingleUserStatus = "loading";
    });
    builder.addCase(getSingleUserAction.fulfilled, (state, action) => {
      state.getSingleUserStatus = "completed";
      state.profile = action.payload.data;
    });
    builder.addCase(getSingleUserAction.rejected, (state, action) => {
      state.getSingleUserStatus = "failed";
      state.getSingleUserError = action.payload?.message as string;
      state.profile = null;
    });

    builder.addCase(acceptConnectionRequestAction.pending, (state) => {
      state.connectionRespondStatus = "loading";
    });
    builder.addCase(
      acceptConnectionRequestAction.fulfilled,
      (state, action) => {
        state.connectionRespondStatus = "completed";
      }
    );
    builder.addCase(acceptConnectionRequestAction.rejected, (state, action) => {
      state.connectionRespondStatus = "failed";
      state.connectionRespondError = action.payload?.message as string;
    });
  },
});

export const {
  clearSearchedUsers,
  getProfile,
  clearRequestConnection,
  clearConnectionStatus,
  clearConnectionRespondStatus,
  clearConnectionsReceived,
} = connectionSlice.actions;

export default connectionSlice.reducer;

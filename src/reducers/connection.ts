import { IConnectionReceivedDTO, IThunkAPIStatus, IUserData } from "@app-model";
import { createSlice } from "@reduxjs/toolkit";

import {
  acceptConnectionRequestAction,
  getConnections,
  getRequestConnectionStatus,
  getSingleUserAction,
  getUserRecommendationByIndustry,
  getUserRecommendationBySchool,
  getUsers,
  getUsersBySuggestion,
  requestConnection,
} from "../actions/connection";
import { PURGE } from "redux-persist";

export interface IConnectionState {
  getUsersStatus: IThunkAPIStatus;
  getUsersSuccess: string;
  getUsersError: string;

  getUsersByIndustryStatus: IThunkAPIStatus;
  getUsersByIndustrySuccess: string;
  getUsersByIndustryError: string;

  getUserSuggestedStatus: IThunkAPIStatus;
  getUserSuggestedSuccess: string;
  getUserSuggestedError: string;

  getUsersBySchoolStatus: IThunkAPIStatus;
  getUsersBySchoolSuccess: string;
  getUsersBySchoolError: string;

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
  usersBySchool: IUserData[];
  usersByIndustry: IUserData[];

  usersBySuggestions: IUserData[];

  profileId: string;
  profile: IUserData | null;

  connectionStatus: string | null;

  connectionRequests: IConnectionReceivedDTO[];
}

const initialState: IConnectionState = {
  getUsersStatus: "idle",
  getUsersSuccess: "",
  getUsersError: "",

  getUsersBySchoolStatus: "idle",
  getUsersBySchoolSuccess: "",
  getUsersBySchoolError: "",

  getUsersByIndustryStatus: "idle",
  getUsersByIndustrySuccess: "",
  getUsersByIndustryError: "",

  getUserSuggestedStatus: "idle",
  getUserSuggestedSuccess: "",
  getUserSuggestedError: "",

  users: [],
  usersByIndustry: [],
  usersBySchool: [],
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
  usersBySuggestions: [],
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
    builder.addCase(PURGE, (state) => {
      return state;
    });
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

    builder.addCase(getUserRecommendationByIndustry.pending, (state) => {
      state.getUsersByIndustryStatus = "loading";
    });
    builder.addCase(
      getUserRecommendationByIndustry.fulfilled,
      (state, action) => {
        state.usersByIndustry = action.payload.data;
        state.getUsersByIndustryStatus = "completed";
      }
    );
    builder.addCase(
      getUserRecommendationByIndustry.rejected,
      (state, action) => {
        state.getUsersByIndustryStatus = "failed";
        state.getUsersByIndustryError = action.payload?.message as string;
      }
    );

    builder.addCase(getUserRecommendationBySchool.pending, (state) => {
      state.getUsersBySchoolStatus = "loading";
    });
    builder.addCase(
      getUserRecommendationBySchool.fulfilled,
      (state, action) => {
        state.usersBySchool = action.payload.data;
        state.getUsersBySchoolStatus = "completed";
      }
    );
    builder.addCase(getUserRecommendationBySchool.rejected, (state, action) => {
      state.getUsersBySchoolStatus = "failed";
      state.getUsersBySchoolError = action.payload?.message as string;
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

    builder.addCase(getUsersBySuggestion.pending, (state) => {
      state.getUserSuggestedStatus = "loading";
    });
    builder.addCase(getUsersBySuggestion.fulfilled, (state, action) => {
      state.getUserSuggestedStatus = "completed";
      state.usersBySuggestions = action.payload.data;
    });
    builder.addCase(getUsersBySuggestion.rejected, (state, action) => {
      state.getUserSuggestedStatus = "failed";
      state.getUserSuggestedError = action.payload?.message as string;
      state.usersBySuggestions = [];
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

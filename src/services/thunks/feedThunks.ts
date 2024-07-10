import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const loadFeed = createAsyncThunk('feed/load', async () =>
  getFeedsApi()
);

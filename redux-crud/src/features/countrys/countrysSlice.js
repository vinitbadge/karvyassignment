import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCountrys = createAsyncThunk("countrys/fetchCountrys", async () => {
  const response = await fetch("http://localhost:8080/api/countries");
  const countrys = await response.json();
  return countrys;
});

export const fetchCountrysById = createAsyncThunk("countrys/fetchCountrysById", async (id) => {
  const response = await fetch("http://localhost:8080/api/country/" + id);
  const countrysById = await response.json();
  return countrysById;
});





const countrysSlice = createSlice({
  name: "countrys",
  initialState: {
    entities: [],
    loading: false,
    entitiesById: [],
    entitiesContinent: [],
    errors: {}
  },
  reducers: {
    countryAdded(state, action) {

    }
  },
  extraReducers: {
    [fetchCountrys.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCountrys.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...action.payload.data];
      state.entitiesContinent = [/* ...state.entitiesById, */ ...action.payload.continent];
    },
    [fetchCountrysById.fulfilled]: (state, action) => {
      state.entitiesById = [/* ...state.entitiesById, */ ...action.payload.data];
    },
    [fetchCountrys.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { countryAdded } = countrysSlice.actions;

export default countrysSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
    isDarkMode: boolean;
};

const initialState: ThemeState = {
    isDarkMode: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

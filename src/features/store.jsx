import { configureStore  } from '@reduxjs/toolkit'
import { authSlice, userSlice } from './Slices';
const store = configureStore ({
    reducer: {
        auth: authSlice.reducer,
        lUser: userSlice.reducer,
    },
})
export default store;
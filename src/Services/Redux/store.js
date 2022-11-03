import {configureStore} from '@reduxjs/toolkit';
import searchSlice from '../../Layouts/Headers/searchSlice';
import playerSlice from '../../Components/Player/playerSlice';

const rootReducer = {
    reducer: {
        search: searchSlice,
        player: playerSlice
    }
}

const store = configureStore(rootReducer);

export default store;
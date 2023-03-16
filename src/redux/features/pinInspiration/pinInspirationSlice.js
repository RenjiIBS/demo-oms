import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inspirationList:[],
  error: null
 
}

const pinInspirationSlice = createSlice({
  name: 'pinInspiration',
  initialState,
  reducers: {
    addInspiration: (state,action) => {
      if (state.inspirationList.length >= 3) {
        alert("You cannot add more than 3 Inspirations")
        return;
      }

        if(!state.inspirationList.some(item => item.location === action.payload.location && item.date === action.payload.date)){
        let newInspiration = {
            id:  state.inspirationList.length + 1,
            location: action.payload.location,
            date:  action.payload.date,
            selected: false
          }
          state.inspirationList.push( newInspiration);
          state.error = ""
        }else {
            state.error = "Error: Item already present."
        }
      },

      selectInspiration: (state, action) => {
        state.inspirationList = state.inspirationList.map(item=> {
          if (item.id === action.payload.id) {
            return {
              ...item,
              selected: true
            }
          }
          return {
            ...item
          }
        }) 

      },
      unSelectInspiration: (state, action) => {
        state.inspirationList = state.inspirationList.map(item=> {
          if (item.id === action.payload.id) {
            return {
              ...item,
              selected: false
            }
          }
          return {
            ...item
          }
        }) 
      },

     deleteInspiration: (state, action) => {
        let { inspirationList } = state;
        console.log(state,"=========Delete action" ,action)
        state.inspirationList = inspirationList.filter((item) => 
            item.id !==action.payload.id);
      },

      editInspiration: (state, action) => {
        let { inspirationList } = state;
        state.inspirationList = inspirationList.map((item) => 
          item.id === action.payload.id ? action.payload : item);
      }
  },

})

export const { addInspiration, deleteInspiration, editInspiration,selectInspiration, unSelectInspiration } = pinInspirationSlice.actions
export default pinInspirationSlice.reducer;
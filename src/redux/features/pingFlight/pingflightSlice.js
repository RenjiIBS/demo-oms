import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flightList:[],
  error: null
 
}

const pingflightSlice = createSlice({
  name: 'pingFlight',
  initialState,
  reducers: {
    addFlight: (state,action) => {
      if (state.flightList.length >= 3) {
        alert("You cannot add more than 3 flights")
        return;
      }

        if(!state.flightList.some(item => item.flightNo === action.payload.flightNo && item.date === action.payload.date && item.time === action.payload.time) ){
        let newFlight = {
            id:  state.flightList.length + 1,
            flightNo: action.payload.flightNo,
            time:  action.payload.time,
            date:  action.payload.date,
            source:  action.payload.source,
            destination:  action.payload.destination,
            terminal:  action.payload.terminal,
            gate:  action.payload.gate
          }
          state.flightList.push( newFlight);
          state.error = ""
        }else {
            state.error = "Error: Item already present."
        }
      },

      selectPinFlights: (state, action) => {
        state.flightList = state.flightList.map(item=> {
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
      unSelectPinFlights: (state, action) => {
        state.flightList = state.flightList.map(item=> {
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

     deleteFlight: (state, action) => {
        let { flightList } = state;
        console.log(state,"=========Delete action" ,action)
        state.flightList = flightList.filter((item) => 
            item.id !==action.payload.id);
      },

      editFlight: (state, action) => {
        let { flightList } = state;
        state.flightList = flightList.map((item) => 
          item.id === action.payload.id ? action.payload : item);
      }
  },

})

export const { addFlight, deleteFlight, editFlight, selectPinFlights, unSelectPinFlights } = pingflightSlice.actions
export default pingflightSlice.reducer;

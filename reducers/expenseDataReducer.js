const initialState = [];
// export doubt
const expenseData = (state = initialState, actions) => {
    console.log(state)
    switch (actions.type) {
        case "ADDEXPENSE": {
            // const id = new Date().toString();
            return [
                actions.payload, //to add new data at top
                ...state,
            ]
        }
        case "SET":{
            const inverted = actions.payload.reverse(); //because of default firebase sorting 
            return inverted
        }
        case "REMEXPENSE": {
            const remId = actions.payload;
            console.log("remId", remId);
            state = state.filter((data) => {
                return data.id != remId;
            })
            console.log("deleted state", state)
            return state;
        }
        case "UPDATEEXPENSE": {
            const updateId = actions.payload.id;
            const expensesData = actions.payload.data;
            let updateIndex=-1;
            for(let i=0;i<state.length;i++){
                if(updateId===state[i].id)
                {
                    updateIndex = i;
                    break;
                }
            }
            // console.log(state[updateIndex],updateIndex,updateId);
            state[updateIndex] = {...state[updateIndex],...expensesData};
            const newState = [...state];
            return newState;
        }

        default: return state;
    }

}

export default expenseData;
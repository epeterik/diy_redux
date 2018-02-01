import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let initialState = {
    counter: 0
    };

const reducer = (state=initialState, action) => {

    console.log("In reducer");

    switch(action.type){
        case 'INC':
            return {
                counter: state.counter + 1
            }
        case 'DEC':
            return {
                counter: state.counter - 1
            }
        default:
            return state
            }
    } //end reducer
    
const renderCounterResults = (inState) => {
    document.getElementById('counter').innerText = inState.counter;
    }

function storeCreator(reducer) {
    let state = reducer(undefined, {type: 'stuff'});
    const listeners = [];

    function receiveAction(action) {
    state = reducer(state, action);
    listeners.forEach( listener => {
    listener(state);
    })
    }

    function subscribe(listener) {
    listener(state);
    listeners.push(listener);
    }
    
    return {
    receiveAction: receiveAction,
    subscribe: subscribe
    }
}


const store = storeCreator(reducer);
store.subscribe(renderCounterResults);


document.getElementById('inc').onclick = () => store.receiveAction({ type: 'INC' });
document.getElementById('dec').onclick = () => store.receiveAction({ type: 'DEC' });


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

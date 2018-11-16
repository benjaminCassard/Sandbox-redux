import { createStore } from "redux";

console.clear();

const initialState = { monChamp1: "rien", cpt: 0 };

const increment = {
  type: "INCREMENT_CPT"
};

const decrement = {
  type: "DECREMENT_CPT"
};

const change = newVal => {
  return { type: "CHANGE", newVal };
};

const reducerSaisieUtilisateur = (oldState = initialState, action) => {
  switch (action.type) {
    case "SAISIE_UTILISATEUR": {
      let newState = Object.assign({}, oldState, {
        monChamp1: action.monChamp1
      });
      return newState;
    }
    case "INCREMENT_CPT": {
      let newState = Object.assign({}, oldState, {
        cpt: oldState.cpt + 1
      });
      return newState;
      // return {...oldstate, { cpt: action.newVal}}
    }
    case "DECREMENT_CPT": {
      let newState = Object.assign({}, oldState, {
        cpt: oldState.cpt - 1
      });
      return newState;
      // return { ...oldState, { cpt: oldState.cpt - 1}}
    }
    case "CHANGE": {
      let newState = Object.assign({}, oldState, {
        cpt: oldState.cpt + action.newVal
      });
      return newState;
    }
    default: {
      return oldState;
    }
  }
};

window.plus = () => {
  myStore.dispatch(increment);
};

window.moins = () => {
  myStore.dispatch(decrement);
};

window.inc = () => {
  myStore.dispatch(change(1));
};
window.dec = () => {
  myStore.dispatch(change(-1));
};

const render = () => {
  const cpt = myStore.getState().cpt;
  let vue = `compteur : <input type="text" size="3" value=${cpt} />
  <button onClick="plus()">+</button>
  <button onClick="moins()">-</button>
  <button onClick="inc()">?+?</button>
  <button onClick="dec()">?-?</button>`;

  const functions = ``;

  document.getElementById("root").innerHTML =
    "monChamp1 : " + myStore.getState().monChamp1;
  document.getElementById("root").innerHTML = vue;
};

const myStore = createStore(reducerSaisieUtilisateur);
myStore.subscribe(render);

setTimeout(() => {
  myStore.dispatch({ type: "@@INIT" });
}, 1000);

setTimeout(() => {
  myStore.dispatch({
    type: "SAISIE_UTILISATEUR",
    monChamp1: "valeur champ 1"
  });
}, 3000);

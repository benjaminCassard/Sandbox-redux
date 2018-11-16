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
      return { ...oldState, cpt: oldState.cpt + 1 };
    }
    case "DECREMENT_CPT": {
      return { ...oldState, cpt: oldState.cpt - 1 };
    }
    case "CHANGE": {
      return { ...oldState, cpt: oldState.cpt + action.newVal };
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
  let vue = `compteur : <input type="text" size="3" value=${
    myStore.getState().cpt
  } />
  <button onClick="plus()">+</button>
  <button onClick="moins()">-</button>
  <button onClick="inc()">?+?</button>
  <button onClick="dec()">?-?</button>`;

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

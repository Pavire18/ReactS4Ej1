import React from "react";

const initialValue = {
  products: [{
    id: 0,
    title: "Chocolate",
    price: 4,
  }],
  lastProductCreated: 0,

};

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "CREATE PRODUCT":
      const newProduct = {
        id: state.lastProductCreated + 1,
        title: action.payload.title,
        price: action.payload.price,
      };
      newState.products = [...newState.products, newProduct];
      newState.lastProductCreated = newProduct.id;

      break;

    case "DELETE PRODUCT":
        newState.products.map((product) => {
        if (product.id === action.payload.id) {
            newState.products.splice(newState.products.indexOf(product),1);
        }
      });
      break;

    default:
      console.error("ACTION TYPE NOT SUPPORTED");
  }

  return newState;
};


const CustomCart = () => {

  const [state, dispatch] = React.useReducer(reducer, initialValue);

  const inputReference = React.useRef(null);
  const inputPriceReference=React.useRef(null);

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    const payloadToSend = {
      title: inputReference.current.value,
      price: inputPriceReference.current.value,
    };
    dispatch({ type: "CREATE PRODUCT", payload: payloadToSend });

    inputReference.current.value = "";
  }, []);

  const deleteProduct = React.useCallback((productId) => {
    const payloadToSend = {
      id: productId,
    };

    dispatch({ type: "DELETE PRODUCT", payload: payloadToSend });
  }, []);

  return (
    <div className="todo-list">

      <form onSubmit={onSubmit}>
        <input ref={inputReference} type="text" />
        <input ref={inputPriceReference} type="number" />
        <button type="submit">Crear tarea</button>
      </form>

      <h4>Tareas:</h4>

      <ul>
        {state.products.map((product) =>
          <li key={product.id} onClick={() => deleteProduct(product.id)}>
            {product.title} / Precio: {product.price}
          </li>
        )}
      </ul>

    </div>
  );
}

export default CustomCart;
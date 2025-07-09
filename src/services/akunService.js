import api from "./api";

const getCart = () => api.get("/cart/");
const deleteCartItem = (id) => api.delete(`/cart/${id}`);
const checkout = () => api.post("/transaction/checkout");

export { getCart, deleteCartItem, checkout };




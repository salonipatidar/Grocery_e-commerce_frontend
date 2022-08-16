import classes from "./App.module.css";
import { Loading } from "./components/Loading";
import Nav from "./components/Nav";
import Category from "./pages/Category";
import Home from "./pages/Home";
import { useHttpClient } from "./hooks/http-hook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderStatus from "./pages/OrderStatus";
import ItemDetail from "./pages/ItemDetail";

const stripePromise = loadStripe(
  "pk_test_51LGlgSSB5olwzdqLZtYp0a3UxoKB4N6IuAgGpILEq5ocTscdyOGlHhUpMIWQwYyvlRiRrJdyImyOZZLcZivhLSyM00R15wso2E"
);

function App() {
  const [orderStatus, setStatus] = useState(0);
  useEffect(() => {
    let query = window.location.search;
    query = query.replace("?", "").split("=");
    if (query[0] === "placed" && query[1] === "true") {
      setStatus(true);
      window.history.replaceState({}, "", "/");
    } else if (query[0] === "placed" && query[1] === "false") {
      setStatus(false);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const {
    currentPage: page,
    cartOpen,
    wishlistOpen,
  } = useSelector((state) => state.nav);

  const clearOrderStatus = () => {
    setStatus(0);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className={classes.App}>
        <Nav />
        {orderStatus !== 0 ? (
          <OrderStatus
            placed={orderStatus}
            clearOrderStatus={clearOrderStatus}
          />
        ) : (
          <>
            {page === "home" && <Home />}
            {page === "login" && <Login />}
            {page === "category" && <Category />}
            {page === "item" && <ItemDetail />}
            {cartOpen && <Cart />}
            {wishlistOpen && <Wishlist />}
          </>
        )}
      </div>
    </Elements>
  );
}

export default App;

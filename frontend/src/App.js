import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import { OrderHistoryScreen } from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import { UserListScreen } from './screens/UserListScreen';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <Router>
      <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">amazon</Link>
                </div>
                <div>
                    <Link to="/cart">Cart
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                    </Link>
                    {
                      userInfo? (
                        <div className="dropdown">
                        <Link to="#"> { userInfo.name } <i className="fa fa-caret-down"></i> </Link>
                        <ul className="dropdown-content">
                        <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                          <li>
                            <Link to="/orderhistory">Order History</Link>
                          </li>
                          <li>
                            <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                          </li>
                        </ul>
                        </div>
                      ) :
                      (
                        <Link to="/signin">Sign In</Link>
                      ) }
                        {userInfo && userInfo.isAdmin && (
                          <div className="dropdown">
                            <Link to="#admin">
                              Admin <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                              <li>
                                <Link to="/dashboard">Dashboard</Link>
                              </li>
                              <li>
                                <Link to="/productlist">Products</Link>
                              </li>
                              <li>
                                <Link to="/orderlist">Orders</Link>
                              </li>
                              <li>
                                <Link to="/userlist">Users</Link>
                              </li>
                            </ul>
                          </div>
                        )}
                </div>
            </header>
            
              <main>

              
                <Routes>
                  <Route path="/cart/:id"   element={ <CartScreen /> } />
                  <Route path="/cart"       element={<CartScreen />} />
                  <Route path="/product/:id"element={ <ProductScreen /> } exact/>
                  <Route path="/product/:id/edit" element={<ProductEditScreen />} exact></Route>
                  <Route path="/signin"     element={ <SigninScreen /> }/>
                  <Route path="/register"   element={ <RegisterScreen /> }/>
                  <Route path="/"           element={ <HomeScreen />  }/>
                  <Route path="/shipping"   element={ <ShippingAddressScreen />  }/>
                  <Route path="/payment"    element={ <PaymentMethodScreen />  }/>
                  <Route path="/placeorder" element={ <PlaceOrderScreen /> }/>
                  <Route path="/order/:id"   element={ <OrderScreen /> }/>
                  <Route path="/orderhistory"   element={ <OrderHistoryScreen /> }/>
                  <Route path="/profile"    element={<PrivateRoute> <ProfileScreen /></PrivateRoute>}/>
                  <Route path="/productlist" element={ <AdminRoute> <ProductListScreen /> </AdminRoute> }/>
                  <Route path="/orderlist" element={ <AdminRoute> <OrderListScreen /> </AdminRoute> }/>
                  <Route path="/userlist" element={ <AdminRoute> <UserListScreen /> </AdminRoute> }/>
                  <Route path="/user/:id/edit" element={ <AdminRoute> <UserEditScreen /> </AdminRoute> } />
                </Routes>
             

              </main>
            
            <footer className="row center">
                All right reserved 
            </footer>
      </div>
      </Router>
  );
}

export default App;

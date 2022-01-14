import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRouter';
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
import SellerScreen from './screens/SellerScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import { UserListScreen } from './screens/UserListScreen';
import SearchScreen from './screens/SearchScreen';
import { listProductsCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { 
      loading: loadingCategories, 
      error: errorCategories, 
      categories, 
  } = productCategoryList;


  useEffect(() => {
    dispatch(listProductsCategories());
  }, [dispatch]);

  return (
    <Router>
      <div className="grid-container">
            <header className="row">
                <div>
                    <button type='button' 
                      className='open-sidebar'
                      onClick={() => setSidebarIsOpen(true)}>
                      <i className='fa fa-bars'></i>
                    </button>
                    <Link className="brand" to="/">amazon</Link>
                </div>
                <div>
                  <SearchBox />
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
                      {userInfo && userInfo.isSeller && (
                          <div className="dropdown">
                          <Link to="#admin">
                            Seller <i className="fa fa-caret-down"></i>
                          </Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="/productlist/seller">Products</Link>
                            </li>
                            <li>
                              <Link to="/orderlist/seller">Orders</Link>
                            </li>
                          </ul>
                        </div>
                      )}
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
                              <li>
                                <Link to="/support">Support</Link>
                              </li>
                            </ul>
                          </div>
                      )}
                </div>
            </header>
            <aside className={sidebarIsOpen? 'open': ''}>
                        <ul className='categories'>
                          <li>
                            <strong>Categories</strong>
                            <button 
                              onClick={() => setSidebarIsOpen(false)} 
                              className='close-sidebar'>
                              <i className='fa fa-close'></i>
                            </button>
                          </li>
                          {loadingCategories ? (<LoadingBox></LoadingBox>)
                          :
                          errorCategories ? (<MessageBox variant='danger'>{errorCategories}</MessageBox>) 
                          : (
                            categories.map((c) => (
                              <li key={c}>
                                <Link to={`/search/category/${c}`}
                                  onClick={() => setSidebarIsOpen(false)}>{c}</Link>
                              </li>
                            ))
                          )}
                        </ul>
            </aside>
            
              <main>
                <Routes>
                  <Route path="/seller/:id" element={ <SellerScreen /> }/>
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
                  <Route path="/map"        element={<PrivateRoute> <MapScreen /></PrivateRoute>} />
                  <Route path="/productlist" element={ <AdminRoute> <ProductListScreen /> </AdminRoute>} exact/>
    
                  <Route path="/orderlist"  element={ <AdminRoute> <OrderListScreen /> </AdminRoute> } exact/>
                  <Route path="/userlist"   element={ <AdminRoute> <UserListScreen /> </AdminRoute> }/>
                  <Route path="/user/:id/edit" element={ <AdminRoute> <UserEditScreen /> </AdminRoute> } />
                  <Route path="/dashboard" element={ <AdminRoute> <DashboardScreen /> </AdminRoute> } />
                  <Route path="/support" element={ <AdminRoute> <SupportScreen /> </AdminRoute> } />
                  <Route path="/productlist/seller" element={<SellerRoute><ProductListScreen/></SellerRoute>}/>
                  <Route path="/orderlist/seller" element={<SellerRoute><OrderListScreen/></SellerRoute>}/>
                  <Route path="/search/name" element={<SearchScreen />} exact></Route>
                  <Route
                    path="/search/name/:name"
                    element={<SearchScreen />}
                    exact
                  ></Route>
                  <Route
                    path="/search/category/:category"
                    element={<SearchScreen />}
                    exact
                  ></Route>
                  <Route
                    path="/search/category/:category/name/:name"
                    element={<SearchScreen />}
                    exact
                  ></Route>
                  <Route
                    path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/"
                    element={<SearchScreen />}
                    exact
                  ></Route>

                </Routes>
              </main>
            
          <footer className="row center">
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
      </Router>
  );
}

export default App;

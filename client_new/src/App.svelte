<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import Login from "./pages/Login/Login.svelte";
  import Profile from "./pages/Profile/Profile.svelte"

  import PrivateRoute from "./PrivateRoute/PrivateRoute.svelte";
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/profile">Profile</Link>
  </nav>

  <Route path="/">
    <Home />
  </Route>
  
  <Route path="/login">
    <Login />
  </Route>

  <PrivateRoute path="/profile" let:location>
    <Profile />
  </PrivateRoute>
</Router>
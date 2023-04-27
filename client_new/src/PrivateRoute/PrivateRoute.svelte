<script>
  import { Route } from "svelte-navigator";
  import PrivateRouteGard from "./PrivateRouteGuard.svelte";

  export let path;
</script>

<Route {path} let:params let:location let:navigate>
  <PrivateRouteGard>
    <slot {params} {location} {navigate} />
  </PrivateRouteGard>
</Route>

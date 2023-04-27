<script>
  import { useNavigate } from "svelte-navigator";
  import { login } from "../../utils.js";
  import { user } from "../../stores/userStore.js";

  const navigate = useNavigate();

  let email = "user@example.com";
  let password = "password123";
  let errorMessage = "";

  async function handleSubmit(event) {
  event.preventDefault();

  try {
    const response = await login(email, password);

    if (response.error) {
      errorMessage = response.error;
    } else {
      user.set(response.user);
      navigate("/profile");
    }
  } catch (error) {
    errorMessage = "An error occurred. Please try again later.";
  }
}
</script>

<h1>Login</h1>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<form on:submit={handleSubmit}>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>

  <button type="submit">Log in</button>
</form>

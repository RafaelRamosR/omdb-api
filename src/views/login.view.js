const viewLogin = `
  <h1 class="container-title">LOGIN</h1>
  <section class="row">
    <form class="form-main" autocomplete="off">
      <div class="form-group-radio">
        <input id="radioColor1" type="radio" name="avatar" value="avatar1.png">
        <label for="radioColor1"></label>
      </div>
      <div class="form-group-radio">
        <input id="radioColor2" type="radio" name="avatar" value="avatar2.png">
        <label for="radioColor2"></label>
      </div>
      <div class="form-group-radio">
        <input id="radioColor3" type="radio" name="avatar" value="avatar3.png">
        <label for="radioColor3"></label>
      </div>
      <div class="form-group-radio">
        <input id="radioColor4" type="radio" name="avatar" value="avatar4.png">
        <label for="radioColor4"></label>
      </div>
      <div class="form-group-text">
        <label for="username">
          <input type="text" class="form-input-text" name="username" placeholder="Username" required>
        </label>
      </div>
      <div class="form-group-pass">
        <label for="password">
          <input type="password" class="form-input-text" name="password" placeholder="Password"  autocomplete="off" required>
        </label>
      </div>
      <input type="submit" class="btn-submit" value="Login">
    </form>
  </section>
`;

export { viewLogin };

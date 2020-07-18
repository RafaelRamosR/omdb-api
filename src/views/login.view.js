export default viewLogin = `
  <section class="row">
    <form class="form-main" autocomplete="off">
      <div class="form-group-radio">
        <input id="radioColor1" class="radio-input" type="radio" name="avatar" value="avatar1.png">
        <label for="radioColor1" class="label radio-label1"></label>
      </div>
      <div class="form-group-radio">
        <input id="radioColor2" class="radio-input" type="radio" name="avatar" value="avatar2.png">
        <label for="radioColor2" class="label radio-label2"></label>
      </div>
      <div class="form-group-radio">
        <input id="radioColor3" class="radio-input" type="radio" name="avatar" value="avatar3.png">
        <label for="radioColor3" class="label radio-label3"></label>
      </div>
      <div class="form-group-radio">
        <input id="radioColor4" class="radio-input" type="radio" name="avatar" value="avatar4.png">
        <label for="radioColor4" class="label radio-label4"></label>
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

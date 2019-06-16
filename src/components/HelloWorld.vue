<template>
  <div class="hello">
    <form action="post" name="foo" id="arthur-form">
      <div class="c-form__input">
        <label class="c-form__label" for="username">Username</label>
        <input v-model="form.username.value" id="username" name="username" type="text">
        <p class="c-form__input--error" v-if="form.username.error !== null">{{form.username.error}}</p>
      </div>

      <div class="c-form__input">
        <label class="c-form__label" for="password">Password</label>
        <input v-model="form.password.value" id="password" name="password" type="text">
        <p class="c-form__input--error" v-if="form.password.error !== null">{{form.password.error}}</p>
      </div>
      <input type="submit" value="Send" :disabled="!formIsValid">
    </form>
  </div>
</template>

<script>
import ValidationRules from "./../mixins/FormValidation/ValidationRules";
import ValidationMethods from "./../mixins/FormValidation/ValidationMethods";

export default {
  name: "HelloWorld",
  mixins: [ValidationRules, ValidationMethods],
  data() {
    return {
      form: {
        username: {
          value: null,
          error: null,
          rules: {
            notEmpty: true,
            maxLegth: 8,
            alphaNumeric: true
          }
        },
        password: {
          value: null,
          error: null,
          rules: {
            notEmpty: true,
            maxLegth: 3,
            numbersOnly: true
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.c-form {
  display: flex;

  &__label {
    display: block;
  }

  &__input {
    &--error {
      color: red;
      font-size: 12px;
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
}
</style>

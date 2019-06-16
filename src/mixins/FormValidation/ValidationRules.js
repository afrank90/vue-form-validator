import FormValidationError from "./Exceptions/FormValidationError";

export default {
  methods: {
    notEmpty(formElement) {
      const value = formElement.value;
      if (value === null || value.length <= 0) {
        // TODO make msgs overridable!
        throw new FormValidationError("Value can not be empty!");
      }
    },
    maxLegth(formElement, ruleValue) {
      const value = formElement.value;
      if (value !== null && value.length > ruleValue) {
        throw new FormValidationError(
          `Maximum allowed charecters is ${ruleValue}!`
        );
      }
    },
    numbersOnly(formElement) {
      if (isNaN(formElement.value)) {
        throw new FormValidationError("This field can contain only numbers!");
      }
    },
    alphaNumeric(formElement) {
      if (!formElement.value.match(/^[0-9a-zA-Z]+$/g)) {
        throw new FormValidationError(
          "This field can contain only alpha-numbers characters!"
        );
      }
    }
  }
};

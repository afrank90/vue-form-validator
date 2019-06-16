const config = {
  defaultErrorMsg: "Form is invalid"
};

export default class FormValidationError extends Error {
  constructor(msg = config.defaultErrorMsg, ...params) {
    super(...params);
    this.message = msg;
  }
}

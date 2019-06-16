import FormValidationError from "./Exceptions/FormValidationError";

const config = {
  defaultEvent: "change"
};

export default {
  computed: {
    formIsValid() {
      // TODO we have duplicated logic here. Find out how to optimise this. maybe with HOFs
      for (let elementId in this.form) {
        const element = this.form[elementId];
        const rules = Object.entries(element.rules);

        for (let [ruleName, ruleValue] of rules) {
          try {
            this[ruleName](element, ruleValue);
          } catch (e) {
            if (e instanceof FormValidationError) {
              return false;
            }
            // Handle any other exceptions if needed
          }
        }
      }
      return true;
    }
  },
  methods: {
    bindFormValidationRules() {
      for (let elementId in this.form) {
        const element = this.form[elementId];
        const formField = document.getElementById(elementId);
        const event = element.event ? element.event : config.defaultEvent;

        formField.addEventListener(event, () => {
          this.applyRules(element);
        });
      }
    },
    // RxJs seems to be a greate candidate for the best validation. Obvs need to proof that, but just thinking...
    applyRules(element) {
      const rules = Object.entries(element.rules);
      element.error = null;
      for (let [ruleName, ruleValue] of rules) {
        try {
          this[ruleName](element, ruleValue);
        } catch (e) {
          if (e instanceof FormValidationError) {
            element.error = e.message;
          }
          // Handle any other exceptions if needed
        }
      }
    }
  },
  mounted() {
    this.bindFormValidationRules();
  }
};

import { LitElement, html, css } from "lit";
import IconFav from "../images/icon-star.svg";
import ThankYouImage from "../images/illustration-thank-you.svg";

export class InteractiveRating extends LitElement {
  static properties = {
    rate: { type: Number, state: true },
    isSubmitted: { type: Boolean, reflect: true, attribute: "thx-u" },
  };
  constructor() {
    super();
    this.rate = 0;
    this.isSubmitted = false;
  }

  handleChangeRateCreator(r) {
    return () => {
      this.rate = r;
    };
  }

  createRateButtons = (n = 5) => {
    const buttons = [];
    for (let i = 1; i <= n; i++) {
      const className = `rate-button key-${i} ${
        this.rate === i ? "selected" : ""
      }`;
      buttons.push(
        html`<button
          @click=${this.handleChangeRateCreator(i)}
          class=${className}
          type="button"
        >
          ${i}
        </button>`
      );
    }
    return buttons;
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.rate === 0) return;
    console.log("Form Submitted (Selected: " + this.rate + ")");
    this.isSubmitted = true;
    // Handle submission request
  }

  render() {
    const surveyString =
      "Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!";
    const thxuString =
      "We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!";

    return html`
      <div class=${this.isSubmitted ? "thxu" : "favstar"}>
        <img src=${this.isSubmitted ? ThankYouImage : IconFav} />
      </div>
      ${this.isSubmitted
        ? html`<span>You selected ${this.rate} out of 5</span>`
        : ""}
      <div class="text-wrap">
        <h3>${this.isSubmitted ? "Thank you!" : "How did we do?"}</h3>
        <p>${this.isSubmitted ? thxuString : surveyString}</p>
      </div>
      ${!this.isSubmitted
        ? html`<form @submit=${this.handleSubmit}>
            <fieldset class="buttonery">${this.createRateButtons()}</fieldset>
            <button type="submit" class="submit">SUBMIT</button>
          </form>`
        : ""}
    `;
  }

  static styles = [
    css`
      :host {
        --orange: 25, 97%, 53%;
        --white: 0, 0%, 100%;
        --light-grey: 217, 12%, 63%;
        --medium-grey: 216, 12%, 54%;
        --dark-blue: 213, 19%, 18%;
        --verydark-blue: 216, 12%, 8%;
      }
    `,
    css`
      :host([thx-u]) {
        align-items: center;
        justify-content: space-between;
        padding: 38px 38px;
      }
      :host([thx-u]) .text-wrap {
        text-align: center;
      }
      :host([thx-u]) span {
        color: hsl(var(--orange));
        background-color: hsla(var(--light-grey), 0.2);
        border-radius: 999px;
        padding: 8px 24px;
        margin: 0;
      }
    `,
    css`
      :host {
        box-sizing: border-box;
        background: hsl(var(--dark-blue));
        border: none;
        border-radius: 32px;
        width: 415px;
        height: 415px;
        padding: 32px;
        font-size: 15px;
        font-family: "Overpass";
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      :host > * {
        box-sizing: inherit;
      }
      .favstar {
        background: hsl(var(--light-grey), 0.1);
        border-radius: 999px;
        display: inline-flex;
        place-content: center;
        place-items: center;
        width: 50px;
        height: 50px;
      }
      .text-wrap {
        text-align: start;
      }
      h3 {
        font-size: 1.85rem;
        margin: 0;
        margin-bottom: 16px;
      }
      p {
        color: hsl(var(--medium-grey));
        line-height: 1.6;
        margin: 0;
      }
      form {
        display: grid;
        grid-template-rows: auto;
        gap: 28px;
      }
      .buttonery {
        margin: 0;
        padding: 0;
        border: none;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .rate-button {
        border: none;
        background: hsla(var(--light-grey), 0.1);
        color: hsla(var(--white), 0.3);
        font-weight: bold;
        border-radius: 999px;
        width: 50px;
        height: 50px;
      }
      .rate-button:hover {
        cursor: pointer;
        color: hsla(var(--white));
        background: hsla(var(--orange));
      }
      .rate-button.selected {
        cursor: pointer;
        color: hsla(var(--white), 1);
        background: hsla(var(--light-grey), 1);
      }
      .submit {
        width: 100%;
        background: hsl(var(--orange));
        color: hsl(var(--white));
        border: none;
        border-radius: 999px;
        font-size: 1em;
        font-weight: bold;
        letter-spacing: 2px;
        padding: 16px;
      }
      .submit:hover {
        color: hsl(var(--orange));
        background: hsl(var(--white));
        cursor: pointer;
      }
    `,
  ];
}
customElements.define("interactive-rating", InteractiveRating);

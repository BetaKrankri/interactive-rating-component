import { LitElement, html, css } from "lit";

export class InteractiveRating extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<p>Hello from the interactive compoent</p>`;
  }
}
customElements.define("interactive-rating", InteractiveRating);

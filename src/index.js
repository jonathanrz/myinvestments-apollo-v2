import "reset-css/reset.css"
import React from "react"
import { render } from "react-dom"
import i18next from "i18next"

const rootNode = document.getElementById("root")

function renderApp() {
  const App = require("./App").default
  render(<App />, rootNode)
}

i18next.init(
  {
    lng: "ptBR",
    debug: process.env.NODE_ENV !== "production",
    interpolation: {
      escapeValue: false
    },
    resources: {
      ptBR: {
        translation: require("app/languages/ptBR").default
      }
    }
  },
  renderApp
)

if (process.env.NODE_ENV !== "production") {
  module.hot.accept(renderApp)
}

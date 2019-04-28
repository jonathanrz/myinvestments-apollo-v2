import React, { Fragment, Component } from "react"
import { t } from "i18next"
import { flatten, sortBy, orderBy, groupBy, get } from "lodash/fp"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Query from "app/common/Query"
import Filter from "app/common/ListFilter"
import { formatDate } from "app/utils/date"
import Table from "./Table"
import activeInvestmentsQuery from "./activeInvestmentsQuery"
import allInvestmentsQuery from "./allInvestmentsQuery"

const totalTableMonths = [3, 6, 12, 18, 24, 36]

const filters = [
  { key: "type", name: t("investments.listPage.filters.type") },
  { key: "holder", name: t("investments.listPage.filters.holder") },
  {
    key: "objective",
    name: t("investments.listPage.filters.objective")
  }
]

function formatMonth(date) {
  return formatDate(date, t("common.monthFormat"))
}

function mapIncomes(investments) {
  const incomes = orderBy(
    "date",
    "desc",
    flatten(
      investments.map(investment =>
        investment.incomes.map(income => ({ ...income, investment }))
      )
    )
  )

  return groupBy(income => formatMonth(income.date), incomes)
}

function renderTable(investments) {
  const incomes = mapIncomes(investments)

  const totalData = []
  const total = { investment: t("common.total") }
  Object.keys(incomes).map(key => {
    const sum = incomes[key].reduce((acc, i) => acc + i.yield, 0)
    totalData.push({
      sum,
      received: incomes[key].reduce((acc, i) => acc + i.received, 0)
    })
    total[key] = sum
  })

  const content = sortBy(
    i => i.investment && i.investment.toLowerCase(),
    investments.map(investment => {
      const result = { investment: investment.name }
      Object.keys(incomes).map(key => {
        result[key] =
          get(
            "yield",
            incomes[key].find(
              income => income.investment.uuid === investment.uuid
            )
          ) || 0
      })
      return result
    })
  )

  const totalTableMonthsFiltered = totalTableMonths.filter(
    v => v < totalData.length
  )

  return (
    <Fragment>
      <Table
        columns={[
          {
            header: t("dashboard.month.investment"),
            key: "investment"
          },
          ...Object.keys(incomes).map(key => ({
            header: key,
            key,
            numeric: true,
            currency: true,
            colored: true
          }))
        ]}
        content={[...content, total]}
      />
      <div style={{ maxWidth: 400 }}>
        <Table
          columns={[
            {
              header: t("dashboard.month.period"),
              key: "period"
            },
            {
              header: t("dashboard.month.value"),
              key: "sum",
              numeric: true,
              currency: true,
              colored: true
            },
            {
              header: t("dashboard.month.received"),
              key: "received",
              numeric: true,
              currency: true,
              colored: true
            }
          ]}
          content={totalTableMonthsFiltered.map(months => ({
            period: t(`dashboard.month.last${months}Months`),
            sum:
              totalData.slice(0, months).reduce((acc, v) => acc + v.sum, 0) /
              months,
            received:
              totalData
                .slice(0, months)
                .reduce((acc, v) => acc + v.received, 0) / months
          }))}
        />
      </div>
    </Fragment>
  )
}

class DashboardMonth extends Component {
  state = {
    onlyActiveInvestments: false
  }

  handleChange = event => {
    this.setState({ onlyActiveInvestments: event.target.checked })
  }

  render() {
    const { onlyActiveInvestments } = this.state
    const queryField = onlyActiveInvestments
      ? "activeInvestments"
      : "investments"
    return (
      <Fragment>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={onlyActiveInvestments}
                onChange={this.handleChange}
                value="onlyActiveInvestments"
              />
            }
            label={t("dashboard.month.onlyActiveInvestments")}
          />
        </FormGroup>
        <Query
          query={
            onlyActiveInvestments ? activeInvestmentsQuery : allInvestmentsQuery
          }
        >
          {({ data }) => {
            if (!data || !data[queryField]) {
              return null
            }

            return (
              <Filter filters={filters} result={data[queryField]}>
                {filteredResult => renderTable(filteredResult)}
              </Filter>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default DashboardMonth

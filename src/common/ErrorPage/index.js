import { t } from "i18next"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import { AuthConsumer } from "app/common/AuthContext"
import React from "react"
import { Link } from "react-router-dom"

const styles = {
  root: {
    flexGrow: 1
  },
  panel: {
    width: "80%",
    maxWidth: 400
  }
}

function ErrorPage({ classes, title, description }) {
  return (
    <AuthConsumer>
      {({ loggedIn }) => (
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.root}
        >
          <Card className={classes.panel}>
            <CardContent>
              <Typography variant="headline" component="h1">
                {title}
              </Typography>
              <Typography component="p">{description}</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/" size="small">
                {t(
                  loggedIn
                    ? "errorPage.loggedRecoverMessage"
                    : "errorPage.unloggedRecoverMessage"
                )}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </AuthConsumer>
  )
}

export default withStyles(styles)(ErrorPage)

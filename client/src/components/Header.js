import {
  Logo,
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "./Clickable";
import Centered from "./Centered";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    lineHeight: "80px",
    justifyContent: "space-around",
    alignItems: "center",
  },
  logoHeader: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  logo: {
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    display: "inherit",
  },
  banner: {
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    fontSize: 21,
    "& i": {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    logo: {
      display: "none",
    },
    img: {
      display: "none",
    },
    banner: {
      display: "none",
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    },
  },
});

const Header = (props) => {
  const { classes, onNav, ...rest } = props;
  const history = useHistory();
  const { user } = useAuth();

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <ArwesHeader animate>
      <Centered className={classes.root} {...rest}>
        <div className={classes.logoHeader}>
          <img
            src="/favicon.png"
            alt=""
            className={classes.img}
            style={{
              margin: "15px 10px 15px 0",
              height: "50px",
              width: "auto",
            }}
          />
          <Logo animate size={50} className={classes.logo} layer="header" />
          <Words animate className={classes.banner}>
            NASA Mission Control
          </Words>
        </div>
        <div className={classes.logoHeader}>
          <nav className={`${classes.nav}`}>
            {isAuthenticated() ? (
              <>
                <Clickable className={classes.clickable} onClick={onNav}>
                  <Highlight className={classes.button} animate layer="header">
                    <Link className={classes.link} to="/launch">
                      <i className="material-icons">check_circle_outline</i>
                      Launch
                    </Link>
                  </Highlight>
                </Clickable>
                <Clickable className={classes.clickable} onClick={onNav}>
                  <Highlight className={classes.button} animate layer="header">
                    <Link className={classes.link} to="/upcoming">
                      <i className="material-icons">update</i>Upcoming
                    </Link>
                  </Highlight>
                </Clickable>
                <Clickable className={classes.clickable} onClick={onNav}>
                  <Highlight className={classes.button} animate layer="header">
                    <Link className={classes.link} to="/history">
                      <i className="material-icons">history</i>History
                    </Link>
                  </Highlight>
                </Clickable>
                <Clickable className={classes.clickable} onClick={onNav}>
                  <Highlight className={classes.button} animate layer="header">
                    <Link className={classes.link} to="/">
                      <i className="material-icons">logout</i>Logout
                    </Link>
                  </Highlight>
                </Clickable>
              </>
            ) : (
              <Clickable className={classes.clickable} onClick={onNav}>
                <Highlight className={classes.button} animate layer="header">
                  <Link className={classes.link} to="/">
                    <i className="material-icons">login</i>Login
                  </Link>
                </Highlight>
              </Clickable>
            )}
          </nav>
        </div>
      </Centered>
    </ArwesHeader>
  );
};

export default withStyles(styles)(Header);

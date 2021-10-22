import React, { useState } from "react";
import { TextField, Button, Box, Checkbox } from "@material-ui/core";
import { useHistory, Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      background: "rgb(232, 241, 250)",
    },
  },
  customTextField: {
    "& input::placeholder": {
      fontSize: "15px",
      color: "rgba(52, 105, 38, 0.966)",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [Email, setEmail] = useState(null);
  const [EmailVal, setEmailVal] = useState(null);
  const [open, setOpen] = useState(false);

  function emailvalidation(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      setEmailVal("Requied*");
    } else if (!email.match(mailformat)) {
      setEmailVal("enter valid email ");
      return false;
    } else {
      setEmailVal(null);
      return true;
    }
  }

  const forgotpasswordbtn = () => {
    var emailval = emailvalidation(Email);

    if (emailval) {
      const config = {
        method: "post",
        url: "https://dev.inheritxdev.net/plcalarm-dev/v1//users/forgot-password",
        data: {
          email: Email,
        },
      };

      setOpen(true);
      axios(config)
        .then((res) => {
          history.push("/Login");
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    }
  };

  return (
    <div className="loginpage">
      <div
        style={{
          float: "left",
          height: "100vh",
          width: "45%",
          backgroundColor: "rgba(215, 245, 240, 0.842)",
        }}
      ></div>
      <div style={{ width: "50%", float: "right" }}>
        <br />

        <h2
          style={{
            textAlign: "center",
            marginTop: "17%",
            fontWeight: 650,
            color: "black",
            fontStyle: "revert",
          }}
        >
          Forgot Password?
        </h2>

        <h6
          style={{
            marginLeft: "35%",
            fontWeight: 350,
            fontSize: "85%",
            color: "rgba(52, 105, 38, 0.966)",
            fontStyle: "revert",
          }}
        >
          Enter your registred id below to
          <br />
          get password reset intruction.
        </h6>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={900000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
              style={{ top: "15%", left: "50%" }}
            >
              Please check your email to reset password.
            </Alert>
          </Snackbar>
        </Stack>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            textAlign: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />

          <label
            style={{
              float: "left",
              marginLeft: "15%",
              fontSize: "90%",
              fontWeight: 640,
              color: "black",
              fontStyle: "revert",
            }}
          >
            Email Id
          </label>
          <br />
          <TextField
            classes={{ root: classes.customTextField }}
            id="outlined-basic"
            placeholder="Enter your email address here"
            type="text"
            size="small"
            variant="filled"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginLeft: "1%",
              width: "50%",
              backgroundColor: "rgba(215, 245, 240, 0.842)",
            }}
          />
          <br />
          <span style={{ textAlign: "left", color: "red" }}>{EmailVal}</span>
          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />

          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>

          <Button
            variant="contained"
            style={{
              textAlign: "center",
              marginLeft: "2%",
              width: "30%",
              height: "10%",
              color: "white",
              backgroundColor: "rgba(52, 105, 38, 0.966)",
            }}
            onClick={forgotpasswordbtn}
          >
            Submit
          </Button>
          <Box
            component="span"
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />
          <h6
            style={{
              marginLeft: "33%",
              marginTop: "1%",
              color: "black",
              fontStyle: "revert",
              fontSize: "95%",
              fontWeight: 650,
            }}
          >
            Go back to <t />
            <Link
              to="/Login"
              style={{
                color: "rgba(52, 105, 38, 0.966)",
                fontWeight: 750,
                fontStyle: "revert",
              }}
            >
              Log In
            </Link>
          </h6>
        </Box>
      </div>
    </div>
  );
}

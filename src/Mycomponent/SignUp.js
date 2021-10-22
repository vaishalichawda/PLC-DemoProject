import React, { useState } from "react";
import { TextField, Button, Box, Checkbox, Grid } from "@material-ui/core";
import { useHistory, Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SignUP() {
  const history = useHistory();
  const classes = useStyles();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [FirstVal, setFirstVal] = useState(null);
  const [EmailVal, setEmailVal] = useState(null);
  const [LastVal, setLastVal] = useState(null);
  const [PswVal, setPswVal] = useState(null);
  const [CpswVal, setCpswVal] = useState(null);
  const [CheckBox, setCheckBox] = useState(false);
  const [CheckBoxVal, setCheckBoxVal] = useState(null);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const SignUpBtn = () => {
    var fval = firstnamevalidation(Fname);
    var emailval = emailvalidation(Email);
    var lval = lastnamevalidation(Lname);
    var pval = passvalidation(Password);
    var cval = confirmpassvalidation(Cpassword);

    function firstnamevalidation(firstname) {
      var nameformat = /^[A-Za-z ]+$/;
      if (firstname === "") {
        setFirstVal("Required*");
      } else if (!firstname.match(nameformat)) {
        setFirstVal(" You have enter only alphabet!");
        return false;
      } else {
        setFirstVal(null);
        return true;
      }
    }

    function lastnamevalidation(lastname) {
      var nameformat = /^[A-Za-z ]+$/;
      if (lastname === "") {
        setLastVal("Required*");
      } else if (!lastname.match(nameformat)) {
        setLastVal(" You have enter only alphabet!");
        return false;
      } else {
        setLastVal(null);
        return true;
      }
    }

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

    function passvalidation(password) {
      const passformat =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,16}$/;
      if (password === "") {
        setPswVal("Required*");
      } else if (!password.match(passformat)) {
        setPswVal(" You have entered an invalid password,please try again!");
        return false;
      } else {
        setPswVal(null);
        return true;
      }
    }

    function confirmpassvalidation(cpassword) {
      if (cpassword === "") {
        setCpswVal("Required*");
      } else if (cpassword == Password) {
        setCpswVal(null);
        return true;
      } else {
        setCpswVal(" Password dose not match ");
        return false;
      }
    }

    if (fval && emailval && lval && pval && cval) {
      if (!CheckBox) {
        setCheckBoxVal("please agree terms & condition");
      } else {
        const config = {
          method: "post",
          url: "https://dev.inheritxdev.net/plcalarm-dev/v1/users/signUp",
          data: {
            first_name: Fname,
            last_name: Lname,
            email: Email,
            password: Password,
            confirm_password: Cpassword,
            terms_condition: CheckBox ? 1 : 0,
          },
        };
        setOpen(true);
        axios(config)
          .then((res) => {
            history.push("/Login");
          })
          .catch((error) => {
            alert(error, "server response bad");
          });
      }
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
        <h4
          style={{
            textAlign: "center",
            fontWeight: "750",
            color: "black",
            fontStyle: "revert",
          }}
        >
          Create New Account
        </h4>

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
              Successfully Account Created!
            </Alert>
          </Snackbar>
        </Stack>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
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
              fontWeight: 620,
              fontSize: "80%",
              textAlign: "left",
              color: "black",
              fontStyle: "revert",
            }}
          >
            First Name
            <TextField
              classes={{ root: classes.customTextField }}
              placeholder="Enter your first name"
              id="standard-size-small"
              size="small"
              variant="filled"
              name="firstname"
              onChange={(e) => setFname(e.target.value)}
              style={{
                backgroundColor: "rgba(227, 255, 250, 0.842)",
                width: "95%",
                marginRight: "150%",
              }}
            />
          </label>
          <span style={{ textAlign: "left", color: "red" }}>{FirstVal}</span>

          <label
            style={{
              fontWeight: 620,
              fontSize: "82%",
              textAlign: "left",
              color: "black",
              fontStyle: "revert",
            }}
          >
            Last Name
            <TextField
              classes={{ root: classes.customTextField }}
              id="outlined-basic"
              placeholder="Enter your last name"
              size="small"
              name="lastname"
              onChange={(e) => setLname(e.target.value)}
              style={{
                marginLeft: "1%",
                width: "97%",
                backgroundColor: "rgba(227, 255, 250, 0.842)",
              }}
              variant="filled"
            />
          </label>
          <span style={{ textAlign: "left", color: "red" }}>{LastVal}</span>

          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />
          <br />
          <label
            style={{
              float: "left",
              marginLeft: "6%",
              fontWeight: 620,
              fontSize: "82%",
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
              width: "63%",
              backgroundColor: "rgba(227, 255, 250, 0.842)",
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

          <label
            style={{
              float: "left",
              marginLeft: "6%",
              fontWeight: 620,
              fontSize: "85%",
              color: "black",
              fontStyle: "revert",
            }}
          >
            Password
          </label>
          <br />
          <TextField
            classes={{ root: classes.customTextField }}
            type={showPassword ? "text" : "password"}
            id="outlined-basic"
            placeholder="Enter your password here"
            variant="filled"
            size="small"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "63%",
              backgroundColor: "rgba(227, 255, 250, 0.842)",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ marginLeft: "15%", marginTop: "30%" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <span style={{ textAlign: "left", color: "red" }}>{PswVal}</span>
          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />
          <label
            style={{
              float: "left",
              marginLeft: "10%",
              fontWeight: 620,
              fontSize: "85%",
              color: "black",
              fontStyle: "revert",
            }}
          >
            Confirm Password
          </label>
          <br />
          <TextField
            classes={{ root: classes.customTextField }}
            type={showPassword ? "text" : "password"}
            id="outlined-basic"
            placeholder="Enter confirm password here"
            variant="filled"
            size="small"
            name="cpassword"
            onChange={(e) => setCpassword(e.target.value)}
            style={{
              width: "63%",
              backgroundColor: "rgba(227, 255, 250, 0.842)",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ marginLeft: "15%", marginTop: "30%" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <span style={{ textAlign: "left", color: "red" }}>{CpswVal}</span>
          <Box
            component="span"
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />
          <Checkbox
            style={{
              width: "auto",
              marginLeft: "auto",
              color: "rgba(52, 105, 38, 0.966)",
            }}
            onClick={() => setCheckBox(true)}
          />
          <b style={{ fontStyle: "revert", fontWeight: 650, fontSize: "95%" }}>
            By Signin Up i agree to the Terams & Conditions
          </b>
          <br />
          <span style={{ textAlign: "left", color: "red" }}>{CheckBoxVal}</span>
          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />

          <Button
            variant="contained"
            style={{
              textAlign: "center",
              marginLeft: "2%",
              width: "35%",
              height: "12%",
              color: "white",
              backgroundColor: "rgba(52, 105, 38, 0.966)",
            }}
            onClick={SignUpBtn}
          >
            Sign Up
          </Button>
          <br />
          <Box
            component="span"
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>

          <h6
            style={{
              marginLeft: "31%",
              marginTop: "1%",
              fontStyle: "revert",
              fontWeight: 650,
              fontSize: "95%",
            }}
          >
            Already have an account?
            <Link
              to="/Login"
              style={{
                color: "rgba(52, 105, 38, 0.966)",
                fontWeight: 750,
              }}
            >
              Login
            </Link>
          </h6>
        </Box>
      </div>
    </div>
  );
}

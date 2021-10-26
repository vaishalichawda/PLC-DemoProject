import React, { useState } from "react";
import { TextField, Button, Box, Checkbox } from "@material-ui/core";
import { useHistory, Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "rgba(215, 245, 240, 0.842)",
  border: "1px solid #000",
  boxShadow: 24,
  p: 1,
  textAlign: "center",
};

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [getEmail, setgetEmail] = useState(localStorage.getItem("email"));
  const [getPassword, setgetPassword] = useState(
    localStorage.getItem("password")
  );
  const [Email, setEmail] = useState(getEmail);
  const [Password, setPassword] = useState(getPassword);
  const [EmailVal, setEmailVal] = useState(null);
  const [PswVal, setPswVal] = useState(null);
  const [RememberMe, setRememberMe] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [SankBaropen, setSankBarOpen] = useState(false);

  // console.log(getEmail)
  function emailvalidation(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "") {
      setEmailVal("Requied*");
    } else if (!email?.match(mailformat) && Email === getEmail) {
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
    } else if (!password?.match(passformat) && Password === getPassword) {
      setPswVal(" You have entered an invalid password,please try again!");
      return false;
    } else {
      setPswVal(null);
      return true;
    }
  }

  const Loginbtn = () => {
    var emailval = emailvalidation(Email);
    var pval = passvalidation(Password);

    if (emailval && pval) {
      const config = {
        method: "post",
        url: "https://dev.inheritxdev.net/plcalarm-dev/v1/users/login",
        data: {
          email: Email,
          password: Password,
        },
      };

      setSankBarOpen(true);
      axios(config)
        .then((res) => {
          // console.log(res.data.message)
          if (setRememberMe) {
            localStorage.setItem("email", Email);
            localStorage.setItem("password", Password);
          }
          history.push("/ProjectHome");
        })
        .catch((error) => {
          setOpen(true);
          setErrorMessage("Please verify your account.", error);
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
      <div style={{ width: "50%", float: "right", marginLeft: "4%" }}>
        <br />

        <h2
          style={{
            textAlign: "center",
            marginTop: "10%",
            fontWeight: 650,
            color: "black",
            fontStyle: "revert",
          }}
        >
          Welcome!
        </h2>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={SankBaropen}
            autoHideDuration={5000}
            onClose={() => setSankBarOpen(false)}
          >
            <Alert
              onClose={() => setSankBarOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
              style={{ top: "15%", left: "50%" }}
            >
              Successfully Login..
            </Alert>
          </Snackbar>
        </Stack>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Error message
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              {ErrorMessage}
            </Typography>
          </Box>
        </Modal>

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
              fontSize: "85%",
              fontWeight: 620,
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
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginLeft: "1%",
              width: "50%",
              backgroundColor: "rgba(227, 255, 250, 0.842)",
            }}
          />
          <br />
          <span style={{ textAlign: "left", color: "red" }}>{EmailVal}</span>
          <br />
          <Box
            component="span"
            style={{ color: "red" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <label
            style={{
              float: "left",
              marginLeft: "16%",
              fontSize: "85%",
              fontWeight: 620,
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
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginLeft: "1%",
              width: "50%",
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
            style={{ width: "auto" }}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />
          <Checkbox
            style={{
              width: "auto",
              marginLeft: "auto",
              color: "rgba(52, 105, 38, 0.966)",
            }}
            onClick={() => setRememberMe(true)}
            checked={RememberMe}
          />
          <b
            style={{
              color: "black",
              marginLeft: "auto",
              fontStyle: "revert",
              fontWeight: 650,
              fontSize: "99%",
            }}
          >
            Remeber Me
          </b>
          <Link
            style={{
              marginLeft: "12%",
              color: "rgba(52, 105, 38, 0.966)",
              fontWeight: 750,
            }}
            to="/forgotpassword"
          >
            Forgot Password?
          </Link>
          <br />
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
              height: "10%",
              color: "white",
              backgroundColor: "rgba(52, 105, 38, 0.966)",
            }}
            onClick={Loginbtn}
          >
            Login
          </Button>
          <Box
            component="span"
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Box>
          <br />
          <h6
            style={{
              marginLeft: "32%",
              fontStyle: "revert",
              fontSize: "93%",
              fontWeight: 650,
            }}
          >
            Don't have an account?
            <br />
            <Link
              to="/"
              style={{
                color: "rgba(52, 105, 38, 0.966)",
                fontWeight: 750,
              }}
            >
              Sign UP
            </Link>
          </h6>
        </Box>
      </div>
    </div>
  );
}

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React, { Component } from "react";
import { CustomForm, CustomPaper } from "../styles/LoginForm";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    btnDisabled: true,
    showPassword: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value }, this.verifyInput);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ loggedIn: true });
  };

  handlePasswordVisibility = (state) => {

    this.setState({ showPassword: state });
  };

  verifyInput = () => {
    const { email, password } = this.state;
    const minLenght = 6;
    const testValidation = /\S+@\S+\.\S+/;

    const emailValidation = testValidation.test(email);
    if (emailValidation && password.length >= minLenght) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  render() {
    const { email, password, btnDisabled, showPassword } = this.state;
    return (
        <CustomForm>
            <CustomPaper elevation={3}>
                <Typography variant="h1" gutterBottom>Sign In</Typography>
                <FormControl fullWidth variant="outlined" margin="dense">
                    <InputLabel htmlFor='email'>E-mail:</InputLabel>
                    <OutlinedInput
                        type="text"
                        name="email"
                        id="email"
                        label="E-mail:"
                        variant="outlined"
                        value={email}
                        onChange={this.handleChange}
                        margin="dense"
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="dense">
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        id="outlined-adornment-password"
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={this.handleChange}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => this.handlePasswordVisibility(!showPassword)}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label='Password'
                        margin="dense"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    disabled={btnDisabled}
                    onClick={this.handleSubmit}
                    margin="dense"
                    size="large"
                    sx={{ m:2 }}
                    fullWidth
                >
                    Login
                </Button>
            </CustomPaper>
        </CustomForm>
    );
  }
}

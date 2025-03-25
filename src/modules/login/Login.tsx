import { useState } from "react";
import { Box, Container, Paper, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"; //
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import logo from "../../assets/admin-360-logo.jpg"; //
import theme from "../../theme/Theme";
import { ThemeProvider } from "@mui/material/styles";


const LoginContainer = styled(Container)({
    display:"flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center", 
    height: "100vh", 
 

  });
  
  const LoginBox = styled(Paper)({
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    backgroundColor: theme.palette.tertiary.main,
  });

const Login = () => {
    const theme = useTheme(); // ✅ Get MUI Theme
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Login:", { email, password });
      };

      const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
      };
      
    

    return(
        <ThemeProvider theme={theme}>

        <LoginContainer  maxWidth="sm">
            {/* logo image */}
             <Box mb={4}>
                  <img src={logo} alt="Logo" style={{ width: "180px", height: "auto", justifyContent: "center", alignItems: "center",}} />  
             </Box>
             {/* Login card */}
            <LoginBox elevation={2}>
                    <Typography  variant="h5" gutterBottom>
                        Login
                    </Typography>
                        <form onSubmit={handleSubmit}>  
                            <Box mb={2}>
                                <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
                                    Username
                                </Typography>
                                <TextField
                                fullWidth
                                // label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EmailIcon sx={{ color: theme.palette.secondary.main }}/>
                                      </InputAdornment>
                                    ),
                                  }}
                                  InputLabelProps={{
                                    required: false, // 🔹 Removes asterisk (*) from the label
                                    // shrink: false, // Ensures label doesn't overlap placeholder
                                  }}
                                sx={{
                                    "& label": { color: "Black" }, // Default label color
                                    "& label.Mui-focused": { color: "black" }, // Label stays black on focus
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": { borderColor: "gray" }, // Default border color
                                      "&:hover fieldset": { borderColor: theme.palette.secondary.main }, // On hover
                                      "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main }, // On focus
                                    },

                                    "& .MuiInputBase-input::placeholder": {
                                        opacity: 0.5, // Placeholder is visible initially
                                        transition: "opacity 0.3s",
                                        },
                                        "& .MuiInputBase-input:focus::placeholder": {
                                        opacity: 0, // Placeholder disappears on focus
                                        },
                                }}
                                />
                            </Box>
                            <Box mb={2}>
                                <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showPassword ? "text" : "password"} // Toggle between text and password
                                    variant="outlined"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <LockIcon sx={{ color: theme.palette.secondary.main }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff
                                            sx={{ color: theme.palette.secondary.main, opacity: 0.9 }} /> : <Visibility 
                                            sx={{ color: theme.palette.secondary.main, opacity: 0.5 }}/>}
                                        </IconButton>
                                        </InputAdornment>
                                    ),
                                    }}
                                    InputLabelProps={{
                                    required: false, // 🔹 Removes asterisk (*) from the label
                                    }}
                                    sx={{
                                    "& label": { color: "black" }, // Default label color
                                    "& label.Mui-focused": { color: "black" }, // Label stays black on focus
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" }, // Default border color
                                        "&:hover fieldset": { borderColor: theme.palette.secondary.main }, // On hover
                                        "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main }, // On focus
                                    },
                                    "& .MuiInputBase-input::placeholder": {
                                        opacity: 0.5, // Placeholder is visible initially
                                        transition: "opacity 0.3s",
                                    },
                                    "& .MuiInputBase-input:focus::placeholder": {
                                        opacity: 0, // Placeholder disappears on focus
                                    },
                                    }}
                                />
                                </Box>

                            {/* submit button */}
                            <Button 
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    color: "black", // Text remains black
                                    backgroundColor: theme.palette.primary.main, // Primary background color from theme
                                    "&:hover": {
                                        color:"white",
                                      backgroundColor: theme.palette.secondary.main, // Apply hover color directly
                                    },
                                }}
                                >             
                                 Login
                            </Button>
                        </form>
            </LoginBox>

        </LoginContainer>
        </ThemeProvider>

    )
}

export default Login;

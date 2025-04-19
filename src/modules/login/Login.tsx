import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
    Visibility,
    VisibilityOff,
    AccountCircle as UserIcon,
    Lock as LockIcon,
} from "@mui/icons-material";
import logo from "../../assets/admin-360-logo.jpg";
import Mainlogo from "../../assets/admin-360-logo.png";
import mainlogonobg from "../../assets/admin-360-logo-nobg.png";
import theme from "../../theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import { departmentEmployeesDetails } from "../../data/departmentEmployeesDetails";

// Extract unique department names from the data
const departmentNames = Array.from(
    new Set(departmentEmployeesDetails.map((dept) => dept.department))
);

const LoginContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
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
    marginBottom:"32px",
});

const Login = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // const handleLogin = (event: React.FormEvent) => {
    //     event.preventDefault();

    //     // Admin login
    //     if (username === "admin" && password === "admin") {
    //         localStorage.setItem("token", "admin_token");
    //         navigate("/mainDashboard");
    //     }
    //     // Department login
    //     else if (username === password && departmentNames.includes(username)) {
    //         localStorage.setItem("token", "user_token");
    //         navigate(`/departmentDashboard/${username}`);
    //     }
    //     // Invalid login
    //     else {
    //         alert("Invalid username or password!");
    //     }
    // };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
    
        // Admin login
        if (username === "admin" && password === "admin") {
            localStorage.setItem("token", "admin_token");
            navigate("/mainDashboard");
        }
        // Department login
        else if (username === password && departmentNames.includes(username)) {
            localStorage.setItem("token", "user_token");
            navigate(`/departmentDashboard/${username}`);
        }
        // Member login
        else {
            // Find member by name and password match
            const member = departmentEmployeesDetails.find(
                (member) => member.name === username && member.name === password
            );
            if (member) {
                localStorage.setItem("token", "member_token");
                localStorage.setItem("memberName", member.name);
                navigate(`/memberDashboard/${member.name}`);
            } else {
                alert("Invalid username or password!");
            }
        }
    };
    

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <ThemeProvider theme={theme}>
            <LoginContainer maxWidth="sm" sx={{ overflow: "auto", background:"#fde9b6", height:"auto", }}>
                <Box mb={2} mt={2}>
                    <img src={mainlogonobg} alt="Logo" style={{ width: "300px", height: "auto", }} />
                </Box>

                <LoginBox elevation={2} sx={{background:"#fff",}}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <Box mb={2}>
                            <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
                                Username
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <UserIcon sx={{ color: "#005500" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" },
                                        "&:hover fieldset": { borderColor: "#005500" },
                                        "&.Mui-focused fieldset": { borderColor: "#005500" },
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
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: "#005500" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {showPassword ? (
                                                    <VisibilityOff sx={{ color: "#005500", opacity: 0.9 }} />
                                                ) : (
                                                    <Visibility sx={{ color: "#005500", opacity: 0.5 }} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" },
                                        "&:hover fieldset": { borderColor: "#005500" },
                                        "&.Mui-focused fieldset": { borderColor: "#005500" },
                                    },
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                color: "black",
                                backgroundColor: "#ffc022",
                                "&:hover": { color: "black", backgroundColor: "#d1e7dd" },
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </LoginBox>
            </LoginContainer>
        </ThemeProvider>
    );
};

export default Login;



/// codes with login //////////

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Container, Paper, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles";
// import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
// import logo from "../../assets/admin-360-logo.jpg";
// import theme from "../../theme/Theme";
// import { ThemeProvider } from "@mui/material/styles";

// const LoginContainer = styled(Container)({
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
// });

// const LoginBox = styled(Paper)({
//     padding: "30px",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//     backgroundColor: theme.palette.tertiary.main,
// });

// const Login = () => {
//     const navigate = useNavigate(); // ✅ Hook for redirection
//     const theme = useTheme(); 
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();

//         // ✅ Store a dummy token (For now, no validation)
//         localStorage.setItem("token", "dummy_token");

//         // ✅ Redirect to Main Dashboard
//         navigate("/");
//     };

//     const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <LoginContainer maxWidth="sm">
//                 <Box mb={4}>
//                     <img src={logo} alt="Logo" style={{ width: "180px", height: "auto" }} />
//                 </Box>

//                 <LoginBox elevation={2}>
//                     <Typography variant="h5" gutterBottom>
//                         Login
//                     </Typography>
//                     <form onSubmit={handleSubmit}>
//                         <Box mb={2}>
//                             <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                                 Username
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Enter any email"
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <EmailIcon sx={{ color: theme.palette.secondary.main }} />
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root": {
//                                         "& fieldset": { borderColor: "gray" },
//                                         "&:hover fieldset": { borderColor: theme.palette.secondary.main },
//                                         "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main },
//                                     },
//                                 }}
//                             />
//                         </Box>

//                         <Box mb={2}>
//                             <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                                 Password
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 type={showPassword ? "text" : "password"}
//                                 variant="outlined"
//                                 value={password}
//                                 placeholder="Enter any password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <LockIcon sx={{ color: theme.palette.secondary.main }} />
//                                         </InputAdornment>
//                                     ),
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton onClick={handleTogglePassword} edge="end">
//                                                 {showPassword ? (
//                                                     <VisibilityOff sx={{ color: theme.palette.secondary.main, opacity: 0.9 }} />
//                                                 ) : (
//                                                     <Visibility sx={{ color: theme.palette.secondary.main, opacity: 0.5 }} />
//                                                 )}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                                 sx={{
//                                     "& .MuiOutlinedInput-root": {
//                                         "& fieldset": { borderColor: "gray" },
//                                         "&:hover fieldset": { borderColor: theme.palette.secondary.main },
//                                         "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main },
//                                     },
//                                 }}
//                             />
//                         </Box>

//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             sx={{
//                                 color: "black",
//                                 backgroundColor: theme.palette.primary.main,
//                                 "&:hover": { color: "white", backgroundColor: theme.palette.secondary.main },
//                             }}
//                         >
//                             Login
//                         </Button>
//                     </form>
//                 </LoginBox>
//             </LoginContainer>
//         </ThemeProvider>
//     );
// };

// export default Login;


/// code without logins ////

// import { useState } from "react";
// import { Box, Container, Paper, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles"; //
// import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
// import logo from "../../assets/admin-360-logo.jpg"; //
// import theme from "../../theme/Theme";
// import { ThemeProvider } from "@mui/material/styles";


// const LoginContainer = styled(Container)({
//     display:"flex",
//     flexDirection:"column",
//     justifyContent: "center",
//     alignItems: "center", 
//     height: "100vh", 


//   });

//   const LoginBox = styled(Paper)({
//     padding: "30px",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//     backgroundColor: theme.palette.tertiary.main,
//   });

// const Login = () => {
//     const theme = useTheme(); // ✅ Get MUI Theme
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         console.log("Login:", { email, password });
//       };

//       const handleTogglePassword = () => {
//         setShowPassword((prev) => !prev);
//       };



//     return(
//         <ThemeProvider theme={theme}>

//         <LoginContainer  maxWidth="sm">
//             {/* logo image */}
//              <Box mb={4}>
//                   <img src={logo} alt="Logo" style={{ width: "180px", height: "auto", justifyContent: "center", alignItems: "center",}} />  
//              </Box>
//              {/* Login card */}
//             <LoginBox elevation={2}>
//                     <Typography  variant="h5" gutterBottom>
//                         Login
//                     </Typography>
//                         <form onSubmit={handleSubmit}>  
//                             <Box mb={2}>
//                                 <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                                     Username
//                                 </Typography>
//                                 <TextField
//                                 fullWidth
//                                 // label="Email"
//                                 variant="outlined"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Enter your email"
//                                 required
//                                 InputProps={{
//                                     startAdornment: (
//                                       <InputAdornment position="start">
//                                         <EmailIcon sx={{ color: theme.palette.secondary.main }}/>
//                                       </InputAdornment>
//                                     ),
//                                   }}
//                                   InputLabelProps={{
//                                     required: false, // 🔹 Removes asterisk (*) from the label
//                                     // shrink: false, // Ensures label doesn't overlap placeholder
//                                   }}
//                                 sx={{
//                                     "& label": { color: "Black" }, // Default label color
//                                     "& label.Mui-focused": { color: "black" }, // Label stays black on focus
//                                     "& .MuiOutlinedInput-root": {
//                                       "& fieldset": { borderColor: "gray" }, // Default border color
//                                       "&:hover fieldset": { borderColor: theme.palette.secondary.main }, // On hover
//                                       "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main }, // On focus
//                                     },

//                                     "& .MuiInputBase-input::placeholder": {
//                                         opacity: 0.5, // Placeholder is visible initially
//                                         transition: "opacity 0.3s",
//                                         },
//                                         "& .MuiInputBase-input:focus::placeholder": {
//                                         opacity: 0, // Placeholder disappears on focus
//                                         },
//                                 }}
//                                 />
//                             </Box>
//                             <Box mb={2}>
//                                 <Typography variant="body1" sx={{ textAlign: "left", mb: 1 }}>
//                                     Password
//                                 </Typography>
//                                 <TextField
//                                     fullWidth
//                                     type={showPassword ? "text" : "password"} // Toggle between text and password
//                                     variant="outlined"
//                                     value={password}
//                                     placeholder="Enter your password"
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                         <LockIcon sx={{ color: theme.palette.secondary.main }} />
//                                         </InputAdornment>
//                                     ),
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                         <IconButton onClick={handleTogglePassword} edge="end">
//                                             {showPassword ? <VisibilityOff
//                                             sx={{ color: theme.palette.secondary.main, opacity: 0.9 }} /> : <Visibility 
//                                             sx={{ color: theme.palette.secondary.main, opacity: 0.5 }}/>}
//                                         </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                     }}
//                                     InputLabelProps={{
//                                     required: false, // 🔹 Removes asterisk (*) from the label
//                                     }}
//                                     sx={{
//                                     "& label": { color: "black" }, // Default label color
//                                     "& label.Mui-focused": { color: "black" }, // Label stays black on focus
//                                     "& .MuiOutlinedInput-root": {
//                                         "& fieldset": { borderColor: "gray" }, // Default border color
//                                         "&:hover fieldset": { borderColor: theme.palette.secondary.main }, // On hover
//                                         "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main }, // On focus
//                                     },
//                                     "& .MuiInputBase-input::placeholder": {
//                                         opacity: 0.5, // Placeholder is visible initially
//                                         transition: "opacity 0.3s",
//                                     },
//                                     "& .MuiInputBase-input:focus::placeholder": {
//                                         opacity: 0, // Placeholder disappears on focus
//                                     },
//                                     }}
//                                 />
//                                 </Box>

//                             {/* submit button */}
//                             <Button 
//                                 type="submit"
//                                 variant="contained"
//                                 color="primary"
//                                 fullWidth
//                                 sx={{
//                                     color: "black", // Text remains black
//                                     backgroundColor: theme.palette.primary.main, // Primary background color from theme
//                                     "&:hover": {
//                                         color:"white",
//                                       backgroundColor: theme.palette.secondary.main, // Apply hover color directly
//                                     },
//                                 }}
//                                 >             
//                                  Login
//                             </Button>
//                         </form>
//             </LoginBox>

//         </LoginContainer>
//         </ThemeProvider>

//     )
// }

// export default Login;

import React, { useState } from "react";
import { Box, TextField, IconButton, Typography, Paper, List, ListItem, Fab } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

const Chatbox: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage("");
        }
    };

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Fab 
                color="primary" 
                aria-label="chat" 
                onClick={toggleChatbox}
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    width: 100,
                    height: 100,
                }}
            >
                <ChatIcon sx={{
                    width: 42,
                    height: 42,
                }}/>
            </Fab>

            {isOpen && (
                <Paper 
                    elevation={3} 
                    sx={{
                        position: "fixed",
                        bottom: 80,
                        right: 20,
                        width: 300,
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        zIndex: 1000,
                        p: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>Chatbox</Typography>
                    <List sx={{ overflowY: "auto", flexGrow: 1 }}>
                        {messages.map((msg, index) => (
                            <ListItem key={index}>{msg}</ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <IconButton color="primary" onClick={handleSendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default Chatbox;

import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
    process.env.NODE_ENV === "production" ? window.location.href : "http://localhost:8000";

export const socket = io(URL);
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserwithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "./firebase/auth"
import { auth} from "./firebase/firebaseConfig"
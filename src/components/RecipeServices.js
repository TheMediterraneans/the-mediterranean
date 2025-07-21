import { database } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { ref, get, onValue } from "firebase/database";

export function getRecipeList() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const recipesRef = ref(database, 'recipes');
            const snapshot = await get(recipesRef);
            setRecipes(snapshot.val());
    };
    fetchData();
    }, []);
}
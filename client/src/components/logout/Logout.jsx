import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {

        //TODO add the server and do await fetch
        console.log("User logged out");
        navigate('/');

    }, [navigate]);

    return null
}
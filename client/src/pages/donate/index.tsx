import { useEffect } from "react";

export default function DonatePage() {
    useEffect(() => {
        document.title = "واژه | پشتیبانی";
    }, []);
    
    return "hello"
}
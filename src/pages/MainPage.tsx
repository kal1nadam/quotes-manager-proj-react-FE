import { useEffect, useState } from "react"
import { getQuotes } from "../api/api";
import { Container } from "@mantine/core";
import { GetQuotesResponse, QuoteModel } from "../api/DTOs";
import QuoteCard from "../components/QuoteCard";
import { useAuth } from "../context/AuthContext";


const MainPage = () => {
    const [quotes, setQuotes] = useState<QuoteModel[]>([]);


    useEffect(()=>{
        const fetchQuotes = async () => {
            const response = await getQuotes();
            const data: GetQuotesResponse = response.data;
            setQuotes(data.quotes);
        };
        fetchQuotes();
    }, []);

    // Edit and Delete buttons will be shown only if the user is an admin
    const { isAdmin } = useAuth();

    return (
        <Container>
            <h1>Quotes</h1>
            {quotes.map((quote) => (
                <QuoteCard
                    key={quote.id}
                    quote={quote}
                    setQuotes={setQuotes}
                    quotes={quotes}
                    canManage={isAdmin}
                    />
                ))}
                
        </Container>
    )

}

export default MainPage;
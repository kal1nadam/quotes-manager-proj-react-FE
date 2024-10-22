import { useEffect, useState } from "react";
import { CreateQuoteResponse, GetQuotesResponse, QuoteModel } from "../api/DTOs";
import { createQuote, getUserQuotes } from "../api/api";
import { Button, Container, Group } from "@mantine/core";
import QuoteCard from "../components/QuoteCard";
import AddQuoteModal from "../components/AddQuoteModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuoteTagType } from "../enums/QuoteTagType";


const MyQuotesPage = () => {
    const [quotes, setQuotes] = useState<QuoteModel[]>([]);
    const [addQuoteModalOpened, setAddQuoteModalOpened] = useState(false);

    const { isLoggedIn } = useAuth();  // Get the isLoggedIn state
    const navigate = useNavigate();    // Access the navigate function for redirection

    useEffect(()=> {
        const fetchUserQuotes = async () => {
            const userId = localStorage.getItem('userId');
            if(userId){
                const response = await getUserQuotes(userId);
                const data: GetQuotesResponse = response.data;
                setQuotes(data.quotes);
            }
        };
        fetchUserQuotes();
    }, []);

    // Redirect to home ("/") if the user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
        navigate('/');  // Redirect to the home page
        }
    }, [isLoggedIn, navigate]);  // Effect runs when isLoggedIn or navigate changes



    const handleAddQuote = async (quote:{text:string; author: string; tags: QuoteTagType[]}) =>{
        try{
            const response = await createQuote(quote);
            const data: CreateQuoteResponse = response.data;
            setQuotes([...quotes, data.quote]);
        }catch (error){
            console.error('Failed to create quote:', error);
        }
    }
    

    return (
        <Container>
            <h1>My Quotes</h1>
            <Group>
                <Button onClick={() => {window.history.back()}} mt="md">Back</Button>

                <Button onClick={() => setAddQuoteModalOpened(true)} mt="md">
                    Add Quote
                </Button>
            </Group>
            {quotes.map((quote) => (
                <QuoteCard
                    key={quote.id}
                    quote={quote}
                    setQuotes={setQuotes}
                    quotes={quotes}
                    canManage={true}
                    />
            ))}
            

            <AddQuoteModal
                opened={addQuoteModalOpened}
                onClose={() => setAddQuoteModalOpened(false)}
                onAddQuote={handleAddQuote}
            />
        </Container>
    )
}

export default MyQuotesPage;
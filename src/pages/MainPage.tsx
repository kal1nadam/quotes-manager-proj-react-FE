import { useEffect, useState } from "react"
import { getQuotes } from "../api/api";
import { Container, MultiSelect } from "@mantine/core";
import { GetQuotesResponse, QuoteModel } from "../api/DTOs";
import QuoteCard from "../components/QuoteCard";
import { useAuth } from "../context/AuthContext";
import { QuoteTagLabels, QuoteTagType } from "../enums/QuoteTagType";


const MainPage = () => {
    const [quotes, setQuotes] = useState<QuoteModel[]>([]);
    const [displayedQuotes, setDisplayedQuotes] = useState<QuoteModel[]>([]);
    const [selectedTagFilters, setSelectedTagFilters] = useState<QuoteTagType[]>([]);


    const fetchQuotes = async () => {
        const response = await getQuotes();
        const data: GetQuotesResponse = response.data;
        setQuotes(data.quotes);
        setDisplayedQuotes(data.quotes);
    };

    useEffect(()=>{
        fetchQuotes();
    }, []);

    // Filter
    useEffect(() => {
        // console.log(selectedTagFilters);
        const filteredQuotes = quotes.filter((quote) => {
            return selectedTagFilters.every((tag) => quote.tags.includes(tag));
        });
        setDisplayedQuotes(filteredQuotes);
    }, [selectedTagFilters, quotes]);

    // Edit and Delete buttons will be shown only if the user is an admin
    const { isAdmin } = useAuth();

    return (
        <Container>
            <h1>Quotes</h1>
            <MultiSelect
            label="Tag Filters"
            mb={10}
            data={Object.values(QuoteTagType).filter(v => typeof v === 'number').map((value) => ({
                value: value.toString(),  // use string value for MultiSelect
                label: QuoteTagLabels[value as QuoteTagType],  // display string value
            }))}
            value={selectedTagFilters.map((t) => t.toString())}
            onChange={(values) => setSelectedTagFilters(values.map((v) => parseInt(v)))}
            placeholder="Select tags"
            searchable
            clearable
        />
            {displayedQuotes.map((quote) => (
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
// components/QuoteCard.tsx
import React from 'react';
import { Card, Text, Group, Badge, Button } from '@mantine/core';
import { QuoteModel } from '../api/DTOs';
import { deleteQuote, updateQuote } from '../api/api';
import EditQuoteModal from './EditQuoteModal';
import { QuoteTagType } from '../enums/QuoteTagType';

interface QuoteCardProps {
  quote: QuoteModel;
  canManage: boolean;
  setQuotes: React.Dispatch<React.SetStateAction<QuoteModel[]>>;
  quotes: QuoteModel[];
}



const QuoteCard: React.FC<QuoteCardProps> = ({quote, canManage, setQuotes, quotes}) => {

  const [editQuoteModalOpen, setEditQuoteModalOpen] = React.useState(false);

  const handleDelete = async (quoteId: string) => {
    await deleteQuote(quoteId);
    setQuotes(quotes.filter((q) => q.id !== quoteId));
  };
  
  const handleEditQuote = async (quote: { id: string; text: string; author: string; tags: QuoteTagType[] }) => {
    try {
      await updateQuote(quote.id, { text: quote.text, author: quote.author, tags: quote.tags });
      setQuotes(quotes.map(q => (q.id === quote.id ? { ...q, ...quote } : q)));  // Update the edited quote
    } catch (error) {
      console.error('Failed to edit quote', error);
    }
  };

  return (
    <>
        <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
          <Text size="lg">{quote.text}</Text>
          <Text size="sm" color="dimmed">- {quote.author}</Text>
          
          {/* Rendering tags */}
          <Group style={{ marginTop: '10px' }}>
            {quote.tags.map((tag, index) => (
                <Badge key={index} color="blue" variant="light">
                {QuoteTagType[tag]}
                </Badge>
            ))}
          </Group>

          {/* Edit and Delete Buttons only if logged in*/}
          {canManage && (
            <Group style={{ marginTop: '10px' }}>
              <Button size="xs" variant="light" onClick={() => {setEditQuoteModalOpen(true)}}>
                Edit
              </Button>
              <Button size="xs" variant="light" color="red" onClick={() => handleDelete(quote.id)}>
                Delete
              </Button>
            </Group>
          )}
       </Card>


        {editQuoteModalOpen && (
            <EditQuoteModal
            opened={editQuoteModalOpen}
            onClose={() => setEditQuoteModalOpen(false)}
            onEditQuote={handleEditQuote}
            quote={quote}  // Pass the selected quote for editing
            />
        )}
    </>

  );
};

export default QuoteCard;

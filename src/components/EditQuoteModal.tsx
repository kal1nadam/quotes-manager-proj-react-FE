import { Button, Modal, MultiSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { QuoteTagLabels, QuoteTagType } from "../enums/QuoteTagType";
import { QuoteModel } from "../api/DTOs";


interface EditQuoteModalProps {
    quote: QuoteModel;
    opened: boolean;
    onClose: () => void;
    onEditQuote: (quote: { id: string; text: string; author: string; tags: QuoteTagType[] }) => void;
  }


  const EditQuoteModal: React.FC<EditQuoteModalProps> = ({quote, opened, onClose, onEditQuote }) => {

    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedTags, setSelectedTags] = useState<QuoteTagType[]>([]);

    useEffect(() => {
        setText(quote.text);
        setAuthor(quote.author);
        setSelectedTags(quote.tags);
    }, [quote]);

    const handleEditQuote = () => {
        if(text && author){
            onEditQuote({id:quote.id, text, author, tags: selectedTags});
            onClose();
        }else{
            alert('Please fill text and author fields');
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Edit quote">
        <TextInput label="Text" value={text} onChange={(e) => setText(e.target.value)} required />
        <TextInput label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <MultiSelect
            label="Tags"
            data={Object.values(QuoteTagType).filter(v => typeof v === 'number').map((value) => ({
                value: value.toString(),  // use string value for MultiSelect
                label: QuoteTagLabels[value as QuoteTagType],  // display string value
            }))}
            value={selectedTags.map((t) => t.toString())}
            onChange={(values) => setSelectedTags(values.map((v) => parseInt(v)))}
            placeholder="Select tags"
            searchable
            clearable
            required
        />
        <Button fullWidth mt="md" onClick={handleEditQuote}>
        Save changes
      </Button>
    </Modal>
    )

  }

  export default EditQuoteModal;
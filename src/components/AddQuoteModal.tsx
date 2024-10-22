import { Button, Modal, MultiSelect, TextInput } from "@mantine/core";
import { useState } from "react";
import { QuoteTagLabels, QuoteTagType } from "../enums/QuoteTagType";


interface AddQuoteModalProps {
    opened: boolean;
    onClose: () => void;
    onAddQuote: (quote: { text: string; author: string; tags: QuoteTagType[] }) => void;
  }


  const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ opened, onClose, onAddQuote }) => {

    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedTags, setSelectedTags] = useState<QuoteTagType[]>([]);

    const handleAddQuote = () => {
        if(text && author){
            onAddQuote({text, author, tags: selectedTags});
            onClose();
        }else{
            alert('Please fill text and author fields');
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Add a New Quote">
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
        <Button fullWidth mt="md" onClick={handleAddQuote}>
        Add Quote
      </Button>
    </Modal>
    )

  }

  export default AddQuoteModal;
export enum QuoteTagType{
    Love = 1,
    Life = 2,
    Motivation = 3,
    Friendship = 4,
    Success = 5,
    Wisdom = 6,
    Happiness = 7,
    Inspirational = 8,
    Positive = 9,
    Leadership = 10
}

// Mapping enum values to display string values
export const QuoteTagLabels: Record<QuoteTagType, string> = {
    [QuoteTagType.Love]: 'Love',
    [QuoteTagType.Life]: 'Life',
    [QuoteTagType.Motivation]: 'Motivation',
    [QuoteTagType.Friendship]: 'Friendship',
    [QuoteTagType.Success]: 'Success',
    [QuoteTagType.Wisdom]: 'Wisdom',
    [QuoteTagType.Happiness]: 'Happiness',
    [QuoteTagType.Inspirational]: 'Inspirational',
    [QuoteTagType.Positive]: 'Positive',
    [QuoteTagType.Leadership]: 'Leadership'
  };
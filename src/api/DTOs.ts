import { QuoteTagType } from "../enums/QuoteTagType";

export interface QuoteModel{
    id: string;
    text: string;
    author: string;
    tags: QuoteTagType[];
}

export interface GetQuotesResponse{
    quotes: QuoteModel[];
}

export interface UserTokensModel{
    accessToken: string;
    refreshToken: string;
}

export interface Token{
    sub: string;
    email: string;
    exp: number;
    iss: string;
    aud: string;
    isAdmin: string;
}

export interface GetAccessTokenResponse{
    accessToken: string;
}

export interface CreateQuoteResponse{
    quote: QuoteModel;
}
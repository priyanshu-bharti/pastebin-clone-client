type Snippet = {
    pasteId: string;
    title: string;
    data: string;
    isAnonymous: boolean;
    expiresOn: number;
    userName?: string;
};

export type User = {
    id: string;
    fullName: string;
    imageUrl: string;
    username: string;
};

export default Snippet;

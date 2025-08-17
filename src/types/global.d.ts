export interface Work {
    slug: string;
    title: string;
    isClient: boolean;
    date: string;
    link?: string;
    color: {
        hex: string;
    };
    color1: {
        hex: string;
    };
    thumbnail: {
        webp?: string;
        url: string;
        height: number;
        width: number;
    };
    credits?: Array<{
        title: string;
        name: string;
    }>;
    body?: {
        html: string;
    };
    images?: Array<{
        webp?: string;
        url: string;
        height: number;
        width: number;
    }>;
    next?: {
        slug: string;
        title: string;
        color: {
            hex: string;
        };
        color1: {
            hex: string;
        };
    };
}

export interface WorksResponse {
    works: Work[];
}

export interface WorkResponse {
    work: Work;
}
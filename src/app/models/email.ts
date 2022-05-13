export interface IEmail {
    id: string;
    parentId?: string;
    address: string;
    name?: string;
    type: string;
    otherLabel?: string;
    source?: string;
    dnmm?: string;
    dflt?: boolean;
    status?: string;
    bounce?: boolean;
}

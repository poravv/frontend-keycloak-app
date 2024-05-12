/**
 * Domain Model
 */
export class CredentialModel {
    type?: string;
    temporary?: boolean;
    value?: string;

    constructor(init?: Partial<any>){
        Object.assign(this, init);
    }
  
};

/**
 * Repository Model
 */
export interface CredentialRepositoryModel {
    type?: string;
    temporary?: boolean;
    value?: string;
};
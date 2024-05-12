
/**
 * Domain Model
 */
export class UserAttributesModel {
    cableOperadorInfo?: string[];

    constructor(init?: Partial<any>){
        Object.assign(this, init);
    }
  
};

/**
 * Repository Model
 */
export interface UserAttributesRepositoryModel {
    cableOperadorInfo?: string[];
};
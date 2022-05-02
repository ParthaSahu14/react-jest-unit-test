import { Space } from "../model/Model";


export class DataService{

    public async getSpaces(): Promise<Space[]>{
        const result: Space[] = [];
        result.push({
            location: 'Paris 0',
            name: 'Best Location 0',
            spaceId: '123'
        },
        {
            location: 'Paris 1',
            name: 'Best Location 1',
            spaceId: '1234'
        },
        {
            location: 'Paris 2',
            name: 'Best Location 2',
            spaceId: '12345'
        })
        return result;
    }

    public async reserveSpace(spaceId: string):Promise<string | undefined>{
        if(spaceId === '1234'){
            return ('5555');
        }else{
            return undefined;
        }
    }
}
import {DiscoverEntriesParams} from "./discover-entries-params";

export class DiscoverEntriesConfig
{
    readonly basePath: string = '';
    readonly entriesDirName: string = 'src';
    readonly entryFilename: string = 'index';
    readonly entryExtensions: string[] = ['js'];

    constructor(params: DiscoverEntriesParams = {})
    {
        Object.assign(this, params);
    }

    get entriesPath(): string
    {
        return [this.basePath, this.entriesDirName].join('/');
    }

}
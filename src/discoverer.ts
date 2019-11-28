import {sync as findFilesWithGlob} from 'glob';
import {existsSync as isFileExists} from 'fs';
import {dirname} from 'path';
import {DiscoverEntriesConfig} from './discover-entries-config';

export class EntriesDiscoverer
{
    private params: DiscoverEntriesConfig;

    discoverEntries(params: DiscoverEntriesConfig): Entries
    {
        this.params = params;
        this.validateConfig();

        return this.discoverEntriesInPath(this.params.basePath);
    }

    private discoverEntriesInPath(path: string): Entries
    {
        let entries = {};
        const entriesGlob = this.getEntriesGlob(path);
        findFilesWithGlob(entriesGlob).forEach(absoluteFilePath => {
            const [baseDir, entryPath] = absoluteFilePath.split(`${this.params.entriesDirName}/`);
            const entryName = dirname(entryPath);
            entries[entryName] = absoluteFilePath;
        });

        return entries;
    }

    private getEntriesGlob(basePath: string): string
    {
        const {entriesDirName, entryFilename, entryExtensions} = this.params;
        return `${basePath}/${entriesDirName}/**/${entryFilename}.+(${ entryExtensions.join('|') })`;
    }

    private validateConfig(): void
    {
        if (!isFileExists(this.params.entriesPath)) {
            throw new EntriesDirDoesntExist(this.params.entriesPath);
        }
    }
}

export type Entries = Record<string, string>

export class EntriesDirDoesntExist extends Error
{
    constructor(dirName: string) {
        super(`Entries dir ${dirName} does not exists`);
    }
}

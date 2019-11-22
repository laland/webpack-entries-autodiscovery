import {DiscoverEntriesParams} from "./discover-entries-params";

describe(DiscoverEntriesParams.name, () => {
    it('has defaults', function () {
        const params = new DiscoverEntriesParams();

        expect(params.basePath).toBe('');
        expect(params.entriesDirName).toBe('src');
        expect(params.entryFilename).toBe('index');
        expect(params.entryExtensions).toStrictEqual(['js']);
    });

    it('assepts params hash in constructor', function () {
        const params = new DiscoverEntriesParams({
            basePath: 'fixtures',
            entriesDirName: 'assets',
            entryFilename: 'entry',
            entryExtensions: ['js', 'ts'],
        });

        expect(params.basePath).toBe('fixtures');
        expect(params.entriesDirName).toBe('assets');
        expect(params.entryFilename).toBe('entry');
        expect(params.entryExtensions).toStrictEqual(['js', 'ts']);
    });

    it('returns entriesPath when baseParth is set', function () {
        expect(new DiscoverEntriesParams({basePath: 'fixtures'}).entriesPath).toBe('fixtures/src')
    });
});
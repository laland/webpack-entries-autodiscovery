import {ParamsResolver} from "./params-resolver";
import {DiscoverEntriesParams} from "./discover-entries-params";
import mockFs from "mock-fs";

describe(ParamsResolver.name, () => {
    afterAll(() => mockFs.restore());

    it('returns default params when base path have no package.json', () => {
        expect(new ParamsResolver().resolveParamsForPath('')).toStrictEqual(new DiscoverEntriesParams())
    });

    it('returns params from package.json when base path have it', () => {
        mockFs({
            'fixture': {
                'package.json': `
                {
                    "webpackEntriesAutodiscovery": {
                        "entryFilename": "entry",
                        "entriesDirName": "assets/features",
                        "entryExtensions": ["js", "ts"]
                    }
                }
                `
            }
        });
        expect(new ParamsResolver().resolveParamsForPath('fixture')).toStrictEqual(
            new DiscoverEntriesParams({
                basePath: 'fixture',
                entryFilename: 'entry',
                entriesDirName: 'assets/features',
                entryExtensions: ['js', 'ts']
            })
        )
    });
});
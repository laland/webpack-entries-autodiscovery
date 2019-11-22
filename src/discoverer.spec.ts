import mockFs from "mock-fs";
import {Entries, EntriesDirDoesntExist, EntriesDiscoverer} from "./discoverer";
import {DiscoverEntriesParams} from "./discover-entries-params";

describe(EntriesDiscoverer.name, () => {
    afterAll(() => mockFs.restore());

    it('throws when entries dir doesnt exists', () => {
        expect(() => discoverEntries({basePath: 'nosuchdir'})).toThrow(new EntriesDirDoesntExist("nosuchdir/src"));
    });

    it('discovers one entry', () => {
        mockFs({
            'fixture': {
                'src': {
                    'cool-feature': {
                        'index.js': 'cosole.log("win")'
                    }
                }
            }
        });
        expect(discoverEntries({basePath: 'fixture'})).toStrictEqual({'cool-feature': 'fixture/src/cool-feature/index.js'})
    });

    it('discovers multiple entries', () => {
        mockFs({
            'fixture': {
                'src': {
                    'cool-feature': {
                        'index.js': 'cosole.log("win")'
                    },
                    'another-cool-feature': {
                        'index.js': 'cosole.log("win")'
                    }
                }
            }
        });
        expect(discoverEntries({basePath: 'fixture'})).toStrictEqual({
            'cool-feature': 'fixture/src/cool-feature/index.js',
            'another-cool-feature': 'fixture/src/another-cool-feature/index.js',
        })
    });

    it('discovers nested entries', () => {
        mockFs({
            'fixture': {
                'src': {
                    'cool-feature': {
                        'index.js': 'cosole.log("win")'
                    },
                    'some-dir': {
                        'another-cool-feature': {
                            'index.js': 'cosole.log("win")'
                        }
                    }
                }
            }
        });
        expect(discoverEntries({basePath: 'fixture'})).toStrictEqual({
            'cool-feature': 'fixture/src/cool-feature/index.js',
            'some-dir/another-cool-feature': 'fixture/src/some-dir/another-cool-feature/index.js',
        })
    });

    it('discovers entries with different extensions', () => {
        mockFs({
            'fixture': {
                'src': {
                    'cool-feature': {
                        'index.js': 'cosole.log("win")'
                    },
                    'another-cool-feature': {
                        'index.ts': 'cosole.log("win")'
                    }
                }
            }
        });
        expect(discoverEntries({basePath: 'fixture', entryExtensions: ['js', 'ts']})).toStrictEqual({
            'cool-feature': 'fixture/src/cool-feature/index.js',
            'another-cool-feature': 'fixture/src/another-cool-feature/index.ts',
        })
    });

    it('discovers entries custom entry filename, entries dir and extensions', () => {
        mockFs({
            'fixture': {
                'package.json': `
                {
                    "webpackEntriesAutodiscovery": {
                        "entriesDirName": "assets/features",
                        "entryFilename": "entry",
                        "entryExtensions": ["js", "ts"]
                    }
                }
                `,
                'assets': {
                    'features': {
                        'cool-feature': {
                            'entry.js': 'cosole.log("win")'
                        },
                        'some-dir': {
                            'another-cool-feature': {
                                'entry.ts': 'cosole.log("win")'
                            }
                        }
                    }
                }
            }
        });

        const params = <Partial<DiscoverEntriesParams>>{
            basePath: 'fixture',
            entryFilename: 'entry',
            entriesDirName: 'assets/features',
            entryExtensions: ['js', 'ts']
        };

        expect(discoverEntries(params)).toStrictEqual({
            'cool-feature': 'fixture/assets/features/cool-feature/entry.js',
            'some-dir/another-cool-feature': 'fixture/assets/features/some-dir/another-cool-feature/entry.ts',
        })
    });
});

function discoverEntries(params: Partial<DiscoverEntriesParams>): Entries {
    return new EntriesDiscoverer().discoverEntries(new DiscoverEntriesParams(params));
}
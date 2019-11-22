import {DiscoverEntriesParams} from "./discover-entries-params";
import {existsSync as isFileExists, readFileSync as readFile} from "fs";
import {get} from "lodash";

const CONFIG_KEY = 'webpackEntriesAutodiscovery';

export class ParamsResolver
{
    resolveParamsForPath(basePath: string): DiscoverEntriesParams
    {
        const packageJsonFilePath = `${basePath}/package.json`;

        if (!isFileExists(packageJsonFilePath)) {
            return new DiscoverEntriesParams({basePath});
        }

        const parsedPackageJson = JSON.parse(readFile(packageJsonFilePath).toString());
        const configParams = get(parsedPackageJson, CONFIG_KEY);
        return new DiscoverEntriesParams({...configParams, basePath});
    }
}
import {Entries, EntriesDiscoverer} from "./discoverer";
import {SymfonyStyleLogger} from "./symfony-style-logger";
import {ParamsResolver} from "./params-resolver";

export function discoverEntries(basePath: string): Entries {
    const logger = new SymfonyStyleLogger();
    const params = new ParamsResolver().resolveParamsForPath(basePath);
    const discoverer = new EntriesDiscoverer();

    logger.displayAutodiscoveryHeader();
    const entries = discoverer.discoverEntries(params);
    logger.displayEntriesForModule(basePath, entries);
    logger.disaplyEntriesSummary(entries);
    return entries;
}
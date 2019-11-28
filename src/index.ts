import {Entries, EntriesDiscoverer} from "./discoverer";
import {SymfonyStyleLogger} from "./symfony-style-logger";
import {DiscoverEntriesParams} from "./discover-entries-params";
import {DiscoverEntriesConfig} from "./discover-entries-config";

export function discoverEntries(params: DiscoverEntriesParams = {}): Entries {
    const logger = new SymfonyStyleLogger();
    const config = new DiscoverEntriesConfig(params);
    const discoverer = new EntriesDiscoverer();

    logger.displayAutodiscoveryHeader();
    const entries = discoverer.discoverEntries(config);
    logger.displayEntriesForModule(config.basePath, entries);
    logger.disaplyEntriesSummary(entries);
    return entries;
}
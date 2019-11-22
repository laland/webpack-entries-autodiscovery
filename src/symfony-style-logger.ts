import {SymfonyStyle} from 'symfony-style-console';
import prettyjson from 'prettyjson';
import keys from 'lodash/keys';

export class SymfonyStyleLogger
{
    private io: SymfonyStyle;

    constructor()
    {
        this.io = new SymfonyStyle();
    }

    displayAutodiscoveryHeader(): void {
        this.io.title('Webpack Entries Autodiscovery');
    }

    displayEntriesForModule(modulePath: string, entries: object): void {
        this.io.section(`Entries for ${modulePath}`);
        this.prettyPrintObject(entries);
        this.io.newLine();
    }

    disaplyEntriesSummary(entries: object): void {
        const totalEntries = keys(entries).length;
        const message = amount => `${amount || 'No'} entries are discovered!`;

        totalEntries ?
            this.io.success(message(totalEntries)) :
            this.io.warning(message(totalEntries))
        ;
    }

    private prettyPrintObject(object: object): void {
        return console.log(prettyjson.render(object));
    }
}
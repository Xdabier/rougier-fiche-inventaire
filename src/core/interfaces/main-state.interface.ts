import {CuberInterface} from './cuber.interface';
import {SiteInterface} from './site.interface';
import {DefParcInterface} from './def-parc.interface';
import {GasolineInterface} from './gasoline.interface';
import {LogDetailsInterface} from './log.interface';
import {UserInterface} from './user.interface';
import {ParcPrepAllDetailsInterface} from './parc-prep-all-details.interface';
import {ServerInterface} from './server.interface';

export interface MainStateContextInterface {
    setFilteringId?: (v: string) => void;
    filteringId?: string;
    keyboardHeight?: number;
    setServerData?: (v: ServerInterface) => void;
    serverData?: ServerInterface;
    setUser?: (v: UserInterface) => void;
    user?: UserInterface;
    setDefaultParc?: (v: DefParcInterface) => void;
    defaultParc: DefParcInterface;
    setCubers?: (v: CuberInterface | CuberInterface[]) => void;
    cubers: CuberInterface[];
    setParcIds?: (v: string | string[]) => void;
    parcIds: string[];
    setSites?: (v: SiteInterface | SiteInterface[]) => void;
    sites: SiteInterface[];
    setGasoline?: (v: GasolineInterface | GasolineInterface[]) => void;
    gasolines: GasolineInterface[];
    setLogs?: (v: LogDetailsInterface | LogDetailsInterface[]) => void;
    logs: LogDetailsInterface[];
    setParcPrepFiles?: (
        v: ParcPrepAllDetailsInterface | ParcPrepAllDetailsInterface[]
    ) => void;
    parcPrepFiles: ParcPrepAllDetailsInterface[];
    setHomeParcPrepFile?: (v: ParcPrepAllDetailsInterface) => void;
    homeParcPrepFile?: ParcPrepAllDetailsInterface | null;
}

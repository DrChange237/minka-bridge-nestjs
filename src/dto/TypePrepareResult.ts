import { ResultStatus } from "@minka/bridge-sdk";

export type TypePrepareResult = {
    /**
     * Result identifier.
     */

    handle : string;

    moment : string;

    status: ResultStatus.Prepared;
   
};
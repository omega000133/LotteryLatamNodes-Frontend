import { Jackpot } from "./jackpot.entity";
export interface History {
  jackpot: Jackpot;
  participant_address: string;
  ticket_hash: string;
  transaction?: string;
}

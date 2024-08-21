import { Jackpot } from "./jackpot.entity";
import { Ticket } from "./ticket.entity";

export interface Winner {
    ticket_hash: string;
    participant_address: string;
    jackpot: Jackpot;
    transaction?: string;
}
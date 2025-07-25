// src/minka/dto/transfer-intent.dto.ts
export class PartyCustom {
  name: string;
  idType: string;
  idNumber: string;
  entityType: string;
}

export class Party {
  handle: string;
  custom: PartyCustom;
}

export class TransferIntentDto {
  amount: number;
  symbol: string;
  source: Party;
  target: Party;
}

import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import programs from './programs.json'

export const CLUSTER = 'devnet'
export const SOLANA_HOST = 'https://api.devnet.solana.com/'

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
    '85EZivKT8uvAaphRcUfaN15Wu9PUL4eXBSh28PPDaTAE')

export const STABLE_POOL_IDL = programs

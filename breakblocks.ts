import { Command } from 'commander';
import { request } from './ApiInteract/getInfo';
import { find } from './ApiInteract/findServers';

const program = new Command();

program
  // for pinging servers
  .option('-p, --ping <IP address>', 'Minecraft server IP to get info for. Include the port')
  
  // for seeking servers
  .option('-c --country <Country>', 'Country where the server is based in. For example: -c Latvia')
  .option('-r --region <Region>', 'Region where the server is based in. For example: -r EU')
  .option('-v --version <version>', 'The Minecraft version that the server is on. For example: -v 1.16')
  .option('-P --page <page>', "Which result page to open. For example, -p 2")
  .option('-m --minUsers <amount>', "Filter results for servers with the minimum number of players online. For example, -m 5")
  .option('-M --maxUsers <amount>', "Filter results for servers with the maximum number of players online. For example, -M 10")

program.parse()

// for pinging
export const providedIP: string = program.opts().ping

// for finding
export const country: string = program.opts().country
export const region: string = program.opts().region
export const version: string = program.opts().version
export const page: string = program.opts().page
export const minUsers: string = program.opts().minUsers
export const maxUsers: string = program.opts().maxUsers

let requestParams: (string | undefined)[] = [country, region, version, page, minUsers, maxUsers]
let checkForUsedParams = requestParams.some(params => params !== undefined);

console.log(providedIP)
if (providedIP && !checkForUsedParams) {
  console.log("Loading...")
  request(providedIP)
} else if (providedIP && checkForUsedParams) {
  console.error('You cannot ping and look for servers on one instance!')
} else if (!providedIP && checkForUsedParams) {
  console.log("Loading...")
  find(country, region, version, page, minUsers, maxUsers)
} else {
  console.error("No flag used! Run breakblocks.ts --help to see usable flags.")
}
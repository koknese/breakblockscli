export async function request(providedIP: string) {
    const apiUrl = `https://api.breakblocks.com/api/v0.1/status/ping/${providedIP}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Invalid IP address');
        }

        const data = await response.json();

        if (data.server) {
            const { address, port, last_ping, motd, players_online, players_limit, country } = data.server;

            let free_slots: number = players_limit - players_online;
            if (free_slots < 0) {
                free_slots = 0;
            }

            console.log(`\nIP: ${address},\nPORT: ${port},\nLAST PING: ${last_ping}\n\nMOTD: ${motd},\nONLINE PLAYERS: ${players_online},\nPLAYER LIMIT: ${players_limit}\nFREE SLOTS: ${free_slots}\n\nCOUNTRY: ${country}`);
        } else {
            console.log('Server data not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
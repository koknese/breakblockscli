//https://api.breakblocks.com/api/v0.1/servers/find?limit=1&version=1.7.10&asn=16276&country=Canada&maxUsers=10&minUsers=1&sort=updated
export async function find(country?: string, region?: string, version?: string, page?: string, maxUsers?: string, minUsers?: string) {
    let baseURL: string = "https://api.breakblocks.com/api/v0.1/servers/find?";
    
    let params: string[] = [];
    if (country) {
        params.push(`country=${encodeURIComponent(country)}`);
    }
    if (region) {
        params.push(`region=${encodeURIComponent(region)}`);
    }
    if (version) {
        params.push(`version=${encodeURIComponent(version)}`);
    }
    if (page) {
        params.push(`page=${encodeURIComponent(page)}`);
    }
    if (minUsers) {
        params.push(`minUsers=${encodeURIComponent(minUsers)}`);
    }
    if (maxUsers) {
        params.push(`maxUsers=${encodeURIComponent(maxUsers)}`);
    }

    params.push(`${encodeURIComponent("sort=updated")}`)

    const url = baseURL + params.join('&');

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

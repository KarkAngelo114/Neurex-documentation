
const cache_key = "neurex";
const expiry_duration = 60 * 60 * 1000;
const contri = 'neurex_contri';


export const fetch_package_stats = async (packageName) => {
    try {
        const stored_data = sessionStorage.getItem(cache_key);

        if (stored_data) {
            const parsed = JSON.parse(stored_data);

            if (Date.now() - parsed.timestamp < expiry_duration) {
                return parsed;
            }
        }


        const [res1, res2] = await Promise.all([
            fetch(`https://registry.npmjs.org/${packageName}`),
            fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`)
        ]);

        if (!res1.ok || !res2.ok) {
            throw new Error("Failed to fetch");
        }

        const data1 = await res1.json();
        const data2 = await res2.json();

        const data = {
            version: data1["dist-tags"].latest,
            downloads: data2.downloads,
            timestamp: Date.now()
        }

        sessionStorage.setItem(cache_key, JSON.stringify(data));

        return data;
    }
    catch (err) {
        console.error(err);
    }
}

export const fetch_contributor = async () => {
    try {
        
        const stored_data = sessionStorage.getItem(contri);

        if (stored_data) {
            const parsed = JSON.parse(stored_data);

            if (Date.now() - parsed.timestamp < expiry_duration) {
                return parsed;
            }
        }

        const res = await fetch(`https://api.github.com/repos/KarkAngelo114/Neurex/contributors`);

        if (!res.ok) throw new Error('Failed to fetch');

        const response_data = await res.json();

        const profile = [];

        response_data.forEach(data => {
            profile.push(data.avatar_url)
        });

        const data = {
            profile_pics: profile,
            timestamp: Date.now()
        }

        sessionStorage.setItem(contri, JSON.stringify(data));

        return data;
    }
    catch (error) {
        console.error(error);
    }
}
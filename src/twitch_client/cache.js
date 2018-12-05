
export const getFromCache = (key) => {
    return new Promise((resolve, reject) => {
        const val = window.localStorage.getItem(key);

        if(val == null) {
            resolve(null);
            return;
        }

        console.debug(`Cache hit for ${key}`)

        const obj = JSON.parse(val);

        const expiresAt = new Date(obj.expires_at);
        const now = new Date();
        if(expiresAt < now) {
            resolve(null);
            return;
        }

        resolve(obj.resource);
    });
}

export const setToCache = (key, resource, ttl = 300) => {

    return new Promise((resolve, reject) => {
        const obj = {
            expires_at: _getExpiresAt(ttl),
            resource: resource
        };
    
        window.localStorage.setItem(key, JSON.stringify(obj));
    
        resolve(resource);
    });
    
}

function _getExpiresAt(ttl) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + ttl);
    return date;
}
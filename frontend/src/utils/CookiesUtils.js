export class CookiesUtils {
    constructor() {}
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    deleteCookie(name) {
        document.cookie = encodeURIComponent(name) +  "=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
/**
 * Interceptors - Vue Interceptors
 * @param {object} Vue - Vue Itself
 */
export default function(Vue) {
    Vue.http.interceptors.push((request, next) => {
        request.body = request.body || {};
        request.body.guest = localStorage.guest;
        request.body.uid = localStorage.uuid;
        if (localStorage.token) {
            request.body.token = localStorage.token;
        }
        next();
    });
}

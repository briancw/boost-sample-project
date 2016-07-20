/**
 * Interceptors - Vue Interceptors
 * @param {object} Vue - Vue Itself
 */
export default function(Vue) {
    Vue.http.interceptors.push((request, next) => {
        request.body = request.body || {};
        request.body.user_id = localStorage.user_id;
        request.body.guest = localStorage.guest;
        next();
    });
}

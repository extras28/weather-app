import axios from 'axios';
import Utils from 'general/utils/Utils';
import { t } from 'i18next';
import queryString from 'query-string';

const sTag = '[AxiosClient]';
// Setup configs for http request: `https://github.com/axios/axios#request-config`
/**
 * @type {import('../types').AxiosInstance}
 */
const baseURL = Utils.getBaseURL();
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    async config => {
        console.log(
            `${sTag} - ${config.baseURL}${config.url}, ${config.method}, ${
                config.method === 'post'
                    ? JSON.stringify(config.data)
                    : JSON.stringify(config.params)
            }`,
        );
        console.log(`${sTag} - headers: ${JSON.stringify(config.headers.common)}`);
        // if (variable.accessToken) {
        //     _.set(config.headers.common, 'Authorization', 'Bearer ' + variable.accessToken);
        // }

        // if (variable.sessionToken) {
        //     _.set(config.headers.common, 'session-token', variable.sessionToken);
        // }
        return config;
    },
    error => {
        /* every other response status or timeout goes here */
        console.warn(`${sTag} - ${error}`, 'error');
    },
);

axiosClient.interceptors.response.use(
    response => {
        console.log('[Axios Response]', response.config.url, response.data);
        // if (response.headers['session-token']) {
        //     variable.sessionToken = response.headers['session-token'];
        // }

        return { data: response.data, status: response.status };
    },
    error => {
        /* every other response status or timeout goes here */
        console.warn(`${sTag} - ${error}`, 'error');

        const response = error.response;
        let url = error.config?.url;
        // console.log({ response });

        if (response) {
            // if (response.status === 401) {
            //     /* token expires */
            //     variable.accessToken = undefined;
            //     variable.sessionToken = undefined;

            //     if (url == '/account/logout') {
            //         return;
            //     }

            //     NavigationHelper.replaceScreen(Screens.AUTH_LOGIN);
            //     // store.dispatch(updateAuthStatus('loggedOut'));
            //     store.dispatch(thunkLogout());
            // } else if (response.status == 403) {
            //     variable.accessToken = undefined;
            //     variable.sessionToken = undefined;

            //     if (url == '/account/logout') {
            //         return;
            //     }
            //     /* forbidden */
            //     NavigationHelper.replaceScreen(Screens.AUTH_LOGIN);
            //     // store.dispatch(updateAuthStatus('loggedOut'));
            //     store.dispatch(thunkLogout());
            // }
        }

        throw {
            status: response?.status,
            data: response?.data ?? { reason: error?.message ?? t('Unknown error') },
        };
    },
);

// Update base url
const updateAxiosBaseURL = baseUrl => {
    axiosClient.defaults.baseURL = baseUrl;
};

// Update access token
const updateAxiosAccessToken = accessToken => {
    // console.log('before',axiosClient.defaults.headers.common['Authorization'],accessToken)
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // console.log('after',axiosClient.defaults.headers.common['Authorization'],accessToken)
    // Alert.alert('Token changed',accessToken)
};

// Remove access token
const removeAxiosAccessToken = () => {
    axiosClient.defaults.headers.common.Authorization = undefined;
};

export { updateAxiosAccessToken, removeAxiosAccessToken, updateAxiosBaseURL };

export default axiosClient;

const IP = "127.0.0.1"
export const Domain = "v-hub.net" // '.net' for aws cloud product; '.link' for aws cloud test; '.test' for local test

export const URL_API = `http://api.${Domain}/`;   // "127.0.0.1:1323"
export const URL_SIGN = `http://${Domain}/`;      // "127.0.0.1:8080"
export const URL_MAIN = `http://main.${Domain}/`; // "127.0.0.1:8081"

// *** example for nginx/sites config for local running with domain ***
//

// server {
//     server_name api.v-hub.test;
//     location / {
//             proxy_pass http://localhost:1323;
//     }
// }

// server {
//     server_name v-hub.test;
//     location / {
//             proxy_pass http://localhost:8080;
//     }
// }

// server {
//     server_name main.v-hub.test;
//     location / {
//             proxy_pass http://localhost:8081;
//     }
// }

////////
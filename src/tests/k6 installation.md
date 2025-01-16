## Install k6

Official website: [K6 Website](https://k6.io/)

Install K6 Using Chocolatey, open cmd and hit below coomand 

```
 choco install k6 
```
if they are asking to install chocolatey, Run the following command to install Chocolatey

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

```

Verify Installation: 

```
k6 version
```
create seperate folder name k6, in k6 create file k6get.js

` k6get.js `

```
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users
    { duration: '1m', target: 10 },  // Stay at 10 users
    { duration: '10s', target: 0 },  // Ramp-down to 0 users
  ],
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

```

to run above code use below command 

```
k6 run k6get.js
```

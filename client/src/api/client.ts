import createClient from 'openapi-fetch';
import type { paths } from '../api-types';

const client = createClient<paths>({ baseUrl: 'http://localhost:4000' });

export default client;
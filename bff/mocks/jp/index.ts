import { setupServer } from 'msw/node';
import { postsHandlers } from './handlers/posts.js';

export const server = setupServer(...postsHandlers);

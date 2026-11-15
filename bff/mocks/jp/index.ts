import { setupServer } from 'msw/node';
import { postsHandlers } from './handlers/posts.js';
import { postsIdHandlers } from './handlers/postsId.js';

export const jpMockServer = setupServer(...postsHandlers, ...postsIdHandlers);

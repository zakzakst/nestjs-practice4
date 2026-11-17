declare namespace BFFComponents {
    namespace Schemas {
        export interface Post {
            /**
             * example:
             * 1
             */
            userId: number;
            /**
             * example:
             * 1
             */
            id: number;
            /**
             * example:
             * 初めてのブログ記事
             */
            title: string;
            /**
             * example:
             * 今日はブログを始めました。日々の学びや気づきを、少しずつ記事にしていきたいと思います。どうぞよろしくお願いします。
             */
            body: string;
        }
        export interface PostDetail {
            /**
             * example:
             * 1
             */
            userId: number;
            /**
             * example:
             * 1
             */
            id: number;
            /**
             * example:
             * 初めてのブログ記事
             */
            title: string;
            /**
             * example:
             * 今日はブログを始めました。日々の学びや気づきを、少しずつ記事にしていきたいと思います。どうぞよろしくお願いします。
             */
            body: string;
            /**
             * example:
             * ヤマちゃん
             */
            username: string;
            /**
             * example:
             * yamada@mail.com
             */
            email: string; // email
        }
        export interface User {
            /**
             * example:
             * 1
             */
            id: number;
            /**
             * example:
             * 山田 太郎
             */
            name: string;
            /**
             * example:
             * ヤマちゃん
             */
            username: string;
            /**
             * example:
             * yamada@mail.com
             */
            email: string; // email
            address: {
                street: string;
                suite: string;
                city: string;
                zipcode: string;
                geo: {
                    lat: string;
                    lng: string;
                };
            };
            /**
             * example:
             * 08012345678
             */
            phone: string;
            /**
             * example:
             * https://www.yamada.com
             */
            website: string; // uri
            company: {
                /**
                 * example:
                 * 株式会社○○
                 */
                name: string;
                /**
                 * example:
                 * ✕✕に関する不安をすべて解決
                 */
                catchPhrase: string;
                bs: string;
            };
        }
    }
}
declare namespace BFFPaths {
    namespace PostDetails$Id {
        namespace Get {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export type $200 = BFFComponents.Schemas.PostDetail;
            }
        }
    }
    namespace Posts {
        namespace Get {
            namespace Parameters {
                /**
                 * example:
                 * 20
                 */
                export type Limit = string;
                /**
                 * example:
                 * 1
                 */
                export type Page = string;
            }
            export interface QueryParameters {
                page?: /**
                 * example:
                 * 1
                 */
                Parameters.Page;
                limit?: /**
                 * example:
                 * 20
                 */
                Parameters.Limit;
            }
            namespace Responses {
                export interface $200 {
                    /**
                     * example:
                     * 100
                     */
                    total?: number;
                    /**
                     * example:
                     * 20
                     */
                    limit?: number;
                    /**
                     * example:
                     * 1
                     */
                    page?: number;
                    items?: BFFComponents.Schemas.Post[];
                }
            }
        }
        namespace Post {
            export interface RequestBody {
                /**
                 * example:
                 * 1
                 */
                userId: number;
                /**
                 * example:
                 * 初めてのブログ記事
                 */
                title: string;
                /**
                 * example:
                 * 今日はブログを始めました。日々の学びや気づきを、少しずつ記事にしていきたいと思います。どうぞよろしくお願いします。
                 */
                body: string;
            }
            namespace Responses {
                export type $201 = BFFComponents.Schemas.Post;
            }
        }
    }
    namespace Posts$Id {
        namespace Delete {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export interface $204 {
                }
            }
        }
        namespace Get {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export type $200 = BFFComponents.Schemas.Post;
            }
        }
        namespace Put {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            export type RequestBody = BFFComponents.Schemas.Post;
            namespace Responses {
                export type $200 = BFFComponents.Schemas.Post;
            }
        }
    }
    namespace Users$Id {
        namespace Delete {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export interface $204 {
                }
            }
        }
        namespace Get {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            namespace Responses {
                export type $200 = BFFComponents.Schemas.User;
            }
        }
        namespace Put {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            export type RequestBody = BFFComponents.Schemas.User;
            namespace Responses {
                export type $200 = BFFComponents.Schemas.User;
            }
        }
    }
}

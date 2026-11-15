declare namespace JPComponents {
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
        export interface User {
            /**
             * example:
             * 1
             */
            id?: number;
            /**
             * example:
             * 山田 太郎
             */
            name?: string;
            /**
             * example:
             * ヤマちゃん
             */
            username?: string;
            /**
             * example:
             * yamada@mail.com
             */
            email?: string; // email
            address?: {
                street?: string;
                suite?: string;
                city?: string;
                zipcode?: string;
                geo?: {
                    lat?: string;
                    lng?: string;
                };
            };
            /**
             * example:
             * 8012345678
             */
            phone?: string;
            /**
             * example:
             * https://www.yamada.com
             */
            website?: string; // uri
            company?: {
                /**
                 * example:
                 * 株式会社○○
                 */
                name?: string;
                /**
                 * example:
                 * ✕✕に関する不安をすべて解決
                 */
                catchPhrase?: string;
                bs?: string;
            };
        }
    }
}
declare namespace JPPaths {
    namespace Posts {
        namespace Get {
            namespace Responses {
                export type $200 = JPComponents.Schemas.Post[];
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
                export type $201 = JPComponents.Schemas.Post;
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
                export type $200 = JPComponents.Schemas.Post;
            }
        }
        namespace Put {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            export type RequestBody = JPComponents.Schemas.Post;
            namespace Responses {
                export type $200 = JPComponents.Schemas.Post;
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
                export type $200 = JPComponents.Schemas.User;
            }
        }
        namespace Put {
            namespace Parameters {
                export type Id = number;
            }
            export interface PathParameters {
                id: Parameters.Id;
            }
            export type RequestBody = JPComponents.Schemas.User;
            namespace Responses {
                export type $200 = JPComponents.Schemas.User;
            }
        }
    }
}

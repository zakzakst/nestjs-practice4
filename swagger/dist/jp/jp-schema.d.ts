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
}

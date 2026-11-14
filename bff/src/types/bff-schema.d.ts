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
    }
}
declare namespace BFFPaths {
    namespace Posts {
        namespace Get {
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
}

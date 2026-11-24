- http://127.0.0.1:3000/open-telemetry/slow

### ① Traces（トレース）

処理の流れを追跡する
APIのリクエストがどの処理を通り、どこで時間がかかったのかを把握する。

### ② Metrics（メトリクス）

数値を集計して状態を把握する
リクエスト数・処理時間・エラー数・CPU使用率などを集計する。

### ③ Logs（ログ）

イベントの詳細を記録する
エラー内容や処理中のイベントなど、具体的な情報を記録する。

#### Span（スパン）とは？

Traceを理解するために、次にSpanという概念を理解しましょう。
Spanとは、Traceを構成する個々の処理単位です。

イメージとしては、
Trace：一連の処理全体
Span：Traceを構成する個々の処理
という関係です。

#### Spanにはどのような情報が記録されるのか？

一般的に、Spanには次のような情報が含まれます。

Span ID
Spanを識別するためのID

Name
処理の名前（例：UsersService.findOne）

Start Time / End Time
処理の開始時刻と終了時刻

Parent Span ID
親Spanとの関係を表すID

Status
処理の成功・エラーなどの状態

Attributes
HTTPメソッド、URL、DB情報などの追加属性

#### Monkey Patchingとは？

既存の関数を、別の処理を追加した関数に置き換える手法です。

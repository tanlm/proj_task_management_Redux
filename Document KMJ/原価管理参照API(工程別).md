# 原価管理-参照API(工程別)

## 概要
| API No. | 原価予算-009 |
|:--------|:-------|
| API name | 原価管理参照API(工程別) |
| Last updated | 2020/03/31 |
| Description | 工程別の原価管理参照情報を取得する。 |
| Notes | 工程別の実行予算リスト、実行予算、実行予算明細、実行予算明細（期間別）、原価実績、出来高進捗、全体工程表、工程表（期間別）から原価管理参照情報を取得する。 |

## リクエストノード
| Project | Method | URI |
|:---------|:---------|:----|
| NGP-Data-Platform-Budgetcost | GET | /api/v1/cost/cost-management-process |

## データ型
| Type |  description |
|:-----------|:----------------|
| Integer | Integer type. |
| Number | Number type. Has an integer part and two decimal places. eg) 100.00|
| String | String type. |
| Text | Text type. Character string that is longer than String and may include line breaks. |
| Bool | Boolean type. |
| UUID | Unique identier type. eg) a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 |
| DateTime | Date and time type. ISO8601 UTC Format eg) 2004-04-01T12:00Z |
| Array | Array of any type. |
| Object | Defined native type. Defined by combining other types. |

## エンコード
UTF-8

## 業務ロジック
```
1.Restfulを呼び出し、"企業ID"、"現場ID"と"バージョンNo"をパラメーターとして引き渡すことにより、ビジネス処理Controllerに入ります。
2.Controllerは引き渡したパラメーターを検証し、OKの場合、Serviceを呼び出す。
3.ServiceはRepositoryを呼び出し、原価実績情報を検索する。
    SQL処理ロジック：
        a.工程名ビュー（v_schedule_name）から、検索条件によって、工程リスト情報を取得する
        b.工程リスト情報と実行予算明細テーブル、実行予算テーブルと、工種したの項目明細情報を取得する
        c.実行予算明細（期間別）テーブルと実行予算明細番号で予算の日、週、月の情報を取得する
        d.原価実績テーブルと“企業ID”，“現場ID”，“工種番号”で、実績の日、週、月情報を取得する
        e.工種番号で工程表（期間別）から、工程の日、週、月情報を取得する
        日付は日、週、月三つ種類、三つ情報を一緒に結果を返す
    
    时间统计获取时间操作：
        c,d,e を実行するとき、このデータの終了日付の値があるかの検索が必要。
        値がない：返す結果のmultiplyが1
        値がある：返す結果のmultiplyが変値
            日別：本日付と終了日付と比べて
                本日付>終了日付の場合、startDateからendDateの日数を計算して、multiplyの値は連続日数。
                本日付<=終了日付の場合、startDateから本日付の日数を計算して、multiplyの値は連続日数。
            週別：本日付と終了日付と比べて
                本日付>終了日付の場合、startDateからendDateの週数を計算して、multiplyの値は連続週数。
                本日付<=終了日付の場合、startDateから本日付の週を計算して、multiplyの値は連続週数。
            月別：本日付と終了日付と比べて
                本日付>終了日付の場合、startDateからendDateの月数を計算して、mmultiplyの値は連続月数。
                本日付<=終了日付の場合、startDateから本日付の月数を計算して、multiplyの値は連続月数。
            週、月データのmultiplyは小数点以下２桁
4.Serviceはデータを整合することで、取得したdetailsデータを三つ段階に分けます。
    第1階，総工程
    第2階，工程別、工程情報を検索、工程段階でデータを表示。該当段階は複数段階が存在可能、すべて表示。
    第3階，項目別、実行予算明細と実績の項目を検索して表示。
    ____________________________________________________________________________________________________________________________________________________________________
    |   段階  |  項目名  | 総量                                      |                予定                |      実績        |              日付                          |
    ____________________________________________________________________________________________________________________________________________________________________
    | 総工程階 | 総工程名 |               /                          |              /                     |       /         |               /                            |
    ____________________________________________________________________________________________________________________________________________________________________
    | 工程階   | 分類名称 | 工程表-数量の合計(ない場合100%で表示) |  工程表（期間別）当日予定合計（第一階工程） | 出来高累計進捗数量 | グレー:工程表日付   カラー:所属分類の実績合計 |
    _____________________________________________________________________________________________________________________________________________________________________
    | 項目階   | 項目名称 | 実行予算明細数量の合計               | 执行予算明细(区间别)当日予定合計           | 原価実績合計       | グレー:実行予算日付 カラー:原価管理日付       |
    _____________________________________________________________________________________________________________________________________________________________________
    日付は日、週、月三つ種類のデータを返す
5.Controllerは応答ステータス、例外情報などを加工し、responseを返す。
```

## リクエスト
### Request Header
|フィールド|フィールド名|必須|説明|
|:---|:---|:---:|:---|
| Authorization |検証コード| ○ | Bearer {accessToken}|
| Content-Type |解析方式| ○ | application/json |

### パラメーター
|フィールド|フィールド名|タイプ|説明|
|:---|:---|:---|:---|
|corporationId | 企業ID | String |
|siteId| 現場ID | String |
|versionNo| バージョンNo | Int 歴史バージョン検索用|

## リスポンス
### Response Header
| Header | Parameter |
|:---------|:--------|
| Content-Type | application/json |

### Response Body
<table>
  <tr>
    <th colspan="6">フィールド</th>
    <th>フィールド名</th>
    <th>タイプ</th>
    <th>DBフィールド</th>
    <th>所属DB</th>
    <th>説明</th>
  </tr>
  <tr>
    <td rowspan="30">data</td>
    <td colspan="5">title</td>
    <td>項目名</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>参考业务逻辑中说明</td>
  </tr>
  <tr>
    <td colspan="5">level</td>
    <td>所属段階</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>Serviceで処理</td>
  </tr>
    <td colspan="5" rowspan="2">taskUnitPrice</td>
    <td rowspan="2">工程単価</td>
    <td rowspan="2"> String</td>
    <td>taskUnitPrice</td>
    <td>toverallschedule</td>
    <td>工程階工程単価</td>
  </tr>
  <tr>
    <td>quotationUnitPrice</td>
    <td>tbudgetdetails</td>
    <td>项目階見積単価</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">taskAmount</td>
    <td rowspan="2">金額</td>
    <td rowspan="2">String</td>
    <td>taskAmount</td>
    <td>toverallschedule</td>
    <td>工程階金額</td>
  </tr>
   <tr>
    <td>/</td>
    <td>/</td>
    <td> 项目階金額 <br>项目階見積単価*项目階総量</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">actualPrice</td>
    <td rowspan="2">実績単価</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>工程階金額が空</td>
  </tr>
   <tr>
    <td>fixedUnitPrice</td>
    <td>toverallschedule</td>
    <td> 项目階確定単価 </td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">actualAmount</td>
    <td rowspan="2">実績金額</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>所属階金額求和</td>
  </tr>
   <tr>
    <td>/</td>
    <td>/</td>
    <td> 项目階金額 <br>確定単価* 効率</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">totalQuantity</td>
    <td rowspan="2">総量</td>
    <td rowspan="2">String</td>
    <td>totalQuantity</td>
    <td>toverallschedule</td>
    <td>工程階総量</td>
  </tr>
  <tr>
    <td>totalQuantity</td>
    <td>tbudgetdetails</td>
    <td>项目階総量</td>
  </tr>
  <tr>
    <td colspan="5">plan</td>
    <td>歴史予定</td>
    <td>String</td>
    <td>sum(dailyQuantity)</td>
    <td>tdailybudgetdetails</td>
    <td>実行予算バージョンNoで検索した歴史バージョン</td>
  </tr>
  <tr>
    <td colspan="5">revisedPlan</td>
    <td>最新予定</td>
    <td>String</td>
    <td>sum(dailyQuantity)</td>
    <td>tdailybudgetdetails</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="5">result</td>
    <td>実績</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>業務ロジックを参照</td>
  </tr>

  <tr>
    <td colspan="5">progress</td>
    <td>完成進捗</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>（実績/総量）*100</td>
  </tr>
  <tr>
    <td colspan="5">progressForPlan</td>
    <td>歴史完成率</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>（実績/歴史予算）*100</td>
  </tr>

  <tr>
    <td colspan="5">itemId</td>
    <td>项目番号</td>
    <td>String</td>
    <td>itemId</td>
    <td>tbudgetdetails</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="5">costType</td>
    <td>コスト類型</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>通过拆分項目名获取</td>
  </tr>
  <tr>
    <td colspan="5">delay</td>
    <td>延期フラグ</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>0:未延期 <br>1:延期 </td>
  </tr>
  <tr>
    <td colspan="5">engineeringId</td>
    <td> 工程ID</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>/</td>
  </tr>
  <tr>
    <td rowspan="9">calendarData<br>日付</td>
    <td rowspan="3">daily</td>
    <td>plan</td>
    <td rowspan="9">ノ<br>ー<br>ド<br>デ<br>ー<br>タ</td>
    <td rowspan="3">startDate</td>
    <td rowspan="3">開始日付</td>
    <td rowspan="3">String</td>
    <td rowspan="3">date</td>
    <td rowspan="3">/</td>
    <td rowspan="3">開始日付 <br> plan:パラメーター.バージョンNoで検索した日付データの開始日付 <br> revisedPlan:最新バージョンの日付データの開始日付 <br> result:実績の開始日付</td>
  </tr>
  <tr>
    <td>revisedPlan</td>
  </tr>
  <tr>
    <td>result</td>
  </tr>
  <tr>
    <td rowspan="3">weekly</td>
    <td>plan</td>
    <td rowspan="3">progress</td>
    <td rowspan="3">进度</td>
    <td rowspan="3">String</td>
    <td rowspan="3">/</td>
    <td rowspan="3">/</td>
    <td rowspan="3">进度 <br> plan:パラメーター.バージョンNoで検索した日付データのusageQuantity </br> revisedPlan:最新バージョンの日付データのusageQuantity <br> result 実績のusageQuantity</td>
  </tr>
    <tr>
    <td>revisedPlan</td>
  </tr>
  <tr>
    <td>result</td>
  </tr>
  <tr>
    <td rowspan="3">monthly</td>
    <td>plan</td>
    <td rowspan="3">multiply</td>
    <td rowspan="3">列数</td>
    <td rowspan="3">String</td>
    <td rowspan="3">/</td>
    <td rowspan="3">/</td>
    <td rowspan="3">所属列数</td>
  </tr>
  <tr>
    <td>revisedPlan</td>
  </tr>
  <tr>
    <td>result</td>
  </tr>
</table>

### json
```
{
    "data": [
        {
            "title": "工事イベント",
            "level": "0",
            "taskAmount": 0,
            "taskUnitPrice":"",
            "totalQuantity":"",
            "plan": "",
            "revisedPlan": "",
            "result": "",
            "progress": 0,
            "progressForPlan": 0,
            "itemId": "",
            "costType": "",
            "delay": "",
            "calendarData": {
                "daily": {
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-22",
                            "progress": "11/22 立ち会い"
                        }
                    ]
                },
                "monthly": {
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-04",
                            "progress": "11/22 立ち会い"
                        }
                    ]
                },
                "weekly": {
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-18",
                            "progress": "11/22 立ち会い"
                        }
                    ]
                }
            },
            
        },
        {
            "taskAmount":"5000000",
            "taskUnitPrice":"",
            "totalQuantity":"",
            "costType": "",
            "delay": "",
            "level": "1",
            "plan": "",
            "progress": "42",
            "progressForPlan": 0,
            "itemId": "",
            "result": "42%",
            "revisedPlan": "40%",
            "title": "○○川防災工事(護岸工)",
            "calendarData": {
                "daily": {
                    "plan": [
                        {
                            "startDate":"2019-11-04",
                            "multiply":"35",
                            "progress":"100"
                        }
                    ],
                    "result": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "26",
                            "progress": "42"
                        }
                    ],
                    "revisedPlan": [
                        {
                            "startDate":"2019-11-04",
                            "multiply": "58",
                            "progress": "100"
                        }
                    ]
                },
                "monthly": {
                    "plan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "1.3",
                            "progress": "100"
                        }
                    ],
                    "result": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "0.84",
                            "progress": "42"
                        }
                    ],
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "2",
                            "progress": "100"
                        }
                    ]
                },
                "weekly": {
                    "plan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "6",
                            "progress": "100"
                        }
                    ],
                    "result": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "3.2",
                            "progress": "42"
                        }
                    ],
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "9",
                            "progress": "100"
                        }
                    ]
                }
            }
        },
        {
            "taskAmount": 0,
            "taskUnitPrice":"",
            "totalQuantity":"",
            "costType": "",
            "delay": "",
            "engineeringId": "b6c86cfa-342c-49e3-9985-888b91acdbcc",
            "level": "2",
            "plan": "",
            "progress": "42",
            "progressForPlan": 0,
            "itemId": "",
            "result": "42%",
            "revisedPlan": "40%",
            "title": "右岸下流工区"
            "calendarData": {
                "daily": {
                    "plan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "35",
                            "progress": "100"
                        }
                    ],
                    "result": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "26",
                            "progress": "42"
                        }
                    ],
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "58",
                            "progress": "100"
                        }
                    ]
                },
                "monthly": {
                    "plan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "1.3",
                            "progress": "100"
                        }
                    ],
                    "result": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "0.84",
                            "progress": "42"
                        }
                    ],
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "2",
                            "progress": "100"
                        }
                    ]
                },
                "weekly": {
                    "plan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "6",
                            "progress": "100"
                        }
                    ],
                    "result": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "3.2",
                            "progress": "42"
                        }
                    ],
                    "revisedPlan": [
                        {
                            "startDate": "2019-11-04",
                            "multiply": "9",
                            "progress": "100"
                        }
                    ]
                }
            }
        }
    ]
}
```

## テーブル
|テーブル|関連テーブル|関連項目|関連関係|説明|
|---|---|---|---|---|
| tBudgetList | tBudget | tBudgetList.corporationId=tBudget.corporationId <br>tBudgetList.siteId=tBudget.siteId <br> tBudgetList.final_versionNo=tBudget.versionNo| OneToOne||
| tBudget| tBudgetDetails | tBudget.id=tBudgetDetails.budgetId |OneToN(OneToZero)||
| tBudgetDetails | v_schedule_name | tBudgetDetails.corporationId=v_schedule_name.corporationId <br>| ManyToOne ||
| tBudgetDetails | tDailyBudgetDetails | tBudgetDetails.id=tDailyBudgetDetails.budget_detailsId |OneToN(OneToZero) ||
| tBudgetDetails | tActualCost | 実行予算と企業ID、現場IDを取得 <br>“現場ID”=tActualCost.siteId <br>"企業ID"=tActualCost.corporationId <br> tBudgetDetails.itemId=tActualCost.itmId <br> tBudgetDetailsconstructionTypeCode=tActualCost.constructionTypeCode | left join | |
| v_schedule_name | tDailySchedule | v_schedule_name.id=tDailySchedule.scheduleId | OneToMany | |
| v_schedule_name | tWorkProgress | v_schedule_name.corporationId=tWorkProgress.corporationId <br>v_schedule_name.siteId=tWorkProgress.siteId <br>v_schedule_name.constructionTypeCode=tWorkProgress.constructionTypeCode | OneToOne | |

## 異常リスポンス
### HTTP Status Codes
| Status |  description |
|:-----------|:----------------|
| 200 | Returned when the request has been successfully processed. |
| 201 | Returned when new resources successfully created. |
| 400 | Returned when the input parameter is invalid and the request was not processed. |
| 401 | Returned when the authentication header is not specified, or if the token specified in the header is invalid or expired. |
| 403 | Returned when the scope of the token specified in the authentication header is insufficient. |
| 404 | Returned when any of the resources specified in the parameter does not exist. |
| 409 | Returned when the resource you are trying to create already exists. |
| 500 | Returned when a problem occurs on the server side. |

### Response Header
| Header | Parameter |
|:---------|:--------|
| Content-Type | application/json |

### Response Body
| Part | Name|Type |  description |
|:-----------|:-----------|:----------------|:----------------|
| status| ステータス |String|HTTP応答ステータス。200：正常；その他：異常|
| code | 異常コード |Integer | The status code representing the error. |
| message |エラーメッセージ| String | The message explaining the error. |
| parameters | エラー配列 | Array[String] | (Optional) An array of attributes used to generate a different and/or localized error message. |

```json
{
  "code": 400,
  "message":"Invalid product data: %1",
  "parameters": [
    "Invalid attribute set entity type"
  ]
}
```

## テスト方法
```
1. サービス説明より渡されたパラメーターにより、postman等のソフトウェアを呼び出し、テスト応答メッセージを返します。
2. Junitテストを実行し、カバレッジ率は100％になります。
```

#### Change log
| Date | Changed | Comment |
|:-----------|:----------|:------------------------|
| 2020/03/31 | created | - |

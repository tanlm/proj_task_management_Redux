# 原価管理-参照API(リソース別)

## 概要
| API No. | 原価予算-010 |
|:--------|:-------|
| API name | 原価管理参照API(リソース別) |
| Last updated | 2020/03/31 |
| Description | リソース別の原価管理参照情報を取得する。|
| Notes | リソース別の実行予算リスト、実行予算、実行予算明細、実行予算明細（期間別）、原価実績、出来高進捗、全体工程表、工程表（期間別）から原価管理参照情報を取得する。|

## リクエストノード
| Project | Method | URI |
|:---------|:---------|:----|
| NGP-Data-Platform-Budgetcost | GET | /api/v1/cost/cost-management-resource |

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
4.SQL処理ロジック：
    a."企業ID"、"現場ID"と"バージョンNo"をパラメーターとして、実行予算リスト（tbudgetlist）から実行予算IDを取得する。
    b.実行予算（tbudget）、実行予算リスト（tbudgetdetails）から予算情報を取得する。
    c.工程名ビュー（v_schedule_name）から、実行予算明細の工種名称を取得する。
    d.検索結果を返す。
        特別説明：
            itemId: 項目番号
            itemName: 項目名
            constructionTypeCode: 工種分類番号
            constructionPath: 工種名称->工程名ビュー（v_schedule_name）を検索する

        日付情報処理：
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
5.Serviceはデータを整合することで、取得したdetailsデータを区切りして、jasonに返す。
    ______________________________________________________________________________________________________________________________________
    |   段階  |  項目名  |             予定                            | 実績             |                 日付データ                      |
    _______________________________________________________________________________________________________________________________________
    |  項目階 | 項目名称 | 実行予算明細（期間別）当日予定合計 期間区分（d）| 原価実績合計      | グレー:実行予算時間段合計  カラー:原価管理時間段合計|
    _______________________________________________________________________________________________________________________________________
    |  工程階 | 工種名称 | 工程（区间别）当日予定合計 区间分区（d）       | 出来高進捗 数量合計| グレー:工程表時間段合計 カラー:所属実行予算の実績　 |
    ________________________________________________________________________________________________________________________________________
6. Controllerは応答ステータス、例外情報などを加工し、responseを返す。
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
| corporationId | 企業ID | String |
| siteId | 現場ID | String |
| versionNo | バージョンNo | Int |

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
    <td></td>
  </tr>
  <tr>
    <td colspan="5">level</td>
    <td>所在层级</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>Serviceで処理</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">taskUnitPrice</td>
    <td rowspan="2">工程単価</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>項目階見積単価</td>
  </tr>
  <tr>
    <td>taskUnitPrice</td>
    <td>toverallschedule</td>
    <td>工程階工程単価</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">taskAmount</td>
    <td rowspan="2"> 金額</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>項目階金額 <br>項目階見積単価*項目階総量 <br>(所属項目下の複数項目の合計)</td>
  </tr>
   <tr>
    <td>taskAmount</td>
    <td>toverallschedule</td>
    <td>工程階金額</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">actualPrice</td>
    <td rowspan="2">実績単価</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>項目階</td>
  </tr>
   <tr>
    <td>/</td>
    <td>/</td>
    <td>工程階</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">actualAmount</td>
    <td rowspan="2">実績金額</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>項目階金額 <br>確定単価* 効率<br>(所属項目下の複数項目の合計)</td>
  </tr>
   <tr>
    <td>/</td>
    <td>/</td>
    <td>工程階</td>
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
    <td>項目階総量</td>
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
    <td colspan="5">itemId</td>
    <td>項目番号</td>
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
    <td>項目名を区切りで取得</td>
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
    <td rowspan="3">開始日付 <br> plan:パラメーター.バージョンNoで検索した日付データの開始日付<br> revisedPlan:最新バージョンの日付データの開始日付 <br> result:実績の開始日付</td>
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
    <td rowspan="3">進捗</td>
    <td rowspan="3">String</td>
    <td rowspan="3">/</td>
    <td rowspan="3">/</td>
    <td rowspan="3">進捗<br> plan:パラメーター.バージョンNoで検索した日付データのusageQuantity</br> revisedPlan:最新バージョンの日付データのusageQuantity<br> result 実績のusageQuantity</td>
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
  [
    {
        "title":"コマツ PC128USi ※NETIS",
        "level":"5",
        "taskAmount":"5000000",
        "taskUnitPrice":"",
        "totalQuantity":"",
        "plan":"予定",
        "revisedPlan":"20日",
        "result":"15日",
        "progress":"75",
        "itemId":"No.11111",
        "costType":"月割",
        "calendarData":{
            "monthly":{
                "revisedPlan":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"20"
                    }
                ],
                "result":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"15"
                    }
                ]
            },
             "weekly":{
                revisedPlan:[
                    {
                        "startDate:"2019-11-04",
                        "progress":"5"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"5"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"5"
                    }, {
                        "startDate":"2019-11-25",
                        "progress":"5"
                    }
                ],
                "result":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"5"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"5"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"5"
                    }
                ]
            },
            "daily":{
                "revisedPlan":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-05",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-06",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-07",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-08",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-12",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-13",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-14",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-15",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-19",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-20",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-21",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-22",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-25",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-26",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-27",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-28",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-29",
                        "progress":"1"
                    }
                ],
                 "result":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-05",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-06",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-07",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-08",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-12",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-13",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-14",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-15",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-19",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-20",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-21",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-22",
                        "progress":"1"
                    }
                ]
            }
        }
    },
    {
        "level":"6,
        "title":"右岸下流工区>河川土工>掘削工",
        "taskAmount":"5000000",
        "taskUnitPrice":"",
        "totalQuantity":"",
        "progress":"75",
        "plan":"12日",
        "revisedPlan：""
        "costType":"月割",
        "result":"9日",
        "calendarData":{
            "monthly":{
                "revisedPlan":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"12"
                    }
                ],
                 "result":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"9"
                    }
                ]
            },
             "weekly":{
                "revisedPlan":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"3"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"3"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"3"
                    }, {
                        "startDate":"2019-11-25",
                        "progress":"3"
                    }
                ],
                 "result":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"3"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"3"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"3"
                    }
                ]
            },
            daily":{
                revisedPlan":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-05",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-06",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-12",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-13",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-19",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-20",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-25",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-26",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-27",
                        "progress":"1"
                    }
                ],
                 "result":[
                    {
                        "startDate":"2019-11-04",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-05",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-06",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-11",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-12",
                        "progress":"1"
                    },{
                        "startDate":"2019-11-13",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-18",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-19",
                        "progress":"1"
                    }, {
                        "startDate":"2019-11-20",
                        "progress":"1"
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

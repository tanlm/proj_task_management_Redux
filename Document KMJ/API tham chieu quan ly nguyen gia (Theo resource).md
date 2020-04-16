# Quản lý nguyên giá-API tham chiếu(Theo resource)

## Khái quát
| API No. | Dự toán nguyên giá-010 |
|:--------|:-------|
| API name | API tham chiếu quản lý nguyên giá(Theo resource) |
| Last updated | 2020/03/31 |
| Description | Get thông tin tham chiếu quản lý nguyên giá của theo resource.|
| Notes | Get thông tin tham chiếu quản lý nguyên giá từ những nội dung sau theo từng resource: List dự toán thực hiện, Dự toán thực hiện, Chi tiết dự toán thực hiện, Chi tiết dự toán thực hiện (Theo kỳ hạn), Thực tế nguyên giá, Tiến độ đã hoàn thành, Bảng schedule tổng thể, Bảng schedule (Theo kỳ hạn).|

## Request node
| Project | Method | URI |
|:---------|:---------|:----|
| NGP-Data-Platform-Budgetcost | GET | /api/v1/cost/cost-management-resource |

## Data type
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

## Encode
UTF-8

## Logic nghiệp vụ
```
1.Gọi Restful, đưa vào Controller quản lý business bằng cách truyền "ID doanh nghiệp", "ID hiện trường" và "No version" dưới dạng parameter.
2.Controller kiểm chứng parameter mà đã truyền vào, t/hợp OK thì sẽ gọi Service.
3.Service gọi Repository, tìm kiếm thông tin thực tế nguyên giá.
4.Logic xử lý SQL:
    a.Lấy "ID doanh nghiệp", "ID hiện trường" và "No version" làm parameter, get ID dự toán thực hiện từ list dự toán thực hiện (tbudgetlist).
    b.Get thông tin dự toán từ Dự toán thực hiện (tbudget), list dự toán thực hiện(tbudgetdetails).
    c.Get tên phân loại công trình của chi tiết dự toán thực hiện từ view tên công đoạn (v_schedule_name).
    d.Trả về kết quả tìm kiếm.
        Giải thích đặc biệt：
            itemId: Mã hạng mục
            itemName: Tên hạng mục
            constructionTypeCode: Mã phân loại loại công trình
            constructionPath: Tìm kiếm Tên loại công trình->View tên công đoạn(v_schedule_name)

        Xử lý thông tin date：
            Khi thực hiện c,d,e, cần phải tìm kiếm xem có giá trị của date kết thúc của data này ko.
            Ko có giá trị：multiply ở kết quả trả về là 1
            Có giá trị：multiply ở kết quả trả về là giá trị thay đổi
            Theo ngày：So sánh date hôm nay với date kết thúc
                T/hợp Date hôm nay > Date kết thúc thì tính toán số ngày endDate từ startDate và giá trị multiply là số ngày liên tiếp.
                T/hợp Date hôm nay <= Date kết thúc thì tính toán số ngày của Date hôm nay từ startDate và giá trị của multiply là số ngày liên tiếp.
            Theo tuần：So sánh date hôm nay với date kết thúc
                T/hợp Date hôm nay > Date kết thúc thì tính toán số tuần của endDate từ startDate và giá trị của multiply là số tuần liên tiếp.
                T/hợp Date hôm nay <= Date kết thúc thì tính toán tuần của Date hôm nay từ startDate và giá trị của multiply là số tuần liên tiếp.
            Theo tháng：So sánh date hôm nay với date kết thúc
                T/hợp Date hôm nay > Date kết thúc thì tính toán số tháng của endDate từ startDate và giá trị của mmultiply là số tháng liên tiếp.
                T/hợp Date hôm nay <= Date kết thúc thì tính toán số tháng của Date hôm nay từ startDate và giá trị của multiply là số tháng liên tiếp.
            multiply của data tuần, tháng là 2 ký tự thập phân.
5.Về Service, ngăn cách data details đã get bằng cách điều chỉnh data rồi trả về jason.
    ______________________________________________________________________________________________________________________________________
    |   Level  |  Tên hạng mục  |             Dự định                            | Thực tế             |                 Data date                      |
    _______________________________________________________________________________________________________________________________________
    |  Level hạng mục | Tên hạng mục | Chi tiết dự toán thực hiện (Theo kỳ hạn) Tổng dự định ngày hiện tại Phân loại kỳ hạn (d)| Tổng thực tế nguyên giá      | Grey:Tổng level và thời gian khi dự toán thực hiện  Color:Tổng level và thời gian khi quản lý nguyên giá|
    _______________________________________________________________________________________________________________________________________
    |  Level công đoạn | Tên công đoạn | Công đoạn (Theo khu) Tổng dự định ngày hiện tại Phân loại khu (d)       | Tiến độ đã thực hiện Tổng khối lượng| Grey:Tổng level và thời gian bảng schedule Color:Thực tê của dự toán thực hiện trực thuộc　 |
    ________________________________________________________________________________________________________________________________________
6. Controller gia công status response, thông tin ngoại lệ, v.v.v rồi trả về response.
```

## Request
### Request Header
|Field|Tên Field|Bắt buộc|Giải thích|
|:---|:---|:---:|:---|
| Authorization |Code kiểm chứng| ○ | Bearer {accessToken}|
| Content-Type |Phương pháp phân tích| ○ | application/json |

### Parameter
|Field|Tên Field|Type|Giải thích|
|:---|:---|:---|:---|
| corporationId | ID doanh nghiệp | String |
| siteId | ID hiện trường | String |
| versionNo | No version | Int |

## Response
### Response Header
| Header | Parameter |
|:---------|:--------|
| Content-Type | application/json |

### Response Body
<table>
  <tr>
    <th colspan="6">Field</th>
    <th>Tên Field</th>
    <th>Type</th>
    <th>DB Field</th>
    <th>DB trực thuộc</th>
    <th>Giải thích</th>
  </tr>
  <tr>
    <td rowspan="30">data</td>
    <td colspan="5">title</td>
    <td>Tên hạng mục</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="5">level</td>
    <td>层级 địa chỉ</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>Xử lý bằng Service</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">taskUnitPrice</td>
    <td rowspan="2">Đơn giá công đoạn</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>Đơn giá estimate level hạng mục</td>
  </tr>
  <tr>
    <td>taskUnitPrice</td>
    <td>toverallschedule</td>
    <td>Đơn giá công đoạn level công đoạn</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">taskAmount</td>
    <td rowspan="2"> Số tiền</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>Số tiền level hạng mục <br>Đơn giá estimate level hạng mục* Tổng khối lượng level hạng mục <br>(Tổng nhiều hạng mục bên dưới hạng mục trực thuộc)</td>
  </tr>
   <tr>
    <td>taskAmount</td>
    <td>toverallschedule</td>
    <td>Số tiền level công đoạn</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">actualPrice</td>
    <td rowspan="2">Đơn giá thực tế</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>Level hạng mục</td>
  </tr>
   <tr>
    <td>/</td>
    <td>/</td>
    <td>Level công đoạn</td>
  </tr>
  <tr>
    <td colspan="5" rowspan="2">actualAmount</td>
    <td rowspan="2">Số tiền thực tế</td>
    <td rowspan="2"> String</td>
    <td>/</td>
    <td>/</td>
    <td>Số tiền level hạng mục <br>Đơn giá fix* Hiệu suất<br>(Tổng nhiều hạng mục bên dưới hạng mục trực thuộc)</td>
  </tr>
   <tr>
    <td>/</td>
    <td>/</td>
    <td>Level công đoạn</td>
  </tr>

  
  <tr>
    <td colspan="5" rowspan="2">totalQuantity</td>
    <td rowspan="2">Tổng khối lượng</td>
    <td rowspan="2">String</td>
    <td>totalQuantity</td>
    <td>toverallschedule</td>
    <td>Tổng khối lượng level công đoạn</td>
  </tr>
  <tr>
    <td>totalQuantity</td>
    <td>tbudgetdetails</td>
    <td>Tổng khối lượng level hạng mục</td>
  </tr>
  <tr>
    <td colspan="5">plan</td>
    <td>Dự định history</td>
    <td>String</td>
    <td>sum(dailyQuantity)</td>
    <td>tdailybudgetdetails</td>
    <td>Version history đã thực hiện bằng No version dự toán thực hiện</td>
  </tr>
  <tr>
    <td colspan="5">revisedPlan</td>
    <td>Dự định mới nhất</td>
    <td>String</td>
    <td>sum(dailyQuantity)</td>
    <td>tdailybudgetdetails</td>
    <td></td>
  </tr>

   <tr>
    <td colspan="5">result</td>
    <td>Thực tế</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>Tham chiếu logic nghiệp vụ</td>
  </tr>
  <tr>
    <td colspan="5">progress</td>
    <td>Tiến độ hoàn thành</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>（Thực tế/Tổng khối lượng）*100</td>
  </tr>
  <tr>
    <td colspan="5">itemId</td>
    <td>Mã hạng mục</td>
    <td>String</td>
    <td>itemId</td>
    <td>tbudgetdetails</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="5">costType</td>
    <td>Kiểu cost</td>
    <td>String</td>
    <td>/</td>
    <td>/</td>
    <td>Get tên hạng mục bằng ngăn cách</td>
  </tr>
  <tr>
    <td rowspan="9">calendarData<br>Date</td>
    <td rowspan="3">daily</td>
    <td>plan</td>
    <td rowspan="9">ノ<br>ー<br>ド<br>デ<br>ー<br>タ</td>
    <td rowspan="3">startDate</td>
    <td rowspan="3">Date bắt đầu</td>
    <td rowspan="3">String</td>
    <td rowspan="3">date</td>
    <td rowspan="3">/</td>
    <td rowspan="3">Date bắt đầu <br> plan:Date bắt đầu của data date mà đã tìm kiếm bằng Parameter.No version<br> revisedPlan:Date bắt đầu của data date version mới nhất<br> result:Date bắt đầu của thực tế</td>
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
    <td rowspan="3">Tiến độ</td>
    <td rowspan="3">String</td>
    <td rowspan="3">/</td>
    <td rowspan="3">/</td>
    <td rowspan="3">Tiến độ<br> plan:usageQuantity của data date mà đã tìm kiếm bằng Parameter.No version</br> revisedPlan:usageQuantity của data date version mới nhất<br> result usageQuantity của thực tế</td>
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
    <td rowspan="3">Số chuỗi</td>
    <td rowspan="3">String</td>
    <td rowspan="3">/</td>
    <td rowspan="3">/</td>
    <td rowspan="3">Số chuỗi trực thuộc</td>
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

## Table
|Table|Table liên quan|Hạng mục liên quan|Quan hệ liên quan|Giải thích|
|---|---|---|---|---|
| tBudgetList | tBudget | tBudgetList.corporationId=tBudget.corporationId <br>tBudgetList.siteId=tBudget.siteId <br> tBudgetList.final_versionNo=tBudget.versionNo| OneToOne||
| tBudget| tBudgetDetails | tBudget.id=tBudgetDetails.budgetId |OneToN(OneToZero)||
| tBudgetDetails | v_schedule_name | tBudgetDetails.corporationId=v_schedule_name.corporationId <br>| ManyToOne ||
| tBudgetDetails | tDailyBudgetDetails | tBudgetDetails.id=tDailyBudgetDetails.budget_detailsId |OneToN(OneToZero) ||
| tBudgetDetails | tActualCost | Get Dự toán thực hiện và ID doanh nghiệp, ID hiện trường <br>“ID hiện trường”=tActualCost.siteId <br>"ID doanh nghiệp"=tActualCost.corporationId <br> tBudgetDetails.itemId=tActualCost.itmId <br> tBudgetDetailsconstructionTypeCode=tActualCost.constructionTypeCode | left join | |
| v_schedule_name | tDailySchedule | v_schedule_name.id=tDailySchedule.scheduleId | OneToMany | |
| v_schedule_name | tWorkProgress | v_schedule_name.corporationId=tWorkProgress.corporationId <br>v_schedule_name.siteId=tWorkProgress.siteId <br>v_schedule_name.constructionTypeCode=tWorkProgress.constructionTypeCode | OneToOne | |

## Response bất thường
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
| status| Status |String|Status Response HTTP. 200：Bình thường；Khác：Bất thường|
| code | Code bất thường |Integer | The status code representing the error. |
| message |Message lỗi| String | The message explaining the error. |
| parameters | Mảng lỗi | Array[String] | (Optional) An array of attributes used to generate a different and/or localized error message. |

```json
{
  "code": 400,
  "message":"Invalid product data: %1",
  "parameters": [
    "Invalid attribute set entity type"
  ]
}
```

## Phương pháp test
```
1. Gọi software của postman bằng parameter được truyền từ mô tả service rồi trả về message response test.
2. Thực hiện test Junit, tỉ lệ coverage là 100％.
```

#### Change log
| Date | Changed | Comment |
|:-----------|:----------|:------------------------|
| 2020/03/31 | created | - |

# i3t

## Description

It Tells the Time.

A simple time conversion package for diffferent time zones.

## Usage

### Functions

| Name    | Attributes                         | Optional Attr | Description                                               |
| ------- | ---------------------------------- | ------------- | --------------------------------------------------------- |
| convert | (from_timezone, to_timezone, time) | date          | Returns the converted time object with time zone and date |

<br>

**convert('from_tz', 'to_tz', 'time')**

`convert()`, has three mandatory parameters and one optional parameter, returns the converted time with time zone and date.

**Params**

| Name            | Type   | Format                         | Sample                         |
| --------------- | ------ | ------------------------------ | ------------------------------ |
| from_tz         | String | 'Continent/City'               | 'Asia/Bangkok'                 |
| to_tz           | String | 'Continent/City'               | 'Asia/Japan'                   |
| time            | String | 'HH:mm' <br> 'hh:mm a'         | '23:15' <br> '10:15 PM'        |
| date (optional) | String | 'yyyy-MM-dd' <br> 'yyyy/MM/dd' | '2023-07-25' <br> '2023/07/25' |

<br>

```c
convert('Asia/Bangkok', 'Asia/Tokyo', '23:15')
/*
{
    from: { from_date: '2024-07-25', from_time: '23:15', from_tz: 'Asia/Bangkok' },
    to: { to_date: '2024-07-26', to_time: '01:15', to_tz: 'Asia/Tokyo' }
}
*/
convert('Asia/Bangkok', 'Asia/Tokyo', '11:15 PM')
/*
{
    from: { from_date: '2024-07-25', from_time: '11:15 PM', from_tz: 'Asia/Bangkok' },
    to: { to_date: '2024-07-26', to_time: '01:15 AM', to_tz: 'Asia/Tokyo' }
}
*/
convert('Asia/Bangkok', 'Asia/Tokyo', '23:15', '2020-10-27')
/*
{
    from: { from_date: '2020-10-27', from_time: '23:15', from_tz: 'Asia/Bangkok' },
    to: { to_date: '2020-10-28', to_time: '01:15', to_tz: 'Asia/Tokyo' }
}
*/
convert('Asia/Bangkok', 'Asia/Tokyo', '10:15 PM', '2020/10/27')
/*
{
    from: { from_date: '2020/10/27', from_time: '10:15 PM', from_tz: 'Asia/Bangkok' },
    to: { to_date: '2020/10/28', to_time: '12:15 AM', to_tz: 'Asia/Tokyo' }
}
*/
```

<!-- <span style="color: #AAAAAA"> '2023-07-25' </span> -->

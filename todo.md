## Converter

- [x] validate from and to
  - ~~hour <= 12 or 24~~
  - ~~min < 59~~
  - ~~sec < 59~~
  - ~~use AM & PM~~
  - ~~tz must be in Moment tz format~~
  - [x] used time string and date string for more simple validation
- [x] throw error
- [x] convert from and to
- [x] return converted data in object

```
{
    from :
        {
            from_tz: 'Asia/Bangkok',
            from_time: '10:15 PM',
            from_date: '2024-07-24',
        },
    to :
        {
            to_tz: 'Asia/Tokyo',
            to_time: '12:15 AM',
            to_date: '2024-07-25',
        }
}
```

- [x] Use TDD

## Get Converted Time with Multiple Regions

- to_tzs will be array
  - [x] accept like this ['Asia/Tokyo', 'Asia/Bangkok', ...]
  - [x] return like this
  ```
  {
      from: {...},
      to: [
          {
              to_tz: 'Asia/Tokyo',
              to_time: '12:15 AM',
              to_date: '2024-07-25',
          },
          {
              to_tz: 'Asia/Tokyo',
              to_time: '12:15 AM',
              to_date: '2024-07-25',
          },
          ...
      ]
  }
  ```

## Get Converted Time with Regions

return converted time for specific region||continent
conver(MMT, Europe) return all Europe time

## Get Supported Time Zone Lists

- [ ] return all the moment time zone lists with array of objects

```
[
    'America/Los_Angeles', ....
]

```
